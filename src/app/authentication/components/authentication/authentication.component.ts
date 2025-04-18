import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit {
  ngOnInit(): void {

  }

}
