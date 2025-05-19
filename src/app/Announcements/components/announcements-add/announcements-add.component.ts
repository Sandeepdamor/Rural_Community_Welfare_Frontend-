import { CommonModule,Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AnnouncementService } from '../../../shared/services/announcement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';
import { ComponentRoutes } from '../../../shared/utils/component-routes';

@Component({
  selector: 'app-announcements-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './announcements-add.component.html',
  styleUrl: './announcements-add.component.scss',
})
export class AnnouncementsAddComponent {
  announcementForm!: FormGroup;
  isReadOnly = false;
  mode: string | null = null; // 🔁 To track view/add/update mode
  announcementId: string | null = null; // 📌 To store the ID if in update/view mode
  role: Role;


  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
    private router: Router,
    private location: Location,
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.role = roleString as Role; // ✅ safely assign enum
  }

  ngOnInit(): void {
    this.announcementForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
          Validators.pattern(/^[A-Za-z][A-Za-z\s]*$/),
        ],
      ],
      content: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', Validators.required],
      status: ['', Validators.required],
      attachment: [],
    });

    this.mode = this.route.snapshot.queryParamMap.get('mode');
    this.announcementId = this.route.snapshot.paramMap.get('id');

    console.log('Mode:', this.mode);
    console.log('Announcement ID:', this.announcementId);

    if (this.mode === 'view' && this.announcementId) {
      this.isReadOnly = true;
      this.loadAnnouncement(this.announcementId);
    }
    if (this.mode === 'update' && this.announcementId) {
      this.loadAnnouncements(this.announcementId);
    }
    if (this.mode === 'view-announcements' && this.announcementId) {
      this.isReadOnly = true;
      this.loadAnnouncements(this.announcementId);
    }
  }

  loadAnnouncements(id: string) {
    this.announcementService.getAnnouncementById(id).subscribe((data) => {
      if (!data) {
        console.warn('No announcement found');
        return;
      }
      console.log('My Loaded announcement:', data);
      this.announcementForm.patchValue({
        title: data.title,
        content: data.content,
        date: this.formatDateForInput(data.date),
        status: data.status,
        // Do not patch file inputs – leave them empty to allow new uploads
      });
    });
  }

   isFieldRequired(fieldName: string): boolean {
      // Replace with your form control logic to check if the field is required
      return this.announcementForm.get(fieldName)?.hasValidator(Validators.required) ?? false;
    }
  loadAnnouncement(id: string) {
    this.announcementService
      .getDeletedAnnouncementById(id)
      .subscribe((data) => {
        if (!data) {
          console.warn('No deleted announcement found');
          return;
        }
        console.log('Loaded deleted announcement:', data);
        this.announcementForm.patchValue({
          title: data.title,
          content: data.content,
          date: this.formatDateForInput(data.date),
          status: data.status,
          attachment: data.attachments ? data.attachments : null, // Handle attachments
        });
      });
  }

  formatDateForInput(dateStr: string): string {
    if (!dateStr) return ''; // Handle null/undefined date
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 16); // format for datetime-local input
  }

  onFileChange(event: any, controlName: string) {
    const files = event.target.files;
    if (files.length > 0) {
      // Patch the files to the form control
      this.announcementForm.patchValue({ [controlName]: files });
    }
  }
  onSubmit(): void {
    if (this.announcementForm.invalid) {
      this.announcementForm.markAllAsTouched();
      this.snackBar.open(
        'Please fill out all required fields correctly.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        }
      );
      return;
    }

    const formData = new FormData();
    const rawDate = this.announcementForm.value.date;
    const formattedDate = this.formatDate(rawDate);

    Object.entries(this.announcementForm.value).forEach(([key, value]) => {
      if (key === 'attachment' && value) {
        const files = value as FileList;
        for (let i = 0; i < files.length; i++) {
          formData.append('attachments', files[i]);
        }
      } else if (key === 'date') {
        formData.append('date', formattedDate);
      } else if (typeof value === 'string') {
        formData.append(key, value);
      }
    });

    const handleError = (err: HttpErrorResponse) => {
      console.error('Error:', err);

      // ✅ Check if backend sent field-level validation errors
      if (err.error?.errors) {
        const errors = err.error.errors;
        Object.keys(errors).forEach((fieldName) => {
          if (this.announcementForm.get(fieldName)) {
            this.announcementForm.get(fieldName)?.setErrors({
              backend: errors[fieldName],
            });
          }
        });
      }

      this.snackBar.open(
        'Failed to submit announcement: ' + (err.error?.message || err.message),
        'Close',
        {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        }
      );
    };

    if (this.mode === 'update' && this.announcementId) {
      this.announcementService
        .updateAnnouncement(this.announcementId, formData)
        .subscribe({
          next: (res: any) => {
            console.log('Successfully updated:', res);
            this.snackBar.open('Announcement updated successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
          },
          error: handleError,
        });
    } else {
      this.announcementService.addAnnouncement(formData).subscribe({
        next: (res: any) => {
          console.log('Successfully submitted:', res);
          this.snackBar.open('Announcement submitted successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });

         this.router.navigate(['/announcements/list']);

        },
        error: handleError,
      });
    }
  }

  // Helper function to format date to yyyy-MM-dd HH:mm:ss
  formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  selectedFiles: File[] = [];

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const alreadyAdded = this.selectedFiles.some(
          (f) => f.name === file.name && f.size === file.size
        );
        if (!alreadyAdded) {
          this.selectedFiles.push(file);
        }
      }
    }
  }
  removeAttachment(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

   goBack(): void {
    this.location.back();
  }
}
