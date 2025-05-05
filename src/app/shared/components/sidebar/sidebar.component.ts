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
  Role = Role;
  role: Role; 
  constructor(private router: Router, private route: ActivatedRoute,private tokenService: TokenService) {
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
    console.log('ROLE SIDEBAR => ',this.role);
  }

  isActiveRoute(route: string): boolean {
   
    return this.currentRoute === route;
  }

  @HostListener('window:load', ['$event'])
  onWindowLoad(event: Event): void {
    // this.applyActiveClass(this.router.url);
    let element = document.getElementById('this.router.url') as HTMLElement;
    element ? element.classList.add('active') : '';
  }
}
