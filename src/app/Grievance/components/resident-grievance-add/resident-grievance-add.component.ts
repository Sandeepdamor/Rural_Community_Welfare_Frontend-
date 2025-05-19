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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location
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
      attachments: [],
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

      Object.entries(this.grievanceForm.value).forEach(([key, value]) => {
        if (key === 'attachments') {
          // const files = value as FileList;
          // for (let i = 0; i < files.length; i++) {
          //   formData.append('attachments', files[i]);
          // }
          console.log('SELECTED FILES ==> ', this.selectedFiles);
          this.selectedFiles.forEach((file: File) => {
            console.log(' FILE ===> ', file);
            formData.append('attachments', file);
          });
        } else if (typeof value === 'string') {
          formData.append(key, value);
        }
      });
      console.log(
        'Form Values ==============================(for debug):',
        formData.values
      );

      // Call the service to submit the grievance
      this.residentgrievanceservice.addGrievance(formData).subscribe({
        next: (res: any) => {
          console.log('Successfully submitted:', res);
          this.snackBar.open('Grievance submitted successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-success'], // Optional custom class
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error submitting grievance:', err.message);
          this.snackBar.open(
            'Failed to submit grievance. Please try again.',
            'Close',
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar-error'],
            }
          );
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
    console.log('Selected Files:------', files); // Debugging the selected file
    if (files.length > 0) {
      console.log('Adding file:------', files); // Log each file being added
      this.selectedFiles = Array.from(files); // Store selected files in an array
    }
  }

  // Remove selected file from the list
  removeAttachment(index: number): void {
    console.log('Removing file at index:------', index); // Debug the index being removed
    this.selectedFiles.splice(index, 1);
    console.log('Updated Files List:-----', this.selectedFiles); // Check the updated list
  }

  goBack(): void {
    this.location.back();
  }
}
