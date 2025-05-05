import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { catchError, Observable } from 'rxjs';
import { UpdatePasswordRequest } from '../interfaces/admin/update-password-request';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:9096/admin';

  constructor(private http: HttpClient,private errorService: ErrorService) { }

  updateName(id: string, name: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update-name/${id}`, null, {
      params: {
        name: name
      }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest): Observable<ApiResponse> {
    // return this.http.post<ApiResponse>(`${this.apiUrl}/add`, sarpanchRequest).
    return this.http.patch<ApiResponse>(`${this.apiUrl}/reset-password`,updatePasswordRequest).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

}
