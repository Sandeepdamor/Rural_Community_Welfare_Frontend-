import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:9096/user';

  // private signal
  private _profileImage = signal<string>('assets/images/svg/profile.svg');
  private _showProfileImage = signal<string>('assets/images/svg/profile.svg');

  // read-only signal for components
  profileImage = this._profileImage.asReadonly();
  showProfileImage = this._showProfileImage.asReadonly();

  constructor(private http: HttpClient, private errorService: ErrorService) { }


  getUserByMobile(mobile: string): Observable<any> {
    console.log(mobile);
    return this.http
      .get(`${this.apiUrl}/get`, {
        params: { mobile },
      })
      .pipe(
        catchError((error) => {
          return this.errorService.handleError(error); // Use ErrorService to handle errors
        })
      );
  }

  getUserById(id: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/get-by-id`, {
        params: { id },
      })
      .pipe(
        catchError((error) => {
          return this.errorService.handleError(error); // Use ErrorService to handle errors
        })
      );
  }

  // method to update image
  updateImage(url: string) {
    this._profileImage.set(url);
  }

  showImage(url: string) {
    this._showProfileImage.set(url);
  }

  getProfileImageUrl(): string {
    return this._profileImage();
  }

  getViewedProfileImageUrl(): string {
    return this._showProfileImage();
  }

  uploadProfileImage(file: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.patch<ApiResponse>(`${this.apiUrl}/update-profile-image`, formData).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

}
