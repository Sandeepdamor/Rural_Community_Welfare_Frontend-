import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentRoutes } from '../../../shared/utils/component-routes';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  passwordForm: FormGroup;
  mobileNumber: string | null = null;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.passwordForm = this.fb.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ],
      confirmPassword: ['']
    }, { validators: this.passwordsMatch });
  }

  ngOnInit() {
    this.mobileNumber = this.route.snapshot.queryParamMap.get('mobileNumber');
  }

  // Custom Validator: Passwords must match
  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  changePassword() {
    if (this.passwordForm.invalid) {
      alert('Please correct the errors before submitting.');
      return;
    }

    if (!this.mobileNumber) {
      alert('Mobile number is missing!');
      return;
    }



    // Call API to update password
    this.authService.changePassword(this.passwordForm.value.newPassword, this.passwordForm.value.confirmPassword).subscribe(
      (response) => {
        alert('Password changed successfully!');
        this.redirectToDashboard(this.tokenService.getRoleFromToken());
        // this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        console.error('Error changing password:', error);
        alert(error.error.message || 'Failed to change password.');
      }
    );
  }
  redirectToDashboard(userRole: string | null) {
    console.log('Role => ', userRole);
    if (userRole)
      this.router.navigate([ComponentRoutes.DASHBOARD]);
    else
      this.router.navigate([ComponentRoutes.LOGIN]); // Redirect to login if role is unknown
  }
}
