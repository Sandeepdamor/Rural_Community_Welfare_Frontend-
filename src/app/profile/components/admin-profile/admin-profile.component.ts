import { Component, Input, OnInit } from '@angular/core';
import { UserResponse } from '../../../shared/interfaces/user/user-response';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';
import { ToastService } from '../../../shared/services/toast.service';
import { AdminService } from '../../../shared/services/admin.service';
import { AuthService } from '../../../shared/services/auth.service';
import { UpdatePasswordRequest } from '../../../shared/interfaces/admin/update-password-request';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';
import { ComponentRoutes } from '../../../shared/utils/component-routes';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  @Input() data!: UserResponse;
  @Input() isViewOnly: boolean = true;
  @Input() isDeleted: boolean = true;

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private userSearvice: UserService, 
    private toastService: ToastService, 
    private adminService: AdminService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.data?.name || '', [Validators.required, Validators.minLength(3)]]
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          )
        ]
      ],
      confirmPassword: ['', [Validators.required]]
    });
  }

  // Method to update name
  updateName() {
    if (this.profileForm.invalid) return;
    const updatedName = this.profileForm.value.name;
    // call API here
    this.adminService.updateName(this.data.id, updatedName).subscribe({
      next: (response) => {
        // Show success message using ToastService
        this.toastService.showSuccess(response.message);
      },
      error: (err) => {
        console.error('Status Updation Faild:', err.details);
        // Show error message using ToastService
        this.toastService.showError(err.message || 'Something went wrong');
      }
    });
  }

  // Method to update password
  updatePassword() {
    if (this.passwordForm.invalid) return;

    const { newPassword, confirmPassword } = this.passwordForm.value;
    if (newPassword !== confirmPassword) {
      this.passwordForm.get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }
    const updatePasswordData: UpdatePasswordRequest = this.passwordForm.value;
    // Call API to update password
    this.adminService.updatePassword(updatePasswordData).subscribe(
      (response:ApiResponse) => {
        console.log(response.message);
        alert(response.message);
        this.passwordForm.reset();
      },
      (error) => {
        console.error('Error changing password:', error);
        alert(error.details || 'Failed to change password.');
      }
    );
  }

  cancelEdit(type: 'name' | 'password') {
    if (type === 'name') {
      this.profileForm.reset({ name: this.data.name });
    } else {
      this.passwordForm.reset();
    }
  }
}
