import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { TokenService } from '../../services/token.service';
import { Role } from '../../../enums/role.enum';
import { ToastService } from '../../services/toast.service';
import { ResidentService } from '../../services/resident.service';
import { ProfileComponent } from '../../../profile/components/profile/profile.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, NgClass, CommonModule], // Remove NgModule
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'], // Corrected `styleUrls` property name
})
export class SidebarComponent implements OnInit {
  currentRoute: string | undefined;
  isUserMenuOpen = false;
  isSarpanchMenuOpen = false;
  isProjectMenuOpen = false;
  isSchemeMenuOpen = false;
  isAnnouncementMenuOpen = false;
  isGrievanceMenuOpen = false;
  Role = Role;
  role: Role;
  sarpanchId = null;
  constructor(private router: Router, private route: ActivatedRoute, private tokenService: TokenService,
    private toastService: ToastService, private residentService: ResidentService
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.role = roleString as Role; // ✅ safely assign enum
  }


  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  toggleSarpanchMenu() {
    this.isSarpanchMenuOpen = !this.isSarpanchMenuOpen;
  }
  toggleProjectMenu() {
    this.isProjectMenuOpen = !this.isProjectMenuOpen;
  }
  toggleSchemesMenu() {
    this.isSchemeMenuOpen = !this.isSchemeMenuOpen;
  }
  toggleAnnouncementMenu() {
    this.isAnnouncementMenuOpen = !this.isAnnouncementMenuOpen;
  }
  toggleGrievanceMenu() {
    this.isGrievanceMenuOpen = !this.isGrievanceMenuOpen;
  }

  ngOnInit(): void {
    // Set current route on component initialization
    this.currentRoute = this.router.url;
    // alert('Initial route: ' + this.router.url);

    // Subscribe to navigation events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    console.log('ROLE SIDEBAR => ', this.role);
    if (this.role === 'RESIDENT') {
      const mobile = this.tokenService.getMobileNumberFromAccessToken();
      if (mobile) {
        this.residentService.getResidentByMobile(mobile).subscribe(response => {
          console.log('RESPONSE FOR SARPANCH ID ==> ', response.response.sarpanch.id);
          this.sarpanchId = response.response.sarpanch.id;
        });
      }
    }



  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute === route;
  }

  navigateToSarpanch() {
    if (this.sarpanchId) {
      this.router.navigate(['/sarpanch/profile', 'sarpanch', this.sarpanchId]);
    } else {
      this.toastService.showError("No Sarpanch assigned to your village yet.");
    }
  }

  @HostListener('window:load', ['$event'])
  onWindowLoad(event: Event): void {
    // this.applyActiveClass(this.router.url);
    let element = document.getElementById('this.router.url') as HTMLElement;
    element ? element.classList.add('active') : '';
  }
}
