import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-aadhaar-verification',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './aadhaar-verification.component.html',
  styleUrl: './aadhaar-verification.component.scss'
})
export class AadhaarVerificationComponent {
  aadhaarForm: FormGroup;
  isVerified = false;
  isError = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private route: ActivatedRoute,private tokenService: TokenService) {
    this.aadhaarForm = this.fb.group({
      aadhaarNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]]
    });
  }

  validateAadhaar() {
    if (this.aadhaarForm.invalid) {
      this.isError = false;
    }
  }

  verifyAadhaar() {
    if (this.aadhaarForm.invalid) {
      alert('Please enter a valid 12-digit Aadhaar number.');
      return;
    }

    const aadhaarNumber = this.aadhaarForm.value.aadhaarNumber;

    this.authService.verifyAadhaar(aadhaarNumber).subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.message);
        if (response.message) {
          // Show alert with success message
          alert(response.message);
        }
        this.tokenService.clearTokens();
        this.router.navigate(['/'], {
          relativeTo: this.route
        }); // Redirect to LANDING PAGE after verification
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Aadhaar Verification Failed.';
      }
    });
  }
}
