import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    OtpVerificationComponent
  ]
})
export class AuthenticationModule { }
