import { Component, Input, OnInit } from '@angular/core';
import { SarpanchResponse } from '../../../shared/interfaces/sarpanch/sarpanch-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenderPipe } from '../../../shared/pipes/gender.pipe';
import { Address } from '../../../shared/interfaces/address/address';
import { AddressService } from '../../../shared/services/address.service';

@Component({
  selector: 'app-sarpanch-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, GenderPipe],
  templateUrl: './sarpanch-profile.component.html',
  styleUrl: './sarpanch-profile.component.scss'
})
export class SarpanchProfileComponent {
  @Input() data!: SarpanchResponse;
  @Input() isViewOnly: boolean = true;
  @Input() isDeleted: boolean = true;

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

}
