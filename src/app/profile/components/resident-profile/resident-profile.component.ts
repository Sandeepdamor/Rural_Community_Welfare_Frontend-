import { Component, Input, OnInit } from '@angular/core';
import { ResidentResponse } from '../../../shared/interfaces/resident/resident-response';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenderPipe } from '../../../shared/pipes/gender.pipe';
import { AddressService } from '../../../shared/services/address.service';
import { ResidentService } from '../../../shared/services/resident.service';
import { ToastService } from '../../../shared/services/toast.service';
import { UpdatePasswordRequest } from '../../../shared/interfaces/admin/update-password-request';
import { ApiResponse } from '../../../shared/interfaces/api-response';

@Component({
  selector: 'app-resident-profile',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, GenderPipe],

  templateUrl: './resident-profile.component.html',
  styleUrl: './resident-profile.component.scss'
})
export class ResidentProfileComponent implements OnInit {

  @Input() data!: ResidentResponse;
  @Input() isViewOnly: boolean = true;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private residentService: ResidentService,
    private toastService: ToastService
  ) { }

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  addresses: any[] = [];

  ngOnInit(): void {
    this.loadAddresses();
    console.log('data ==> ', this.data);
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
    console.log('UPDATE PSW 1111 ===> ',updatePasswordData);
    // Call API to update password
    this.residentService.updatePassword(updatePasswordData).subscribe(
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

}
