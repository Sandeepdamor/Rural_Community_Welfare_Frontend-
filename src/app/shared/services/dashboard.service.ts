import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { ApiResponse } from '../interfaces/api-response';
import { DashboardData } from '../interfaces/dashboard-data';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:9096/dashboard';

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<ApiResponse>(`${this.apiUrl}`)
      .pipe(map(response => response.response)).pipe(
        catchError((error) => {
          return this.errorService.handleError(error); // Use ErrorService to handle errors
        })
      );
  }

}
