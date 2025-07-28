import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationRequest } from '../interfaces/pagination-request';
import { PageResponse } from '../interfaces/page-response';
import { ResidentResponse } from '../interfaces/resident/resident-response';
import { TokenService } from './token.service';
import { ResidentSearch } from '../interfaces/resident/resident-search';
import { ResidentFilter } from '../interfaces/resident/resident-filter';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  private apiUrl = 'http://localhost:9096/resident';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllResidents(status: string, isDeleted: boolean, pagination: PaginationRequest): Observable<PageResponse<ResidentResponse>> {
    console.log('In Resident Service Access Token ', this.tokenService.getAccessToken());
    return this.http.post<PageResponse<ResidentResponse>>(
      `${this.apiUrl}/getAllResident`,
      pagination,
      {
        params: {
          status,
          isDeleted: isDeleted.toString()
        }
      }
    );
  }

  updateStatus(id: string, isActive: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/change-resident-status/${id}`, null, {
      params: {
        isActive: isActive.toString()
      }
    });
  }

  updateIsDeletedStatus(id: string, isDeleted: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/change-isdeleted-status/${id}`, null, {
      params: {
        isDeleted: isDeleted.toString()
      }
    });
  }

  updateAadharStatus(id: string, status: string): Observable<any> {
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

    return this.http.get(`${this.apiUrl}/resident-filter-request`, { params });
  }
  getResidentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getById`, {
      params: { id }
    });
  }

  getResidentByMobile(mobile: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-by-mobile`, {
      params: { mobile }
    });
  }

  deleteResident(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, {
      params: { id }
    });
  }


}
