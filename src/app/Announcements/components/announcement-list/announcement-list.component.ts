import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { TableConfig } from '../../../shared/components/model/table-config';
import { AnnouncementService } from '../../../shared/services/announcement.service';
import { AnnouncementFilter } from '../../../shared/interfaces/Announcement/announcement-filter';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnnouncementSearch } from '../../../shared/interfaces/Announcement/announcement-search';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-announcement-list',
  imports: [RouterLink, DynamicTableComponent, CommonModule, FormsModule],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.scss',
})
export class AnnouncementListComponent implements OnInit, AfterViewInit {
  searchTerm: string = '';
  showFilters: boolean = false;
  isLoading: boolean = false;
  role: Role;

  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt',
  };

  filters: AnnouncementFilter = {
    isActive: true,
    status: null,
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
  };

  searchValue: AnnouncementSearch = {
    search: '',
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt',
  };

  agencyTableConfig: TableConfig = {
    columns: [],
    data: [],
    actions: [],
  };

  constructor(
    private changeDetection: ChangeDetectorRef,
    private announcementService: AnnouncementService,
    private snackBar: MatSnackBar,
    private router: Router,
    private tokenService: TokenService
  ) {
    const roleStr = tokenService.getRoleFromToken();
    this.role = roleStr as Role;
  }

  ngOnInit(): void {
    this.configureTableBasedOnRole();
    this.loadAllAnnouncements(this.currentPaginationRequest);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
  }

  configureTableBasedOnRole() {
    if (this.role === Role.RESIDENT) {
      this.agencyTableConfig.columns = [
        { name: 'title', displayName: 'Title', type: 'text' },
        { name: 'content', displayName: 'Content', type: 'text' },
        { name: 'date', displayName: 'Date', type: 'text' },
        { name: 'action', displayName: 'Action', type: 'action' },
      ];
      this.agencyTableConfig.actions = ['view profile'];
    } else {
      this.agencyTableConfig.columns = [
        { name: 'title', displayName: 'Title', type: 'text' },
        { name: 'content', displayName: 'Content', type: 'text' },
        { name: 'date', displayName: 'Date', type: 'text' },
        { name: 'status', displayName: 'Status', type: 'announcementStatus' },
        { name: 'authorName', displayName: 'Author Name', type: 'text' },
        { name: 'isActive', displayName: 'Active', type: 'status' },
        { name: 'action', displayName: 'Action', type: 'action' },
      ];
      this.agencyTableConfig.actions = ['edit', 'delete', 'view profile'];
    }
  }

  loadAllAnnouncements(paginationRequest: PaginationRequest) {
    this.isLoading = true;
    this.announcementService
      .getAllAnnouncement('PUBLISHED', true, paginationRequest)
      .subscribe({
        next: (response) => {
          this.agencyTableConfig = {
            ...this.agencyTableConfig,
            data: response.content.map((item: any) => ({
              ...item,
              authorName: item.authorName?.name || 'N/A',
            })),
            totalRecords: response.totalElements,
          };
          this.changeDetection.detectChanges();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching announcements:', err.error);
          this.isLoading = false;
        },
      });
  }

  closeFilterIfClickedOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.showFilters = false;
    }
  }

  toggleFilter() {
    this.showFilters = !this.showFilters;
  }

  onFilter() {
    this.isLoading = true;
    const params: any = {
      isActive: this.filters.isActive,
      status: this.filters.status,
      pageNumber: this.filters.pageNumber,
      pageSize: this.filters.pageSize,
      sortBy: this.filters.sortBy,
    };
    this.announcementService.filterAnnouncements(params).subscribe({
      next: (response) => {
        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: response.content.map((item: any) => ({
            ...item,
            authorName: item.authorName?.name || 'N/A',
          })),
          totalRecords: response.totalElements,
        };
        this.changeDetection.detectChanges();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Filter failed:', err);
        this.isLoading = false;
      },
    });
  }

  onChangeAnnouncementStatus(event: {
    id: number;
    AnnouncementStatus: string;
  }) {
    const payload = {
      id: event.id.toString(),
      status: event.AnnouncementStatus,
    };

    this.announcementService.updateannouncementStatus(payload).subscribe({
      next: (response) => {
        console.log('Status updated successfully:', response);
      },
      error: (err) => {
        console.error('Failed to update status', err);
      },
    });
  }

  onActionClicked(event: { action: string; element: any }) {
    const { action, element } = event;
    if (action === 'delete') {
      this.onDeleteAnnouncement(element);
    } else if (action === 'edit') {
      this.router.navigate(['announcements/add', element.id], {
        queryParams: { mode: 'update' },
      });
    } else if (action === 'view profile') {
      this.router.navigate(['announcements/add', element.id], {
        queryParams: { mode: 'view-announcements' },
      });
    }
  }

  onDeleteAnnouncement(element: any) {
    this.announcementService
      .deleteAnnouncement(element.id.toString())
      .subscribe({
        next: (response: any) => {
          this.snackBar.open('Announcement deleted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-success'],
          });
          this.loadAllAnnouncements(this.currentPaginationRequest);
        },
        error: (error) => {
          this.snackBar.open('Failed to delete announcement!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-error'],
          });
        },
      });
  }

  onUpdateAnnouncement(element: any) {
    const updatedData = {
      title: element.title,
      description: element.description,
      status: element.status,
    };

    this.announcementService
      .updateAnnouncement(element.id.toString(), updatedData)
      .subscribe({
        next: (response: any) => {
          this.snackBar.open('Announcement updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-success'],
          });
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open('Failed to update announcement', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-error'],
          });
        },
      });
  }

  onSearchAnnouncements() {
    this.isLoading = true;
    const searchRequest: any = {
      search: this.searchTerm,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy,
    };

    this.announcementService.searchAnnouncements(searchRequest).subscribe({
      next: (response) => {
        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: response.content.map((item: any) => ({
            ...item,
            authorName: item.authorName?.name || 'N/A',
          })),
          totalRecords: response.totalElements,
        };
        this.changeDetection.detectChanges();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isLoading = false;
      },
    });
  }
}