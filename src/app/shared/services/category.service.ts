import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { PageResponse } from '../interfaces/page-response';
import { PaginationRequest } from '../interfaces/pagination-request';
import { CategoryResponse } from '../interfaces/category/category-response';
import { SearchRequest } from '../interfaces/sarpanch/search-request';
import { PaginationComponent } from '../components/pagination/pagination.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:9096/category';

  constructor(private http: HttpClient, private errorService: ErrorService) { }


  // Add Category method
  addCategory(name: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/add`, name).pipe(
      catchError((error) => {
        return this.errorService.handleError(error); // Use ErrorService to handle errors
      })

    );
  }

  getAllCategory(isActive: boolean | null, pagination: PaginationRequest): Observable<PageResponse<CategoryResponse>> {
    const params: any = {
      pageNumber: pagination.pageNumber.toString(),
      pageSize: pagination.pageSize.toString(),
      sortBy: pagination.sortBy
    };

    // Add isActive to params only if it's not null/undefined
    if (isActive !== null && isActive !== undefined) {
      params.isActive = isActive;
    }

    return this.http.get<PageResponse<CategoryResponse>>(`${this.apiUrl}/get-all`, { params }).pipe(
      catchError((error) => this.errorService.handleError(error))
    );
  }

  getAllActiveCategory(isActive: boolean | null): Observable<CategoryResponse[]> {
    const params: any = {};

    if (isActive !== null && isActive !== undefined) {
      params.isActive = isActive;
    }

    return this.http.get<CategoryResponse[]>(`${this.apiUrl}/get-categories`, { params }).pipe(
      catchError((error) => this.errorService.handleError(error))
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

  //Search Category By Name
  searchCategory(search: SearchRequest): Observable<any> {
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
