import { GrievanceFilter } from './../interfaces/Grievance/grievance-filter';
import { GrievanceResponse } from './../interfaces/Grievance/grievance-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PaginationRequest } from '../interfaces/pagination-request';
import { PageResponse } from '../interfaces/page-response';
import { TokenService } from './token.service';
import { ResidentSearch } from '../interfaces/resident/resident-search';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class GrievanceService {
  private apiUrl = 'http://localhost:9096/grievance';
  private Url = 'http://localhost:9096/resident';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private errorService: ErrorService
  ) {}

  // getAllGrievance(
  //   status: string,
  //   isActive: boolean,
  //   pagination: PaginationRequest
  // ): Observable<PageResponse<GrievanceResponse>> {
  //   return this.http.get<PageResponse<GrievanceResponse>>(
  //     `${this.apiUrl}/get-all-grievance`,
  //     {
  //       params: {
  //         status: status, // Dynamic status
  //         isActive: isActive.toString(),
  //         pageNumber: pagination.pageNumber.toString(),
  //         pageSize: pagination.pageSize.toString(),
  //         sortBy: pagination.sortBy,
  //       },
  //     }
  //   );
  // }

  getAllGrievance(
    status: string,
    isActive: boolean,
    pagination: PaginationRequest
  ): Observable<PageResponse<GrievanceResponse>> {
    const role = this.tokenService.getRoleFromToken();
    // const phone = this.tokenService.getMobileNumberFromAccessToken;
    // const phone2 = this.tokenService.getMobileNumberFromAuthToken;
    console.log('Role......' + role);

    let params = new HttpParams()
      .set('status', status)
      .set('isActive', isActive.toString())
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', pagination.sortBy);

    let url = '';
    if (role === 'ADMIN') {
      console.log('calling get-all-grievance ');
      url = `${this.apiUrl}/get-all-grievance`;
    } else if (role === 'RESIDENT') {
      console.log('resident service is calling');
      url = `${this.apiUrl}/get-by-id`;
    } else if (role === 'SARPANCH') {
      url = `${this.apiUrl}/get-sarpanch-grievances`;
    } else {
      console.warn('Unauthorized role for fetching grievances:', role);
      return throwError(() => new Error('Unauthorized role'));
    }
    return this.http.get<PageResponse<GrievanceResponse>>(url, { params });
  }

  getResidentByMobile(mobile: string): Observable<any> {
    return this.http
      .get(`${this.Url}/get-by-mobile`, {
        params: { mobile },
      })
      .pipe(
        catchError((error) => {
          return this.errorService.handleError(error);
        })
      );
  }

  searchGrievance(request: any): Observable<any> {
    let params = new HttpParams()
      .set('search', request.search)
      .set('pageNumber', request.pageNumber.toString())
      .set('pageSize', request.pageSize.toString())
      .set('sortBy', request.sortBy);
    return this.http.post(`${this.apiUrl}/grievance-search-request`, null, {
      params,
    });
  }

  updateIsDeletedStatus(id: string, isDeleted: boolean): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/change-isdeleted-status/${id}`,
      null,
      {
        params: {
          isDeleted: isDeleted.toString(),
        },
      }
    );
  }

  updateAadharStatus(id: string, status: string): Observable<any> {
    const body = {
      residentId: id,
      aadharStatus: status,
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

  private formatDate(date: Date | string): string {
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0]; // formats to 'YYYY-MM-DD'
  }

  filterGrievance(filters: GrievanceFilter): Observable<any> {
    const payload = {
      pageRequest: {
        pageNumber: filters.pageNumber,
        pageSize: filters.pageSize,
        sortBy: filters.sortBy || 'createdAt',
      },
      status: filters.status,
      isActive: filters.isActive,
      date: {
        from: filters.date?.from ? this.formatDate(filters.date.from) : null,
        to: filters.date?.to ? this.formatDate(filters.date.to) : null,
      },
    };
    console.log('filterGrievance calling');
    return this.http.post(`${this.apiUrl}/grievance-filter-request`, payload);
  }

  getResidentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getById`, {
      params: { id },
    });
  }

  updateGrievance(grievance: {
    id: string;
    status: string;
    response: string;
  }): Observable<any> {
    const url = `${this.apiUrl}/response-of-grievance/${grievance.id}`;
    return this.http.put(url, grievance); // PUT request with body
  }

  deleteGrievance(announcementId: string): Observable<any> {
    const url = `${this.apiUrl}/delete-announcement`; // Keep URL as is, without the announcementId
    const payload = { id: announcementId }; // Send the announcementId in the body
    return this.http.delete<any>(url, { body: payload });
  }
}
