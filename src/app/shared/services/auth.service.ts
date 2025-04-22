import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Role } from '../../enums/role.enum';
import { ComponentRoutes } from '../utils/component-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9096/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) { }

  // Login API call
  public login(user: any): Observable<any> {
    console.log("Logging in with: ", user);
    this.tokenService.clearTokens();
    return this.http.post(`${this.apiUrl}/login`, {
      mobileNumber: user.mobileNumber,
      password: user.password
    });
  }

  // Register API call
  public register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.tokenService.getAccessToken() !== null;
  }

  // Logout method
  logout(): void {
    this.tokenService.clearTokens();  // Use TokenService to remove token
    this.router.navigate([ComponentRoutes.USERAUTH]);
  }

  // Verify OTP
  verifyOtp(otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { otp });
  }

  //Resend OTP
  resendOtp(): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-otp`,null);
  }

  //Forgot Password
  sendOtpForForgotPassword(mobileNumber: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { mobileNumber });
  }

  // Change Password
  changePassword(newPassword: string, confirmPassword: string): Observable<any> {
    const token = this.tokenService.getAccessToken();
    return this.http.patch(`${this.apiUrl}/change-password`, { newPassword, confirmPassword });
  }

//Verify Aadhar API 
verifyAadhaar(aadharNumber: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/verify-aadhar`, { aadharNumber });
}

getLoggedInUserRole(): Role | null {
  return this.tokenService.getRoleFromToken();
}


}
