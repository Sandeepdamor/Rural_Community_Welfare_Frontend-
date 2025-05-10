import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { catchError, Observable } from 'rxjs';
import { PageResponse } from '../interfaces/page-response';
import { PaginationRequest } from '../interfaces/pagination-request';
import { SchemeResponse } from '../interfaces/scheme/scheme-response';
import { ApiResponse } from '../interfaces/api-response';
import { SchemeRequest } from '../interfaces/scheme/scheme-request';
import { SearchRequest } from '../interfaces/sarpanch/search-request';
import { SchemeFilter } from '../interfaces/scheme/scheme-filter';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {
  private apiUrl = 'http://localhost:9096/scheme';

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  // Add Scheme method
  addScheme(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/add`, formData).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })

    );
  }

  getAllSchemes(
    isActive: boolean | null,
    status: string | null,
    pagination: PaginationRequest
  ): Observable<PageResponse<SchemeResponse>> {
    let params = new HttpParams()
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', pagination.sortBy);

    if (isActive !== null && isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }

    if (status !== null && status.trim() !== '') {
      params = params.set('status', status.trim());
    }

    return this.http.get<PageResponse<SchemeResponse>>(`${this.apiUrl}/get-all-schemes`, { params }).pipe(
      catchError((error) => this.errorService.handleError(error))
    );
  }

  getDeletedSchemes(pagination: PaginationRequest
  ): Observable<PageResponse<SchemeResponse>> {
    let params = new HttpParams()
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', pagination.sortBy);

    return this.http.get<PageResponse<SchemeResponse>>(`${this.apiUrl}/get-deleted-schemes`, { params }).pipe(
      catchError((error) => this.errorService.handleError(error))
    );
  }

  updateSchemeStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/change-status/${id}`, null, {
      params: {
        status: status
      }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  updateIsActiveStatus(id: string, isActive: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/change-isactive-status/${id}`, null, {
      params: {
        isActive: isActive
      }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  getSchemeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get`, {
      params: { id }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  updateScheme(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, formData);
  }


  deleteScheme(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, {
      params: { id }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })

    );
  }

  //Search Scheme By Name, criteria, process or benefits
  searchScheme(search: SearchRequest): Observable<any> {
    const params: any = {
      keyword: search.keyword,
      isDeleted: search.isDeleted,
      pageNumber: search.pageNumber,
      pageSize: search.pageSize,
      sortBy: search.sortBy,
    };

    console.log('SEARCH ===>> ',search);

    return this.http.get(`${this.apiUrl}/scheme-search-request`, { params }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  //Search Scheme By Name, criteria, process or benefits
  searchDeletedScheme(search: SearchRequest): Observable<any> {
    const params: any = {
      keyword: search.keyword,
      pageNumber: search.pageNumber,
      pageSize: search.pageSize,
      sortBy: search.sortBy,
    };

    console.log('SEARCH ===>> ',search);

    return this.http.get(`${this.apiUrl}/deleted-search-request`, { params }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  filterScheme(filters: SchemeFilter): Observable<any> {
    const params: any = {
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
      sortBy: filters.sortBy || 'createdAt',
    };

    if (filters.category) params.categoryId = filters.category;
    if (filters.status) params.status = filters.status;
    if (filters.createdBy) params.createdBy = filters.createdBy;
    if (filters.isActive !== null && filters.isActive !== undefined) {
      params.isActive = filters.isActive;
    }
    if (filters.isDeleted !== null && filters.isDeleted !== undefined) {
      params.isDeleted = filters.isDeleted;
    }

    console.log('FILTERS ====> ',filters);

    return this.http.get(`${this.apiUrl}/scheme-filter-request`, { params }).pipe(
      catchError((error) => this.errorService.handleError(error))
    );
  }


  filterDeletedScheme(filters: SchemeFilter): Observable<any> {
    const params: any = {
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
      sortBy: filters.sortBy || 'createdAt',
    };

    if (filters.category) params.categoryId = filters.category;
    if (filters.status) params.status = filters.status;
    if (filters.createdBy) params.createdBy = filters.createdBy;
    if (filters.isActive !== null && filters.isActive !== undefined) {
      params.isActive = filters.isActive;
    }

    console.log('FILTERS ====> ',filters);

    return this.http.get(`${this.apiUrl}/delete-filter-request`, { params }).pipe(
      catchError((error) => this.errorService.handleError(error))
    );
  }




}
