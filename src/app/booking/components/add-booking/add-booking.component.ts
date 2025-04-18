import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.scss'
})
export class AddBookingComponent {
  grievanceForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.grievanceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      grievanceType: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Submit Form
  submitForm() {
    this.submitted = true;
    if (this.grievanceForm.valid) {
      console.log('Form Submitted', this.grievanceForm.value);
      alert('Grievance submitted successfully!');
      this.grievanceForm.reset();
      this.submitted = false;
    }
  }

}
