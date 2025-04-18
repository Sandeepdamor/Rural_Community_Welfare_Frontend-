import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentRoutes } from '../../shared/utils/component-routes';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {
  constructor(private router: Router) { }

  navigateToLogin() {
    console.log('Navigating to login...');
    this.router.navigate([ComponentRoutes.USERAUTH]);
  }
}
