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
import { ErrorService } from './error.service';
import { SarpanchFilter } from '../interfaces/sarpanch/sarpanch-filter';
import { SearchRequest } from '../interfaces/sarpanch/search-request';

@Injectable({
  providedIn: 'root'
})
export class SarpanchService {
  private apiUrl = 'http://localhost:9096/sarpanch';

  constructor(private http: HttpClient, private tokenService: TokenService, private errorService: ErrorService) { }


  // Add Sarpanch method
  addSarpanch(sarpanchRequest: SarpanchRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/add`, sarpanchRequest).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
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
    ).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })

    );
  }

  getSarpanchById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-sarpanch`, {
      params: { id }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  getSarpanchByMobile(mobile: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-by-mobile`, {
      params: { mobile }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })

    );
  }

  deleteSarpanch(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, {
      params: { id }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })

    );
  }

  updateStatus(id: string, isActive: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/change-status/${id}`, null, {
      params: {
        isActive: isActive.toString()
      }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }


  filterSarpanch(filters: SarpanchFilter): Observable<any> {
    const params: any = {
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
      sortBy: filters.sortBy || 'createdAt',
    };

    if (filters.gender) params.gender = filters.gender;
    if (filters.gramPanchayat) params.gramPanchayat = filters.gramPanchayat;
    if (filters.minAge !== undefined && filters.minAge !== null) {
      params.minAge = filters.minAge;
    }
    if (filters.maxAge !== undefined && filters.maxAge !== null) {
      params.maxAge = filters.maxAge;
    }
    if (filters.minElectionYear !== undefined && filters.minElectionYear !== null) {
      params.minElectionYear = filters.minElectionYear;
    }
    if (filters.maxElectionYear !== undefined && filters.maxElectionYear !== null) {
      params.maxElectionYear = filters.maxElectionYear;
    }
    if (filters.isActive !== undefined && filters.isActive !== null) {
      params.isActive = filters.isActive;
    }
    return this.http.get(`${this.apiUrl}/filter-request`, { params }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }


  //Search Sarpanch By Name, FatherHusbandName, Email, Aadhar Number, Address (VillageName,City,District,State) or Mobile Number
  searchSarpanch(search: SearchRequest): Observable<any> {
    const params: any = {
      keyword: search.keyword,
      pageNumber: search.pageNumber,
      pageSize: search.pageSize,
      sortBy: search.sortBy,
    };

    return this.http.get(`${this.apiUrl}/search-request`, { params }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }


}
