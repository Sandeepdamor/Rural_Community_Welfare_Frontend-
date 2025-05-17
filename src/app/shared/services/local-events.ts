import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ErrorService } from './error.service';
import { PaginationRequest } from '../interfaces/pagination-request';
import { Observable, throwError } from 'rxjs';
import { PageResponse } from '../interfaces/page-response';
import { LocalEventResponse } from '../interfaces/Local-Events/GrievanceResponse';
import { EventFilter } from '../interfaces/Local-Events/Event-filter';

@Injectable({
  providedIn: 'root',
})
export class LocalEventsService {
  private apiUrl = 'http://localhost:9096/local-events';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private errorService: ErrorService
  ) {}

  getAllEvents(
    isActive: boolean,
    pagination: PaginationRequest
  ): Observable<PageResponse<LocalEventResponse>> {
    const role = this.tokenService.getRoleFromToken();
    console.log('Role:', role);

    const params = new HttpParams()
      .set('isActive', isActive.toString())
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', pagination.sortBy);

    let url = '';

    if (role === 'ADMIN') {
      url = `${this.apiUrl}/local-events/get-all`;
    } else if (role === 'RESIDENT') {
      url = `${this.apiUrl}/get-all-events`;
    } else if (role === 'SARPANCH') {
      url = `${this.apiUrl}/get-all-events`;
    } else {
      return throwError(() => new Error('Unauthorized role'));
    }
    return this.http.get<PageResponse<LocalEventResponse>>(url, { params });
  }

  addlocalEvent(formData: FormData): Observable<any> {
    console.log('add method is callling');
    return this.http.post<any>(`${this.apiUrl}/add-event`, formData); // Use full URL
  }

  searchEvent(request: any): Observable<any> {
    let params = new HttpParams()
      .set('search', request.search)
      .set('pageNumber', request.pageNumber.toString())
      .set('pageSize', request.pageSize.toString())
      .set('sortBy', request.sortBy);
    return this.http.get(`${this.apiUrl}/event-search-request`, { params });
  }

  private formatDate(date: Date | string): string {
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0]; // formats to 'YYYY-MM-DD'
  }

  filterEvent(filters: EventFilter): Observable<any> {
    const payload = {
      paginationRequest: {
        // <-- FIXED KEY
        pageNumber: filters.pageNumber,
        pageSize: filters.pageSize,
        sortBy: filters.sortBy || 'createdAt',
      },
      isActive: filters.isActive,
      date: {
        from: filters.date?.from ? this.formatDate(filters.date.from) : null,
        to: filters.date?.to ? this.formatDate(filters.date.to) : null,
      },
    };

    console.log('filterEvent calling with', payload);
    return this.http.post(`${this.apiUrl}/event-filter-request`, payload);
  }
}
