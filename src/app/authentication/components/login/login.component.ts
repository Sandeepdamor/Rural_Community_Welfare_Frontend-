import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { ComponentRoutes } from '../../../shared/utils/component-routes';
import { TokenService } from '../../../shared/services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddressService } from '../../../shared/services/address.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrected to 'styleUrls'
})
export class LoginComponent {
  formLogin!: FormGroup;
  formRegister!: FormGroup;
  isRegisterMode: boolean = false; // Toggle between Login and Register
  selectedGender: string = '';
  newAddress: string = ""; // Store new address entered by user
  mobileNumber: string = "";
  otp: string = "";
  errorMessage: string = "";
  submitted: boolean = false;

  addresses: any[] = []; // Store fetched addresses
  selectedAddressId: number | null = null; // Store selected address ID

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private addressService: AddressService) {
    this.createForm();
  }

  ngOnInit() {
    this.createForm();
    this.loadAddresses();
    this.route.queryParams.subscribe(params => {
      this.mobileNumber = params['mobileNumber'] || '';  // Get mobile number
      this.otp = params['otp'] || '';  // Get OTP

      console.log('Mobile Number:', this.mobileNumber);
      console.log('OTP:', this.otp);
    });
    this.tokenService.clearAuthTokens();
  }


  createForm() {
    this.formLogin = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]],
      password: ['', Validators.required]
    });

    this.formRegister = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],

      confirmPsw: ['', [Validators.required]],
      addressId: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
    }, { validators: this.matchPasswordValidator });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = "";
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe(
      (data: any) => { this.addresses = data; },
      (error: HttpErrorResponse) => { console.error('Error fetching addresses:', error); }
    );
    console.log('ADDRESSES => ', this.addresses);
  }

  matchPasswordValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPsw')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }



  // Handle user selection of address
  onAddressSelect(event: any) {
    this.selectedAddressId = parseInt(event.target.value, 10);
    this.formRegister.patchValue({ addressId: this.selectedAddressId });
  }



  // onSubmit() {
  //   this.submitted = true;
  //   this.errorMessage = ''; // Clear previous errors
  //   if (this.formRegister.invalid) {
  //     return;
  //   }
  //   const formData = this.formRegister.value;
  //   console.log("Submitting:", formData);

  //   if (this.isRegisterMode) {
  //     // Register User
  //     this.authService.register(formData).subscribe({
  //       next: (res) => {
  //         console.log('Registration Success:', res);
  //         // Handle registration success (if needed)
  //       },
  //       error: (err) => {
  //         console.error('Registration Failed:', err);
  //         this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
  //       }
  //     });

  //   } else {
  //     // Login User
  //     this.authService.login(formData).subscribe({
  //       next: (res) => {
  //         console.log('Login Success:', res);

  //         if (res.response && res.response.token) {
  //           console.log('Auth Token:', res.response.token);
  //           this.tokenService.saveAuthToken(res.response.token);

  //           // Redirect to Verify OTP page
  //           this.router.navigate([ComponentRoutes.VERIFYOTP], {
  //             relativeTo: this.route,
  //             queryParams: {
  //               mobileNumber: this.tokenService.getMobileNumberFromAuthToken(),
  //               otp: res.response.otp
  //             }
  //           });

  //         } else {
  //           this.errorMessage = 'Authentication failed. Please try again.';
  //         }
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         if (err.status === 0) {
  //           // **Server Down or Connection Issue**
  //           alert('Server is not responding! Please try again later.');
  //         } else if (err.status === 400) {
  //           //**Invalid Credentials**
  //           this.errorMessage = err.error.message;
  //         } else {
  //           //**Other Errors**
  //           alert(err.message);
  //         }
  //       }
  //     });
  //   }
  // }

  onLogin() {
    if (this.formLogin.invalid) return;
    // Login User
    this.authService.login(this.formLogin.value).subscribe({
      next: (res) => {
        console.log('Login Success:', res);

        if (res.response && res.response.token) {
          console.log('Auth Token:', res.response.token);
          this.tokenService.saveAuthToken(res.response.token);
          if (res.message) {
            // Show alert with success message
            alert(res.message);
          }
          if (res.message === 'You have not completed Aadhaar verification. Please verify your Aadhaar to proceed with login.') {
            this.router.navigate([ComponentRoutes.VERIFY_AADHAR], {
              relativeTo: this.route
            });
            return;
          }
          if (res.message === 'Aadhaar verification is pending. You cannot log-in until your Aadhaar is verified by the admin.') {
            this.router.navigate(['/'], {
              relativeTo: this.route
            });
            return;
          }


          // Redirect to Verify OTP page
          this.router.navigate(['../',ComponentRoutes.VERIFYOTP], {
            relativeTo: this.route,
            queryParams: {
              mobileNumber: this.tokenService.getMobileNumberFromAuthToken(),
              otp: res.response.otp
            }
          });

        } else {
          this.errorMessage = 'Authentication failed. Please try again.';
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          // **Server Down or Connection Issue**
          alert('Server is not responding! Please try again later.');
        } else if (err.status === 400) {
          //**Invalid Credentials**
          this.errorMessage = err.error.message;
        } else {
          //**Other Errors**
          alert(err.message);
        }
      }
    });
  }

  onRegister() {
    if (this.formRegister.invalid) return;
    // Register User
    this.authService.register(this.formRegister.value).subscribe({
      next: (res) => {
        console.log('Login Success:', res);
        if (res.response && res.response.token) {
          console.log('Auth Token:', res.response.token);
          this.tokenService.saveAuthToken(res.response.token);
          if (res.message) {
            // Show alert with success message
            alert(res.message);
          }

          console.log('Mobile Number => ', this.tokenService.getMobileNumberFromAuthToken())
          // Redirect to Verify OTP page
          this.router.navigate([ComponentRoutes.VERIFYOTP], {
            relativeTo: this.route,
            queryParams: {
              mobileNumber: this.tokenService.getMobileNumberFromAuthToken(),
              otp: res.response.otp
            }
          });

        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      },
      error: (err) => {
        console.error('Registration Failed:', err);
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }


  // Helper method to check if a field is invalid
  isFieldInvalid(field: string): boolean {
    const form = this.isRegisterMode ? this.formRegister : this.formLogin;
    return form.controls[field].invalid && (form.controls[field].dirty || form.controls[field].touched);
  }



  onForgotPassword() {
    // Redirect to Forgot Password page
    this.router.navigate(['../',ComponentRoutes.FORGOTPASSWORD], { relativeTo: this.route });
  }
}
