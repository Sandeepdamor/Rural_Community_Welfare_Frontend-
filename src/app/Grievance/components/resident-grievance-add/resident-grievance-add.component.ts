import { HttpErrorResponse } from '@angular/common/http';
import { ResidentGrievanceService } from './../../../shared/services/resident-grievance-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resident-grievance-add',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './resident-grievance-add.component.html',
  styleUrls: ['./resident-grievance-add.component.scss'],
})
export class ResidentGrievanceAddComponent {
  grievanceForm!: FormGroup;
  isReadOnly = false;
  mode: string | null = null; // To track view/add/update mode
  grievanceId: string | null = null; // To store the ID if in update/view mode
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private residentgrievanceservice: ResidentGrievanceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize form with validators
    this.grievanceForm = this.fb.group({
      subject: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      description: ['', Validators.required],
      attachment: [],
    });

    // Check route parameters for update mode (if any)
    this.route.queryParams.subscribe((params) => {
      this.mode = params['mode'];
      this.grievanceId = params['id'];
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.grievanceForm.valid) {
      const formData = new FormData();

      console.log('Form Values (for debug):', this.grievanceForm.value);

      Object.entries(this.grievanceForm.value).forEach(([key, value]) => {
        if (key === 'attachment' && value) {
          const files = value as FileList;
          for (let i = 0; i < files.length; i++) {
            formData.append('attachments', files[i]);
          }
        } else if (typeof value === 'string') {
          formData.append(key, value);
        }
      });

      // Call the service to submit the grievance
      this.residentgrievanceservice.addGrievance(formData).subscribe({
        next: (res: any) => {
          console.log('Successfully submitted:', res);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error submitting grievance:', err.message);
        },
      });
    } else {
      console.log('Form is invalid');
      // Check which control is invalid
      Object.keys(this.grievanceForm.controls).forEach((controlName) => {
        const control = this.grievanceForm.get(controlName);
        if (control?.invalid) {
          console.log(`${controlName} is invalid`);
        }
      });
    }
  }

  // Handle file input change and add selected files
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFiles = Array.from(files); // Store selected files in an array
    }
  }

  // Remove selected file from the list
  removeAttachment(index: number): void {
    this.selectedFiles.splice(index, 1);
  }
}
