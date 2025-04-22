import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ComponentRoutes } from '../../shared/utils/component-routes';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {
  constructor(private router: Router) { }
}
