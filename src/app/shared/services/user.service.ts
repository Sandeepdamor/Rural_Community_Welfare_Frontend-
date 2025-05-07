import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:9096/user';

  constructor(private http: HttpClient, private errorService: ErrorService) {}

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
}
