import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PaginationRequest } from '../interfaces/pagination-request';
import { PageResponse } from '../interfaces/page-response';
import { ResidentResponse } from '../interfaces/resident/resident-response';
import { TokenService } from './token.service';
import { ResidentSearch } from '../interfaces/resident/resident-search';
import { ResidentFilter } from '../interfaces/resident/resident-filter';
import { ErrorService } from './error.service';
import { UpdatePasswordRequest } from '../interfaces/admin/update-password-request';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  private apiUrl = 'http://localhost:9096/resident';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private errorService: ErrorService
  ) { }

  getAllResidents(
    status: string,
    isDeleted: boolean,
    pagination: PaginationRequest
  ): Observable<PageResponse<ResidentResponse>> {
    const role = this.tokenService.getRoleFromToken();

    let params = new HttpParams()
      .set('status', status)
      .set('isDeleted', isDeleted.toString())
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', pagination.sortBy);

    let url = '';

    if (role === 'ADMIN') {
      url = `${this.apiUrl}/getAllResident`;
    } else if (role === 'SARPANCH') {
      url = `${this.apiUrl}/get-residents`;
    } else if (role === 'RESIDENT') {
      url = `${this.apiUrl}/get-residents`;
    }
    else {
      console.warn('Unauthorized role for fetching residents:', role);
      return throwError(() => new Error('Unauthorized role'));
    }

    return this.http.get<PageResponse<ResidentResponse>>(url, { params }).pipe(
      catchError((error) => this.errorService.handleError(error))
    );
  }

  updateDetails(id: string, payload: any): Observable<any> {
    console.log('PAYLOAD IN UPDATE RESIDENT ===> ', payload);
    return this.http.patch(`${this.apiUrl}/update/${id}`, payload).pipe(
      catchError((error) => this.errorService.handleError(error))
    );
  }

  updateStatus(id: string, isActive: boolean): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/change-resident-status/${id}`,
      null,
      {
        params: {
          isActive: isActive.toString(),
        },
      }
    );
  }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest): Observable<ApiResponse> {
    // return this.http.post<ApiResponse>(`${this.apiUrl}/add`, sarpanchRequest).
    return this.http.patch<ApiResponse>(`${this.apiUrl}/update-password`, updatePasswordRequest).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  updateAadharStatus(id: string, status: string, response: string): Observable<any> {
    const body = {
      residentId: id,
      aadharStatus: status
    };
    return this.http.patch(`${this.apiUrl}/verify-aadhar`, body);
  }

  //Search Resident By Name, Address (VillageName,City,District,State) or Mobile Number
  searchResidents(search: ResidentSearch): Observable<any> {
    const params: any = {
      keyword: search.keyword,
      aadharStatus: search.aadharStatus,
      isDeleted: search.isDeleted,
      pageNumber: search.pageNumber,
      pageSize: search.pageSize,
      sortBy: search.sortBy || 'createdAt',
    };

    return this.http.get(`${this.apiUrl}/resident-search-request`, { params });
  }

  filterResidents(filters: ResidentFilter): Observable<any> {
    const params: any = {
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
      sortBy: filters.sortBy || 'createdAt',
    };

    if (filters.gramPanchayat) params.gramPanchayat = filters.gramPanchayat;
    if (filters.gender) params.gender = filters.gender;
    if (filters.minAge !== undefined && filters.minAge !== null) {
      params.minAge = filters.minAge;
    }
    if (filters.maxAge !== undefined && filters.maxAge !== null) {
      params.maxAge = filters.maxAge;
    }
    if (filters.isActive !== undefined && filters.isActive !== null) {
      params.isActive = filters.isActive;
    }
    if (filters.aadharStatus) params.aadharStatus = filters.aadharStatus;

    console.log('FILTER REQUEST IN SERVICE ==>>> 3333 ', params);
    return this.http.get(`${this.apiUrl}/resident-filter-request`, { params });
  }

  getResidentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getById`, {
      params: { id },
    });
  }

  getResidentByMobile(mobile: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-by-mobile`, {
      params: { mobile },
    });
  }

  deleteResident(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, {
      params: { id },
    });
  }
}
