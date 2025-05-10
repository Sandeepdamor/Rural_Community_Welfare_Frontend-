import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { AddProject } from '../interfaces/project/add-project';
import { ApiResponse } from '../interfaces/api-response';
import { PaginationRequest } from '../interfaces/pagination-request';
import { PageResponse } from '../interfaces/page-response';
import { ProjectResponse } from '../interfaces/project/project-response';
import { SearchRequest } from '../interfaces/sarpanch/search-request';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { ResidentService } from './resident.service';
import { ProjectFilter } from '../interfaces/project/project-filter-request';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:9096/project';

  constructor(private http: HttpClient,
    private errorService: ErrorService,
    private userService: UserService,
    private tokenService: TokenService,
    private residentService: ResidentService
  ) { }



  // Add Sarpanch method
  addProject(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/create-project`, formData).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })

    );
  }


  getAllProjects(approvalStatus: string, paginationRequest: PaginationRequest): Observable<PageResponse<ProjectResponse>> {
    const mobile = this.tokenService.getMobileNumberFromAccessToken();

    if (!mobile) {
      return throwError(() => new Error("User mobile not found in token"));
    }

    return this.userService.getUserByMobile(mobile).pipe(
      switchMap((response) => {
        const role = response.response.role;

        if (role === "SARPANCH") {
          const sarpanchId = response.response.id;
          return of(sarpanchId);
        }

        if (role === "RESIDENT") {
          const residentId = response.response.id;

          return this.residentService.getResidentById(residentId).pipe(
            switchMap((residentResponse) => {
              console.log('RESIDENT RESPONSE => ', residentResponse);
              console.log('RESIDENT RESPONSE 2 => ', residentResponse.response);
              const sarpanchId = residentResponse.response?.sarpanch?.id || '';
              return of(sarpanchId);
            })
          );
        }

        // For Admin or others — no sarpanchId filter
        return of('');
      }),
      switchMap((sarpanchId) => {
        const params = new HttpParams()
          .set('sarpanchId', sarpanchId)
          .set('approvalStatus', approvalStatus)
          .set('pageNumber', paginationRequest.pageNumber.toString())
          .set('pageSize', paginationRequest.pageSize.toString())
          .set('sortBy', paginationRequest.sortBy);

        console.log('SARPANCH_ID IN PARAM IN GET ALL PROJECT () ==> ', sarpanchId);
        return this.http.get<PageResponse<ProjectResponse>>(`${this.apiUrl}/get-all-projects`, { params });
      })
    );
  }




  getProjectById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-project`, {
      params: { id }
    }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  updateProject(projectId: string, formData: FormData) {
    return this.http.put<ApiResponse>(`${this.apiUrl}/projects/${projectId}`, formData);
  }

  //Search Sarpanch By Name, Description
  searchProject(search: SearchRequest): Observable<any> {
    const params: any = {
      keyword: search.keyword,
      approvalStatus: search.approvalStatus,
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

  filterProject(filters: ProjectFilter): Observable<any> {

    const params: any = {
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
      sortBy: filters.sortBy || 'createdAt',
    };

    if (filters.gramPanchayat) params.gramPanchayat = filters.gramPanchayat;
    if (filters.progressStatus) params.progressStatus = filters.progressStatus;
    if (filters.approvalStatus) params.approvalStatus = filters.approvalStatus;
    if (filters.minBudget !== undefined && filters.minBudget !== null) {
      params.minBudget = filters.minBudget;
    }
    if (filters.maxBudget !== undefined && filters.maxBudget !== null) {
      params.maxBudget = filters.maxBudget;
    }
    if (filters.startDate !== undefined && filters.startDate !== null) {
      params.startDate = filters.startDate;
    }
    if (filters.endDate !== undefined && filters.endDate !== null) {
      params.endDate = filters.endDate;
    }
    if (filters.minApprovedDate !== undefined && filters.minApprovedDate !== null) {
      params.minApprovedDate = filters.minApprovedDate;
    }
    if (filters.maxApprovedDate !== undefined && filters.maxApprovedDate !== null) {
      params.maxApprovedDate = filters.maxApprovedDate;
    }
    if (filters.createdBy !== undefined && filters.createdBy !== null) {
      params.createdBy = filters.createdBy;
    }
    return this.http.get(`${this.apiUrl}/filter-request`, { params }).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })
    );
  }

  updateProjectApprovalStatus(id: string, approvalStatus: string, reason: string): Observable<any> {
    const body = {
      requestId: id,
      status: approvalStatus,
      response: reason
    };
    return this.http.patch(`${this.apiUrl}/update-approval-status`, body).pipe(
      catchError((error) => {
        return this.errorService.handleError(error);
      })
    );
  }

  updateProjectProgressStatus(id: string, progressStatus: string): Observable<any> {
    const body = {
      requestId: id,
      status: progressStatus
    };
    return this.http.patch(`${this.apiUrl}/update-progress-status`, body).pipe(
      catchError((error) => {
        return this.errorService.handleError(error);
      })
    );
}






  // updateIsActuveStatus(id: string, isActive: boolean): Observable<any> {
  //   return this.http.patch(`${this.apiUrl}/change-status/${id}`, null, {
  //     params: {
  //       isActive: isActive.toString()
  //     }
  //   }).pipe(
  //     catchError((error) => {
  //       return this.errorService.handleError(error); // Use ErrorService to handle errors
  //     })
  //   );
  // }
}
