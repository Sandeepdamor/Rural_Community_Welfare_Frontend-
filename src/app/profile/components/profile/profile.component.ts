import { Component, OnInit } from '@angular/core';
import { ResidentResponse } from '../../../shared/interfaces/resident/resident-response';
import { ResidentService } from '../../../shared/services/resident.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { SarpanchResponse } from '../../../shared/interfaces/sarpanch/sarpanch-response';
import { TokenService } from '../../../shared/services/token.service';
import { ResidentProfileComponent } from '../resident-profile/resident-profile.component';
import { SarpanchProfileComponent } from '../sarpanch-profile/sarpanch-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule,ResidentProfileComponent, SarpanchProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isDataLoaded = false;
  userType: string = '';
  isViewOnly: boolean = true;

  // Hold separately the two models
  resident!: ResidentResponse;
  sarpanch!: SarpanchResponse;

  constructor(
    private residentService: ResidentService,
    private sarpanchService: SarpanchService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Profile ID
    const type = this.route.snapshot.paramMap.get('type');   // "resident" or "sarpanch"
    this.userType = type ?? '';
    if (userId && this.userType) {
      if (this.userType === 'resident') {
        this.residentService.getResidentById(userId).subscribe(response => {
          this.resident = response.response;
          console.log('RESIDENT PROFILE => ',this.resident);

          this.isDataLoaded = true;

          const mobile = this.tokenService.getMobileNumberFromAccessToken();
          const role = this.authService.getLoggedInUserRole();

          if (mobile) {
            this.residentService.getResidentByMobile(mobile).subscribe({
              next: (res) => {
                const loggedInUserId = res?.response?.id;
                this.isViewOnly = (role !== 'RESIDENT') || (userId !== loggedInUserId);
              },
              error: (err) => {
                console.error('Error fetching resident by mobile:', err);
                this.isViewOnly = true;
              }
            });
          } else {
            this.isViewOnly = true;
          }
        });
      } else if (this.userType === 'sarpanch') {
        this.sarpanchService.getSarpanchById(userId).subscribe(response => {
          this.sarpanch = response.response;
          console.log('SARPANCH PROFILE => ',this.sarpanch);
          this.isDataLoaded = true;
          // For sarpanch profiles, set view-only mode.
          this.isViewOnly = true;
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
