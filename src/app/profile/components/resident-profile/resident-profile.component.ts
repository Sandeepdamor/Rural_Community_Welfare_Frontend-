import { Component, Input } from '@angular/core';
import { ResidentResponse } from '../../../shared/interfaces/resident/resident-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenderPipe } from '../../../shared/pipes/gender.pipe';

@Component({
  selector: 'app-resident-profile',
  imports: [FormsModule, CommonModule, GenderPipe],

  templateUrl: './resident-profile.component.html',
  styleUrl: './resident-profile.component.scss'
})
export class ResidentProfileComponent {

  @Input() data!: ResidentResponse;
  @Input() isViewOnly: boolean = true;

  get formattedAddress(): string {
    const addr = this.data.address;
    return `${addr.villageName || ''}, ${addr.postOffice || ''}, ${addr.block || ''}, ${addr.district || ''}, ${addr.state || ''}, ${addr.country || ''} - ${addr.city || ''}`;
  }

}
