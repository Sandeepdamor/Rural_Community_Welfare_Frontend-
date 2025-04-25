import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, Observable } from 'rxjs';
import { PageResponse } from '../interfaces/page-response';
import { DeletedSarpanchResponse } from '../interfaces/deleted-sarpanch/deleted-sarpanch';
import { PaginationRequest } from '../interfaces/pagination-request';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class DeletedSarpanchService {

  private apiUrl = 'http://localhost:9096/deleted-sarpanch';
  
  constructor(private http: HttpClient, private tokenService: TokenService,private errorService: ErrorService) { }

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
}
