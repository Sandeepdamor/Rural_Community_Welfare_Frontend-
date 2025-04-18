import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) {}

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
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
  }

  isActiveRoute(route: string): boolean {
   
    return this.currentRoute === route;
  }

  @HostListener('window:load', ['$event'])
  onWindowLoad(event: Event): void {
    // this.applyActiveClass(this.router.url);
    console.log('====================================11111111111111111111');

    let element = document.getElementById('this.router.url') as HTMLElement;
    element ? element.classList.add('active') : '';
  }
}
