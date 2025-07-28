import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AnnouncementService } from '../../../shared/services/announcement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
      attachment: [],
    });
    // const mode = this.route.snapshot.queryParamMap.get('mode');
    // const id = this.route.snapshot.paramMap.get('id');

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
    if (this.announcementForm.valid) {
      const formData = new FormData();
      console.log('Form Values (for debug):', this.announcementForm.value);

      const rawDate = this.announcementForm.value.date;
      const formattedDate = this.formatDate(rawDate); // Format to yyyy-MM-dd HH:mm:ss

      Object.entries(this.announcementForm.value).forEach(([key, value]) => {
        if (key === 'attachment' && value) {
          const files = value as FileList;
          for (let i = 0; i < files.length; i++) {
            formData.append('attachments', files[i]); // Append each file
          }
        } else if (key === 'date') {
          formData.append('date', formattedDate); // Append formatted date
        } else if (typeof value === 'string') {
          formData.append(key, value);
        }
      });
      //  Determine whether to add or update
      if (this.mode === 'update' && this.announcementId) {
        //  Call update API
        this.announcementService
          .updateAnnouncement(this.announcementId, formData)
          .subscribe({
            next: (res: any) => {
              console.log('Successfully updated:', res);
            },
            error: (err: HttpErrorResponse) => {
              console.error('Error updating announcement:', err.message);
            },
          });
      } else {
        //  Call add API
        this.announcementService.addAnnouncement(formData).subscribe({
          next: (res: any) => {
            console.log('Successfully submitted:', res);
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error submitting announcement:', err.message);
          },
        });
      }
    } else {
      console.log('Form Invalid');
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
}
