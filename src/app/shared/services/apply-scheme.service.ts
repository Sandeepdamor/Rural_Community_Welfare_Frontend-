import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { PaginationRequest } from '../interfaces/pagination-request';
import { PageResponse } from '../interfaces/page-response';
import { SearchRequest } from '../interfaces/sarpanch/search-request';
import { SchemeFilter } from '../interfaces/scheme/scheme-filter';

@Injectable({
  providedIn: 'root'
})
export class ApplySchemeService {

  private apiUrl = 'http://localhost:9096/apply-scheme';

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  // Apply Scheme method
  applyScheme(data: { schemeId: string, userId: string }): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/apply`, data).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  getAllApplySchemes(status: string | null,
    pagination: PaginationRequest
  ): Observable<PageResponse<any>> {
    let params = new HttpParams()
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', pagination.sortBy);

    if (status !== null && status.trim() !== '') {
      params = params.set('status', status.trim());
    }

    return this.http.get<PageResponse<any>>(`${this.apiUrl}/get-all-applied`, { params }).pipe(
      catchError((error) => this.errorService.handleError(error))
    );
  }


  updateApprovalStatus(id: string, approvalStatus: string, reason: string): Observable<any> {
    const body = {
      requestId: id,
      status: approvalStatus,
      response: reason
    };
    return this.http.put(`${this.apiUrl}/update-applied-application`, body).pipe(
      catchError((error) => {
        return this.errorService.handleError(error);
      })
    );
  }

  searchApplyScheme(search: SearchRequest): Observable<PageResponse<any>> {
    const params: any = {
      keyword: search.keyword,
      status: search.status,
      pageNumber: search.pageNumber,
      pageSize: search.pageSize,
      sortBy: search.sortBy,
    };

    console.log('SEARCH ===>> ', search);
    return this.http.get<PageResponse<any>>(`${this.apiUrl}/search-request`, { params }).pipe(
      catchError((error) => this.errorService.handleError(error))
    );
  }

  filterApplyScheme(filters: SchemeFilter): Observable<PageResponse<any>> {
    const params: any = {
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
      sortBy: filters.sortBy || 'createdAt',
    };

    if (filters.status) params.status = filters.status;
    if (filters.gramPanchayatName) params.gramPanchayatName = filters.gramPanchayatName;
    if (filters.category) params.categoryId = filters.category;

    console.log('FILTERS ====> ', filters);
    return this.http.get<PageResponse<any>>(`${this.apiUrl}/filter-request`, { params }).pipe(
      catchError((error) => this.errorService.handleError(error))
    );
  }
}
