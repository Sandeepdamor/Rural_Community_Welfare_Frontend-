import { Injectable } from '@angular/core';
import { PageResponse } from '../interfaces/page-response';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { PaginationRequest } from '../interfaces/pagination-request';
import { catchError, Observable, throwError } from 'rxjs';
import { SarpanchResponse } from '../interfaces/sarpanch/sarpanch-response';
import { SarpanchRequest } from '../interfaces/sarpanch/sarpanch-request';
import { ApiResponse } from '../interfaces/api-response';
import { ErrorResponse } from '../interfaces/error/error-response';

@Injectable({
  providedIn: 'root'
})
export class SarpanchService {
  private apiUrl = 'http://localhost:9096/sarpanch';
  
  constructor(private http: HttpClient, private tokenService: TokenService) { }


  addSarpanch(sarpanchRequest: SarpanchRequest): Observable<ApiResponse> {
    return this.http.post<any>(`${this.apiUrl}/add`, sarpanchRequest).pipe(
      catchError((error: any) => {
        let errorResponse: ErrorResponse = {
          status: error.status,
          message: error.message,
          date: new Date().toISOString(),
          details: error.error?.details || 'An unexpected error occurred' // Catching the error details
        };
        return throwError(() => errorResponse);  // Return the error details
      })
    );
  }
  

  getAllSarpanch(isDeleted: boolean, pagination: PaginationRequest): Observable<PageResponse<SarpanchResponse>> {
    return this.http.get<PageResponse<SarpanchResponse>>(
      `${this.apiUrl}/get-all-sarpanch`,
      {
        params: {
          is_deleted: isDeleted.toString(),
          pageNumber: pagination.pageNumber.toString(),
          pageSize: pagination.pageSize.toString(),
          sortBy: pagination.sortBy
        }
      }
    );
  }

  getSarpanchById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-sarpanch`, {
      params: { id }
    });
  }

  getSarpanchByMobile(mobile: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-by-mobile`, {
      params: { mobile }
    });
  }

  deleteSarpanch(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, {
      params: { id }
    });
  }
}
