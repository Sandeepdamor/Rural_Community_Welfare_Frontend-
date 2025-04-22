import { Component, Input } from '@angular/core';
import { SarpanchResponse } from '../../../shared/interfaces/sarpanch/sarpanch-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenderPipe } from '../../../shared/pipes/gender.pipe';
import { Address } from '../../../shared/interfaces/address/address';

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

  get formattedAddress(): string {
    const addr = this.data.address;
    return `${addr.villageName || ''}, ${addr.postOffice || ''}, ${addr.block || ''}, ${addr.district || ''}, ${addr.state || ''}, ${addr.country || ''} - ${addr.city || ''}`;
  }

  formatAddress(addr: Address): string {
    return `${addr.villageName || ''}, ${addr.postOffice || ''}, ${addr.block || ''}, ${addr.district || ''}, ${addr.state || ''}, ${addr.country || ''} - ${addr.city || ''}`;
  }

  get formattedAssignedVillages(): string[] {
    return this.data?.villages?.map(v => this.formatAddress(v)) || [];
  }
  
  
}
