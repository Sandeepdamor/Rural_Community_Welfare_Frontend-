import { Component, Input, OnInit, signal } from '@angular/core';
import { UserResponse } from '../../../shared/interfaces/user/user-response';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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

declare var bootstrap: any;
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

  profileImage = signal<string>('assets/images/svg/profile.svg');
  selectedImage: string | null = null;
  constructor(private fb: FormBuilder,
    public userService: UserService,
    private toastService: ToastService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {

    if (this.data?.profileImage) {
      this.userService.updateImage(this.data.profileImage);
    }
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
    }, {
      validators: [this.passwordMatchValidator, this.newPasswordNotSameAsOldValidator]
    });
  }


  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  newPasswordNotSameAsOldValidator(form: AbstractControl): ValidationErrors | null {
    const oldPassword = form.get('oldPassword')?.value;
    const newPassword = form.get('newPassword')?.value;
    if (oldPassword && newPassword && oldPassword === newPassword) {
      form.get('newPassword')?.setErrors({ sameAsOld: true });
      return { sameAsOld: true };
    }
    return null;
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
      (response: ApiResponse) => {
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

  openImage(): void {
    this.selectedImage = this.userService.profileImage(); // or the updated image URL
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Optional preview while uploading
      const reader = new FileReader();
      reader.onload = () => {
        this.userService.updateImage(reader.result as string); // Temporary preview
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary via your backend API
      this.userService.uploadProfileImage(file).subscribe({
        next: (response) => {
          console.log('Upload Success:', response.response);

          // 👇 Set final Cloudinary image URL from backend response
          this.profileImage.set(response.response.response); // assume `imageUrl` is returned
          this.userService.updateImage(response.response.response);
          // this.toastService.showSuccess(response.response.message || 'Profile image updated successfully!');
        },
        error: (error) => {
          console.error('Upload Error:', error);
          this.toastService.showError(error.message || 'Failed to upload profile image.');
        }
      });
    }
  }


  cancelEdit(type: 'name' | 'password') {
    if (type === 'name') {
      this.profileForm.reset({ name: this.data.name });
    } else {
      this.passwordForm.reset();
    }
  }
}
