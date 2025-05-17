import { Component, Input, OnInit, signal } from '@angular/core';
import { SarpanchResponse } from '../../../shared/interfaces/sarpanch/sarpanch-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenderPipe } from '../../../shared/pipes/gender.pipe';
import { Address } from '../../../shared/interfaces/address/address';
import { AddressService } from '../../../shared/services/address.service';
import { UserService } from '../../../shared/services/user.service';
import { ToastService } from '../../../shared/services/toast.service';

declare var bootstrap: any;
@Component({
  selector: 'app-sarpanch-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, GenderPipe],
  templateUrl: './sarpanch-profile.component.html',
  styleUrl: './sarpanch-profile.component.scss'
})
export class SarpanchProfileComponent implements OnInit {
  @Input() data!: SarpanchResponse;
  @Input() isViewOnly: boolean = true;
  @Input() isDeleted: boolean = true;

  profileImage = signal<string>('assets/images/svg/profile.svg');
  selectedImage: string | null = null;

  constructor(
    public userService: UserService,
    private toastService: ToastService
  ){}


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
     if (this.data?.profileImage) {
      this.userService.updateImage(this.data.profileImage);
    }
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
