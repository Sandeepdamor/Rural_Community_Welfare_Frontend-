import { announcementId } from './../interfaces/Announcement/announcement-id';
import { Injectable } from '@angular/core';
import { PageResponse } from '../interfaces/page-response';
import { AnnouncementResponse } from '../interfaces/Announcement/announcement-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TokenService } from './token.service';
import { PaginationRequest } from '../interfaces/pagination-request';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AnnouncementFilter } from '../interfaces/Announcement/announcement-filter';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private apiUrl = 'http://localhost:9096/announcement';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // getAllAnnouncement(
  //   status: string,
  //   isActive: boolean,
  //   pagination: PaginationRequest
  // ): Observable<PageResponse<AnnouncementResponse>> {
  //   const role = this.tokenService.getRoleFromToken();
  //   console.log('Role...........' + role);
  //   console.log('In Announcement Service Access Token ');

  //   return this.http.get<PageResponse<AnnouncementResponse>>(
  //     `${this.apiUrl}/get-all-announcement`,
  //     {
  //       params: {
  //         status: status,
  //         isActive: isActive.toString(),
  //         pageNumber: pagination.pageNumber.toString(),
  //         pageSize: pagination.pageSize.toString(),
  //         sortBy: pagination.sortBy,
  //       },
  //     }
  //   );
  // }

  getAllAnnouncement(
    status: string,
    isActive: boolean,
    pagination: PaginationRequest
  ): Observable<PageResponse<AnnouncementResponse>> {
    const role = this.tokenService.getRoleFromToken();
    console.log('Role..........' + role);

    let params = new HttpParams()
      .set('status', status)
      .set('isActive', isActive.toString())
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', pagination.sortBy);

    let url = '';
    if (role === 'ADMIN') {
      console.log('Admin: fetching all announcements');
      url = `${this.apiUrl}/get-all-announcement`;
    } else if (role === 'SARPANCH') {
      console.log('Sarpanch: fetching own announcements');
      url = `${this.apiUrl}/get-all-announcement`;
    } else if (role === 'RESIDENT') {
      console.log('RESIDENT: fetching own announcements');
      url = `${this.apiUrl}/get-all-announcement`;
    } else {
      console.warn('Unauthorized role for fetching announcements:', role);
    }

    return this.http.get<PageResponse<AnnouncementResponse>>(url, { params });
  }

  filterAnnouncements(filters: AnnouncementFilter): Observable<any> {
    const payload = {
      pageRequest: {
        pageNumber: filters.pageNumber,
        pageSize: filters.pageSize,
        sortBy: filters.sortBy || 'createdAt',
      },
      status: filters.status,
      isActive: filters.isActive,
    };
    return this.http.post(
      `${this.apiUrl}/announcement-filter-request`,
      payload
    );
  }

  addAnnouncement(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-announcement`, data);
  }

  updateannouncementStatus(payload: { id: string; status: string }) {
    const apiUrl = `${this.apiUrl}/change-announcement-status?announcementId=${payload.id}&status=${payload.status}`;
    return this.http.patch<any>(apiUrl, {}); // empty body
  }

  deleteAnnouncement(announcementId: string): Observable<any> {
    const url = `${this.apiUrl}/delete-announcement`; // Keep URL as is, without the announcementId
    const payload = { id: announcementId }; // Send the announcementId in the body
    return this.http.delete<any>(url, { body: payload });
  }

  updateAnnouncement(
    announcementId: string,
    updatedData: any
  ): Observable<any> {
    const url = `${this.apiUrl}/update-announcement/${announcementId}`;
    return this.http.put<any>(url, updatedData);
  }

  searchAnnouncements(request: any): Observable<any> {
    let params = new HttpParams()
      .set('search', request.search)
      .set('pageNumber', request.pageNumber.toString())
      .set('pageSize', request.pageSize.toString())
      .set('sortBy', request.sortBy);

    return this.http.post(`${this.apiUrl}/announcement-search-request`, null, {
      params,
    });
  }

  getDeletedAnnouncements(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-deleted-announcement`, {
      params: {
        pageNumber: 1,
        pageSize: 5,
        //sortBy: 'createdAt',
      },
    });
  }

  getDeletedAnnouncementById(id: string): Observable<announcementId> {
    return this.http
      .get<any>(`${this.apiUrl}/get-deleted-announcement/${id}`)
      .pipe(
        map((response) => response.response),
        tap((data) => {
          console.log('Deleted announcement data:', data);
        }),
        catchError((error) => {
          console.error('Error fetching deleted announcement:', error);
          return of();
        })
      );
  }

  getAnnouncementById(id: string): Observable<announcementId> {
    return this.http.get<any>(`${this.apiUrl}/get-announcement/${id}`).pipe(
      map((response) => response.response),
      tap((data) => {
        console.log('announcement data:', data);
      }),
      catchError((error) => {
        console.error('Error fetching deleted announcement:', error);
        return of();
      })
    );
  }
}
