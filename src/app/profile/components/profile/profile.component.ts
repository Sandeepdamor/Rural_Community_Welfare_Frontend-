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
import { DeletedSarpanchService } from '../../../shared/services/deleted-sarpanch.service';
import { UserResponse } from '../../../shared/interfaces/user/user-response';
import { Role } from '../../../enums/role.enum';
import { UserService } from '../../../shared/services/user.service';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, ResidentProfileComponent, SarpanchProfileComponent, AdminProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isDataLoaded = false;
  userType: string = '';
  isViewOnly: boolean = true;
  isDeleted: boolean = false; // Track if the profile is deleted


  // Hold separately the two models
  resident!: ResidentResponse;
  sarpanch!: SarpanchResponse;
  admin!: UserResponse;

  constructor(
    private residentService: ResidentService,
    private sarpanchService: SarpanchService,
    private deletedSarpanchService: DeletedSarpanchService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    private tokenService: TokenService,
    private userService: UserService
  ) {

    console.log('PROFILE');
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Profile ID
    const type = this.route.snapshot.paramMap.get('type');   // "resident" or "sarpanch"
    this.userType = type ?? '';

    const loggedInRole = this.authService.getLoggedInUserRole();
    const mobile = this.tokenService.getMobileNumberFromAccessToken();

    // ✅ Case 1: Logged-in user's own profile (/profile)
    if (!userId && !type) {
      if (mobile) {
        if (loggedInRole === 'RESIDENT') {
          this.residentService.getResidentByMobile(mobile).subscribe({
            next: (res) => {
              this.resident = res.response;
              this.userType = 'resident';
              this.isViewOnly = false;
              this.isDataLoaded = true;
            },
            error: (err) => {
              console.error('Error loading resident profile', err);
            }
          });
        } else if (loggedInRole === 'SARPANCH') {
          this.sarpanchService.getSarpanchByMobile(mobile).subscribe({
            next: (res) => {
              this.sarpanch = res.response;
              this.userType = 'sarpanch';
              this.isViewOnly = false;
              this.isDataLoaded = true;
            },
            error: (err) => {
              console.error('Error loading sarpanch profile', err);
            }
          });
        } else if (loggedInRole === 'ADMIN') {
          // You can use a dummy admin object or build an admin profile API if needed
          this.userService.getUserByMobile(mobile).subscribe({
            next: (res) => {
              console.log('ADMIN ==> ',res.response);
              this.admin = res.response;
              this.userType = 'admin';
              this.isViewOnly = false;
              this.isDataLoaded = true;
            },
            error: (err) => {
              console.error('Error loading sarpanch profile', err);
            }
          });
        }
      }
      return;
    }

    // ✅ Case 2: Viewing someone's profile via /profile/:id/:type
    if (userId && this.userType) {
      if (this.userType === 'resident') {
        this.residentService.getResidentById(userId).subscribe(response => {
          this.resident = response.response;
          console.log('RESIDENT PROFILE => ', this.resident);

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
          console.log('SARPANCH PROFILE => ', this.sarpanch);
          this.isDataLoaded = true;
          // For sarpanch profiles, set view-only mode.
          this.isViewOnly = true;
        });
      }
      else if (this.userType === 'deleted') {
        this.deletedSarpanchService.getSarpanchById(userId).subscribe(response => {
          this.sarpanch = response.response;
          console.log('DELETED SARPANCH PROFILE => ', this.sarpanch);
          this.isDataLoaded = true;
          // For sarpanch profiles, set view-only mode.
          this.isViewOnly = true;
          this.isDeleted = true;
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
