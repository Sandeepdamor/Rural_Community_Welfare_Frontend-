import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { authGuard } from '../guards/auth.guard';
import { AadhaarVerificationComponent } from './components/aadhaar-verification/aadhaar-verification.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    canActivate: [authGuard],
    children: [
      // {
      //   path: '',
      //   component: LoginComponent,
      //   pathMatch: 'full',
      // },
      {
        path: ComponentRoutes.LOGIN, // ✅ Set LoginComponent as the default child route
        component: LoginComponent,
      },
      {
        path: ComponentRoutes.ADMIN_SARPANCH_LOGIN, // ✅ Set LoginComponent as the default child route
        component: LoginComponent,
      },
      {
        path: ComponentRoutes.FORGOTPASSWORD,
        component: ForgetPasswordComponent,
      },
      {
        path: ComponentRoutes.NEWPASSWORD,
        component: NewPasswordComponent,
      },
      {
        path: ComponentRoutes.VERIFYOTP,
        component: OtpVerificationComponent,
      },
      {
        path: ComponentRoutes.VERIFY_AADHAR,
        component: AadhaarVerificationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
