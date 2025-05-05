import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ComponentRoutes } from '../../../shared/utils/component-routes';
import { TokenService } from '../../../shared/services/token.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService,
    private tokenService: TokenService) {
    this.forgotPasswordForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  get mobileNumber() {
    return this.forgotPasswordForm.get('mobileNumber');
  }

  getMobileNumberError(): string {
    if (this.mobileNumber?.hasError('required')) {
      return 'Mobile number is required.';
    }
    if (this.mobileNumber?.hasError('pattern')) {
      return 'Enter a valid 10-digit mobile number.';
    }
    return '';
  }

  sendOtp() {
    if (this.forgotPasswordForm.valid) {
      const mobile = this.mobileNumber?.value;
  
      this.authService.sendOtpForForgotPassword(mobile).subscribe({
        next: (res) => {
          if (!res || !res.response) {
            console.error('Invalid Response from Server');
            alert('Something went wrong. Please try again.');
            return;
          }
          this.tokenService.saveAuthToken(res.response);
          console.log('Forgot Password Token ', res.response);

          if (res.message) {
            // Show alert with success message
            alert(res.message);
          }
          if (res.message === 'You have not completed Aadhaar verification. Please verify your Aadhaar to proceed with login.') {
            this.router.navigate([ComponentRoutes.USERAUTH,ComponentRoutes.VERIFY_AADHAR]);
            return;
          }
          if (res.message === 'Aadhaar verification is pending. You cannot log-in until your Aadhaar is verified by the admin.') {
            this.router.navigate(['/'], {
              relativeTo: this.route
            });
            return;
          }

  
          console.log('OTP Sent:', res);
          
          if (res.response.token) {
            console.log('Auth Token:', res.response.token);
            this.tokenService.saveAuthToken(res.response.token);
          }
  
          if (res.response.otp) {
            this.router.navigate([ComponentRoutes.USERAUTH,ComponentRoutes.VERIFYOTP], {
              queryParams: {
                mobileNumber: mobile,
                otp: res.response.otp,
                forgotPassword: 'true'
              }
            });
          } else {
            alert('Failed to send OTP. Please try again.');
          }
        },
        error: (err) => {
          console.error('OTP Sending Failed:', err);
  
          if (err.status === 400) {
            alert(err.error?.message || 'Invalid mobile number.');
          } else if (err.status === 500) {
            alert('Server error! Please try again later.');
          } else {
            alert(err.error?.message || 'Failed to send OTP. Please try again.');
          }
        }
      });
    }
  }
  
}
