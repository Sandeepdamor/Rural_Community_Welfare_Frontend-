import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { Role } from '../../enums/role.enum';
import { ComponentRoutes } from '../utils/component-routes';
import { UserService } from './user.service';
import { SarpanchService } from './sarpanch.service';
import { ResidentService } from './resident.service';
import { UserResponse } from '../interfaces/user/user-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9096/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private sarpanchService: SarpanchService,
    private residentService: ResidentService
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

getLoggedInUser(): Observable<any> {
  const mobile = this.tokenService.getMobileNumberFromAccessToken();

  if (!mobile) {
    return throwError(() => new Error('Mobile number not found in token.'));
  }

  // Step 1: Get base user by mobile number
  return this.userService.getUserByMobile(mobile).pipe(
    switchMap(userResponse => {
      const user = userResponse.response;

      if (!user) {
        return throwError(() => new Error('User not found.'));
      }

      // If the role is 'ADMIN', return the user object directly
      if (user.role === 'ADMIN') {
        return of(user);
      }

      // Step 2: For non-admin roles, fetch additional profile details
      if (user.role === 'RESIDENT') {
        return this.residentService.getResidentById(user.id).pipe(
          map(residentResponse => ({
            ...user,
            profileDetails: residentResponse.response
          }))
        );
      } else if (user.role === 'SARPANCH') {
        return this.sarpanchService.getSarpanchById(user.id).pipe(
          map(sarpanchResponse => ({
            ...user,
            profileDetails: sarpanchResponse.response
          }))
        );
      } else {
        return throwError(() => new Error('Unknown role.'));
      }
    }),
    catchError(error => {
      console.error('Error in getLoggedInUser:', error);
      return throwError(() => new Error(error.message || 'Failed to get user.'));
    })
  );
}


}
