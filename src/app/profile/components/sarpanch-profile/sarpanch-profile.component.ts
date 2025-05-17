import { Component, Input, OnInit, signal } from '@angular/core';
import { SarpanchResponse } from '../../../shared/interfaces/sarpanch/sarpanch-response';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { GenderPipe } from '../../../shared/pipes/gender.pipe';
import { Address } from '../../../shared/interfaces/address/address';
import { AddressService } from '../../../shared/services/address.service';
import { UserService } from '../../../shared/services/user.service';
import { ToastService } from '../../../shared/services/toast.service';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { TokenService } from '../../../shared/services/token.service';
import { Role } from '../../../enums/role.enum';
import { ComponentRoutes } from '../../../shared/utils/component-routes';
import { Router } from '@angular/router';
import { UpdatePasswordRequest } from '../../../shared/interfaces/admin/update-password-request';
import { ApiResponse } from '../../../shared/interfaces/api-response';

declare var bootstrap: any;
@Component({
  selector: 'app-sarpanch-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, GenderPipe, ReactiveFormsModule],
  templateUrl: './sarpanch-profile.component.html',
  styleUrl: './sarpanch-profile.component.scss'
})
export class SarpanchProfileComponent implements OnInit {
  @Input() data!: SarpanchResponse;
  @Input() isViewOnly: boolean = true;
  @Input() isDeleted: boolean = true;
  @Input() profileUrl!: string;


  profileImage = signal<string>('assets/images/svg/profile.svg');
  selectedImage: string | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  Role = Role;
  role: Role;
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private toastService: ToastService,
    private sarpanchService: SarpanchService,
    private tokenService: TokenService,
    private router: Router
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.role = roleString as Role;
  }

  yesterday: string = '';


  // 🛠 String ko Address object mein convert karne ka method
  parseAddressString(addressString: string): Address {
    const address: any = {};

    const content = addressString.substring(
      addressString.indexOf('(') + 1,
      addressString.lastIndexOf(')')
    );

    const parts = content.split(',');

    parts.forEach(part => {
      const [key, value] = part.split('=');
      if (key && value) {
        address[key.trim()] = value.trim();
      }
    });

    return address as Address;
  }

  ngOnInit(): void {
    if (this.role === this.data?.role) {
      if (this.data?.profileImage) {
        this.userService.updateImage(this.data.profileImage);
        this.profileUrl = this.data.profileImage;
      }
    } else if (this.data?.profileImage) {
      this.profileUrl = this.data.profileImage;
      this.userService.showImage(this.profileUrl);
    }

    this.initializeDateLimits();
    this.profileForm = this.fb.group({
      id: [this.data.id || ''],
      name: [this.data.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z\s]+$/)]],
      fatherOrHusbandName: [this.data.fatherOrHusbandName || '', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z\s]+$/)]],
      dateOfBirth: [this.data.dateOfBirth || '', Validators.required],
      age: [this.data.age || ''],
      gender: [this.data.gender || '', Validators.required],
      phone: [this.data.phone || '', [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]],
      email: [this.data.email || '', [Validators.required, Validators.email]],
      aadharNumber: [this.data.aadharNumber || '', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      addressId: [this.data.address.id || '', Validators.required],
      houseNumber: [this.data.houseNumber || '', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(1), Validators.maxLength(50)]],
      gramPanchayatName: [this.data.gramPanchayatName || '', Validators.required],
      wardNumber: [this.data.wardNumber || '', [Validators.pattern(/^[0-9]+$/)]],
      electionYear: [this.data.electionYear || '', [Validators.required, Validators.min(2000), Validators.max(2100)]],
      termStartDate: [this.data.termStartDate || '', Validators.required],
      termEndDate: [this.data.termEndDate || '', Validators.required],
      villageIds: [this.data.villages, [Validators.minLength(1)]],
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

  initializeDateLimits(): void {
    const today = new Date();
    // DOB restriction (only past, not today)
    const yesterdayDate = new Date(today);
    yesterdayDate.setDate(today.getDate() - 1);
    this.yesterday = yesterdayDate.toISOString().split('T')[0];
  }

  // 📍 Sarpanch ke main address ka format
  get formattedAddress(): string {
    if (!this.data?.address) {
      return '';
    }

    let addr: Address;

    if (typeof this.data.address === 'string') {
      addr = this.parseAddressString(this.data.address);
    } else {
      addr = this.data.address;
    }

    return this.formatAddress(addr);
  }

  // 📍 Single Address ko format karne ka method
  formatAddress(addr: Address): string {
    return `${addr.villageName || ''}, ${addr.postOffice || ''}, ${addr.block || ''}, ${addr.district || ''}, ${addr.state || ''}, ${addr.country || ''} - ${addr.city || ''}`;
  }

  // 📍 Assigned Villages ko format karke dena
  get formattedAssignedVillages(): string[] {
    if (!this.data?.villages || this.data.villages.length === 0) {
      return [];
    }

    console.log('======>>>>> ', this.data.villages);

    return this.data.villages.map(village => {
      let addr: Address;

      if (typeof village === 'string') {
        addr = this.parseAddressString(village);
      } else {
        addr = village;
      }

      return this.formatAddress(addr);
    });
  }

  onDateOfBirthChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;  // Typecast the event target
    const dob = inputElement.value;  // Now you can safely access the value
    if (dob) {
      const age = this.sarpanchService.calculateAge(new Date(dob));
      this.profileForm.get('age')?.setValue(age, { emitEvent: false });
      console.log("Date of Birth changed:", dob, "Age calculated:", age);
    }
  }



  onSubmit() {
    if (this.profileForm.valid) {
      // Step 1: Get village IDs from this.data.villages
      const villageIds = this.data.villages.map(v => v.id);

      // Step 2: Set village IDs to the form control
      this.profileForm.get('villageIds')?.setValue(villageIds);
      const payload = this.profileForm.getRawValue(); // includes readonly fields
      console.log('Submitting resident data:', payload);

      this.sarpanchService.updateDetails(this.data.id, payload).subscribe({
        next: (response) => {
          this.data = response.response;
          this.toastService.showSuccess(response.message || 'Profile updated successfully');
        },
        error: (err) => {
          console.error('Profile update failed:', err.details);
          this.toastService.showError(err.message || 'Something went wrong');
        }
      });
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

  openImage(): void {
    if (this.role === this.data?.role) {
      this.selectedImage = this.userService.getProfileImageUrl();
    } else {
      this.selectedImage = this.userService.getViewedProfileImageUrl();
    }
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
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
      this.sarpanchService.updatePassword(updatePasswordData).subscribe(
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



}
