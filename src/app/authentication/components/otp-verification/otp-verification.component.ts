import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { TokenService } from '../../../shared/services/token.service';
import { ComponentRoutes } from '../../../shared/utils/component-routes';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent {
  mobileNumber: string = '';
  sendotp: string = "";
  otp: FormGroup;
  isForgotPassword: boolean = false;
  isResendDisabled: boolean = true; // Disable resend initially
  isOtpExpired: boolean = false; // Track OTP expiration
  timer: number = 120; // 5 minutes timer (300 seconds)

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService,
    private fb: FormBuilder,
  ) {
    this.otp = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp6: ['', [Validators.required, Validators.pattern('[0-9]')]]
    });
  }

  ngOnInit() {
    // Get mobile number from token
    this.mobileNumber = this.tokenService.getMobileNumberFromAuthToken() || '';
    this.sendotp = this.route.snapshot.queryParams['otp'];
    // Check if the user is coming from Forgot Password flow
    this.isForgotPassword = this.route.snapshot.queryParams['forgotPassword'] === 'true';

    this.startOtpExpirationTimer(); // Start 5-minute OTP expiration countdown
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }


  verifyOtp() {
    if (this.isOtpExpired) {
      // this.isOtpExpired = true;
      this.timer = 0;
      alert('OTP expired. Please request a new OTP.');
      return;
    }

    // Step 2: Validate OTP input fields
    if (this.otp.invalid) {
      this.otp.markAllAsTouched(); // Ensure validation messages appear
      alert('Please enter a valid OTP.');
      return;
    }

    const enteredOtp = Object.values(this.otp.value).join('');

    this.authService.verifyOtp(enteredOtp).subscribe(
      (response) => {
        console.log('Token In Verify Otp => ', response);
        if (response.response) {
          console.log("RESIDENT REGISTER OTP TOKEN=> ", response.response);
          if (response.message === 'Resident successfully verify, Please Proceed to Aadhar Verification.: ' || response.message === 'Resident successfully verify, Please Proceed to Aadhar Verification.: No Sarpanch has been assigned to this village yet. A Sarpanch will be appointed soon.') {
            this.tokenService.saveAuthToken(response.response)
            // OTP verified for User Registeration → Redirect to Aadhar Verification page
            this.router.navigate([ComponentRoutes.USERAUTH,ComponentRoutes.VERIFY_AADHAR], {
              queryParams: { mobileNumber: this.mobileNumber }
            });
            return;
          }

          // Save the token received from the response
          this.tokenService.saveAccessToken(response.response);
          console.log('Access Token Saved response.response:', response.response);
        } else if (response.response.token) {
          // Save the token received from the response
          this.tokenService.saveAccessToken(response.response.token);
          console.log('Access Token Saved response.rep.token:', response.response.token);
        }
        // else {
        //   this.tokenService.clearAccessTokens();
        //   console.error('No token received in response.');
        //   alert('Something went wrong. Please try again.');
        //   return;
        // }
        //Handling different scenarios based on the response message
        // if (response.message === 'User Verified Successfully, Please Enter Otp to Login') {
        //   this.tokenService.clearAuthTokens();
        //   // User has verified OTP for login → Redirect to Dashboard
        //   this.redirectToDashboard(this.tokenService.getRoleFromToken());

        // } else 
        if (response.message === 'OTP verified successfully. Please set your new password.') {
          // OTP verified for Forgot Password → Redirect to New Password page
          this.router.navigate([ComponentRoutes.USERAUTH,ComponentRoutes.NEWPASSWORD], {
            queryParams: { mobileNumber: this.mobileNumber }
          });
        }
        else if (response.message === 'User successfully Login') {
          // OTP verified for User Registeration → Redirect to Dashboard
          console.log('ADMIN DAHBOARD ');
          this.tokenService.clearAuthTokens();
          this.router.navigate([`/${ComponentRoutes.DASHBOARD}`]);
          // return;
        }
        else {
          this.tokenService.clearAccessTokens();
          alert('Invalid OTP. Please try again.');
        }
      },
      (error) => {
        // this.tokenService.clearTokens();
        console.error('Error verifying OTP:', error);
        alert(error.error?.message || 'OTP verification failed.');
      }
    );
  }

  startOtpExpirationTimer() {
    const interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.isOtpExpired = true;
        clearInterval(interval);
      }
    }, 1000);
  }

  editMobileNumber() {
    this.router.navigate([ComponentRoutes.LOGIN]);
  }

  moveToNext(event: any, nextIndex: number | null) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && nextIndex !== null) {
      const nextInput = document.getElementById(`otp${nextIndex}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }


  resendOtp() {
    if (!this.isOtpExpired) {
      alert('Please wait until OTP expires.');
      return;
    }

    this.authService.resendOtp().subscribe(
      (response) => {
        this.tokenService.saveAuthToken(response.response.token);
        alert('A new OTP has been sent to your mobile number.');
        this.sendotp = response.response.otp;
        this.isOtpExpired = false;
        this.timer = 120;
        this.startOtpExpirationTimer();
      },
      (error) => {
        console.error('Error resending OTP:', error);
        alert('Failed to resend OTP.');
      }
    );
  }
}
