import { Component, OnInit } from '@angular/core';
import { ResidentResponse } from '../../../shared/interfaces/resident/resident-response';
import { ResidentService } from '../../../shared/services/resident.service';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../../enums/role.enum';
import { AuthService } from '../../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { GenderPipe } from '../../../shared/pipes/gender.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule,GenderPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isDataLoaded = false;
  resident: ResidentResponse = {
    id: '',
    name: '',
    email: '',
    phone: '',
    age: null,
    gender: '',
    aadharNumber: '',
    aadharVerificationStatus: '',
    address: {
      country: '',
      state: '',
      district: '',
      block: '',
      city: '',
      villageName: '',
      postOffice: '',
    },
    houseNumber: '',
    // appliedSchemes: Scheme[]; // Assuming Scheme is a defined interface/model
    isDeleted: null,
    isActive: null,
    createdAt: '', // Use string if it's serialized as ISO date from backend
    updatedAt: '',
  };
  isViewOnly: boolean = true;
  constructor(
    private residentService: ResidentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const residentId = this.route.snapshot.paramMap.get('id'); // Get the ID from the URL
    if (residentId) {
      this.residentService.getResidentById(residentId).subscribe(
        (response) => {
          console.log('RESPONSE => ', response);
          this.resident = response.response; // Assign the fetched data to the resident variable
          this.isDataLoaded = true;
          console.log('RESIDENT IN PROFILE => ', this.resident)
          const role = this.authService.getLoggedInUserRole();
          this.isViewOnly = role !== Role.RESIDENT;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }
  

  get formattedAddress(): string {
    const addr = this.resident.address;
    return `${addr.villageName || ''}, ${addr.postOffice || ''}, ${addr.block || ''}, ${addr.district || ''}, ${addr.state || ''}, ${addr.country || ''} - ${addr.city || ''}`;
  }

  // Method to update the profile
  updateProfile(): void {
    if (!this.isViewOnly) {
      // this.residentService.updateResident(this.resident).subscribe(
      //   (response) => {
      //     console.log('Profile updated successfully', response);
      //   },
      //   (error) => {
      //     console.error('Error updating profile:', error);
      //   }
      // );
    }
  }

}
