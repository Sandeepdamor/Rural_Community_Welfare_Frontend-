import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, Observable } from 'rxjs';
import { PageResponse } from '../interfaces/page-response';
import { DeletedSarpanchResponse } from '../interfaces/deleted-sarpanch/deleted-sarpanch';
import { PaginationRequest } from '../interfaces/pagination-request';
import { ErrorService } from './error.service';
import { SarpanchFilter } from '../interfaces/sarpanch/sarpanch-filter';
import { SearchRequest } from '../interfaces/sarpanch/search-request';

@Injectable({
  providedIn: 'root'
})
export class DeletedSarpanchService {

  private apiUrl = 'http://localhost:9096/deleted-sarpanch';

  constructor(private http: HttpClient, private tokenService: TokenService, private errorService: ErrorService) { }

  checkDeletedSarpanch(gramPanchayatName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-by-grampanchayat/${encodeURIComponent(gramPanchayatName)}`);
  }

  getAllDeletedSarpanch(isDeleted: boolean, pagination: PaginationRequest): Observable<PageResponse<DeletedSarpanchResponse>> {
    return this.http.get<PageResponse<DeletedSarpanchResponse>>(
      `${this.apiUrl}/get-all`,
      {
        params: {
          pageNumber: pagination.pageNumber.toString(),
          pageSize: pagination.pageSize.toString(),
          sortBy: pagination.sortBy
        }
      }
    );
  }

  getSarpanchById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-by-id`, {
      params: { id }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })

    );
  }

  filterDeletedSarpanch(filters: SarpanchFilter): Observable<any> {
    const params: any = {
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
      sortBy: filters.sortBy || 'deletedAt',
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
    return this.http.get(`${this.apiUrl}/filter-request`, { params });
  }


  //Search Sarpanch By Name, FatherHusbandName, Email, Aadhar Number, Address (VillageName,City,District,State) or Mobile Number
  searchDeletedSarpanch(search: SearchRequest): Observable<any> {
    const params: any = {
      keyword: search.keyword,
      pageNumber: search.pageNumber,
      pageSize: search.pageSize,
      sortBy: search.sortBy,
    };

    return this.http.get(`${this.apiUrl}/search-request`, { params });
  }
}
