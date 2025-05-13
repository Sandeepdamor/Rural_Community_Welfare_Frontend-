import { Component, Input, OnInit, signal } from '@angular/core';
import { ResidentResponse } from '../../../shared/interfaces/resident/resident-response';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenderPipe } from '../../../shared/pipes/gender.pipe';
import { AddressService } from '../../../shared/services/address.service';
import { ResidentService } from '../../../shared/services/resident.service';
import { ToastService } from '../../../shared/services/toast.service';
import { UpdatePasswordRequest } from '../../../shared/interfaces/admin/update-password-request';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { UserService } from '../../../shared/services/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-resident-profile',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, GenderPipe],

  templateUrl: './resident-profile.component.html',
  styleUrl: './resident-profile.component.scss'
})
export class ResidentProfileComponent implements OnInit {

  @Input() data!: ResidentResponse;
  @Input() isViewOnly: boolean = true;
  profileImage = signal<string>('assets/images/svg/profile.svg');
  selectedImage: string | null = null;
  isPublic: boolean = true;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private residentService: ResidentService,
    private toastService: ToastService,
    public userService: UserService
  ) { }

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  addresses: any[] = [];
  ngOnInit(): void {
    if (this.data?.profileImage) {
      this.userService.updateImage(this.data.profileImage);
    }
    if (this.data) {
      this.isPublic = this.data.isPublic;
    }

    this.loadAddresses();
    console.log('data 123 ==> ', this.data);
    this.profileForm = this.fb.group({
      id: [this.data.id || ''],
      name: [this.data.name || '', [Validators.required, Validators.minLength(2)]],
      email: [this.data.email || '', [Validators.email]],
      phone: [{ value: this.data.phone || '', disabled: true }],
      age: [
        this.data.age || '',
        [Validators.min(0), Validators.max(120)],
      ],
      gender: [this.data.gender || '', Validators.required],
      aadharNumber: [
        { value: this.data.aadharNumber || '', disabled: true }],
      houseNumber: [
        this.data.houseNumber || '',
        [Validators.required],
      ],
      addressId: [this.data.address?.id || '', Validators.required],
      createdAt: [this.data.createdAt || ''],
      updatedAt: [this.data.updatedAt || ''],
    });

    // 🔒 Disable all fields if in view-only mode
    if (this.isViewOnly) {
      this.profileForm.disable(); // disables all controls except already-disabled ones
    }


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

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe(
      (data: any) => {
        this.addresses = data;
        console.log('ADDRESSES => ', this.addresses);
        // Extracting cities from formattedAddress
      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );
  }

  onPrivacyToggle(): void {
    this.isPublic = !this.isPublic;

    const updatedPrivacy = { 
      id: this.data.id,
      isPublic: this.isPublic 
    };

    // this.residentService.updatePrivacySetting(updatedPrivacy).subscribe({
    //   next: (response) => {
    //     console.log('Privacy updated successfully', response.message);
    //     this.toastService.showSuccess(response.message);
    //   },
    //   error: (error) => {
    //     console.error('Error updating privacy', error);
    //     // Agar error aaye toh value ko wapas palat dein
    //     this.isPublic = !this.isPublic;
    //     this.toastService.showError(error.message);
    //   }
    // });
  }

  get formattedAddress(): string {
    const addr = this.data.address;
    return `${addr.villageName || ''}, ${addr.postOffice || ''}, ${addr.block || ''}, ${addr.district || ''}, ${addr.state || ''}, ${addr.country || ''} - ${addr.city || ''}`;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const payload = this.profileForm.getRawValue(); // includes readonly fields
      console.log('Submitting resident data:', payload);

      this.residentService.updateDetails(this.data.id, payload).subscribe({
        next: (response) => {
          this.toastService.showSuccess(response.message || 'Profile updated successfully');
        },
        error: (err) => {
          console.error('Profile update failed:', err.details);
          this.toastService.showError(err.message || 'Something went wrong');
        }
      });
    }
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
    console.log('UPDATE PSW 1111 ===> ', updatePasswordData);
    // Call API to update password
    this.residentService.updatePassword(updatePasswordData).subscribe(
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

  openImage(): void {
    this.selectedImage = this.userService.profileImage(); // or the updated image URL
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

}
