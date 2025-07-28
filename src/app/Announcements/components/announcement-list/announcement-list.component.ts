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

  constructor(
    private changeDetection: ChangeDetectorRef,
    private announcementService: AnnouncementService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

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
    sortBy: 'createdAt', // or 'createdAt', depending on your backend's field
  };

  loadAllAnnouncements(paginationRequest: PaginationRequest) {
    this.isLoading = true;
    this.announcementService
      .getAllAnnouncement('PUBLISHED', true, paginationRequest)
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          console.log('Content length:', response.content.length);
          console.log('Total elements:', response.totalElements);

          this.agencyTableConfig = {
            ...this.agencyTableConfig,
            data: response.content,
            totalRecords: response.totalElements,
          };
          this.changeDetection.detectChanges();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching residents:', err.error);
          // alert(err.error.message);
          this.isLoading = false;
        },
      });
  }

  agencyTableConfig: TableConfig = {
    columns: [
      // { name: 'id', displayName: 'ID', type: 'text' },
      { name: 'title', displayName: 'Title', type: 'text' },
      { name: 'content', displayName: 'Content', type: 'text' },
      { name: 'date', displayName: 'Date', type: 'text' },
      { name: 'status', displayName: 'Status', type: 'announcementStatus' },
      { name: 'authorName', displayName: 'Author Name', type: 'text' },
      // { name: 'isDeleted', displayName: 'Deleted', type: 'boolean' },
      { name: 'isActive', displayName: 'Active', type: 'status' },
      //  { name: 'createdAt', displayName: 'Created At', type: 'datetime' },
      // { name: 'updatedAt', displayName: 'Updated At', type: 'datetime' },
      //  { name: 'attachments', displayName: 'Attachments', type: 'list' },
      { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [],
    actions: ['edit', 'delete', 'view profile'],
  };

  ngOnInit(): void {
    console.log('LOAD ANNOUNCEMENT');

    this.loadAllAnnouncements(this.currentPaginationRequest);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
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
        console.log('Search RESULT => ', response);
        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: response.content,
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

  onSearch() {}

  onChangeAnnouncementStatus(event: {
    id: number;
    AnnouncementStatus: string;
  }) {
    console.log(
      'Changing status for:',
      event.id,
      'to',
      event.AnnouncementStatus
    );
    const payload = {
      id: event.id.toString(), // ✅ Correct
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
      console.log('Navigating to profile of announcement with ID:', element.id);
      this.router.navigate(['announcements/add', element.id], {
        queryParams: { mode: 'view-announcements' },
      });
    }
  }

  onDeleteAnnouncement(element: any) {
    console.log('Attempting to delete announcement with ID:', element.id);

    this.announcementService
      .deleteAnnouncement(element.id.toString())
      .subscribe({
        next: (response: any) => {
          console.log('Announcement deleted successfully:', response);
          this.snackBar.open('Announcement deleted successfully!', 'Close', {
            duration: 3000, // The snack bar will stay open for 3 seconds
            horizontalPosition: 'center', // Center the snack bar horizontally
            verticalPosition: 'top', // Show the snack bar at the top of the screen
            panelClass: ['snack-success'], // Customize the style of the snack bar if needed
          });
        },
        error: (error) => {
          console.error('Failed to delete announcement', error);
          this.snackBar.open('Failed to delete announcement!', 'Close', {
            duration: 3000, // The snack bar will stay open for 3 seconds
            horizontalPosition: 'center', // Center the snack bar horizontally
            verticalPosition: 'top', // Show the snack bar at the top of the screen
            panelClass: ['snack-success'], // Customize the style of the snack bar if needed
          });
        },
      });
  }

  onUpdateAnnouncement(element: any) {
    console.log('Attempting to update announcement with ID:', element.id);

    // Prepare the data to be updated
    const updatedData = {
      title: element.title, // Example data, add fields you want to update
      description: element.description,
      status: element.status, // You can update multiple fields as per your requirement
    };

    // Call the service to update the announcement
    this.announcementService
      .updateAnnouncement(element.id.toString(), updatedData)
      .subscribe({
        next: (response: any) => {
          console.log('Announcement updated successfully:', response);
          // Show success message
          this.snackBar.open('Announcement updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-success'],
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to update announcement', error);
          // Show error message
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
    console.log('Search button clicked'); // Debug
    this.isLoading = true;

    const searchRequest: any = {
      search: this.searchTerm,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy,
    };
    console.log('SEARCH TERM => ', this.searchTerm);

    console.log('SEARCH REQUEST => ', searchRequest);
    console.log('SEARCH REQUEST FILTER => ', this.filters);

    this.announcementService.searchAnnouncements(searchRequest).subscribe({
      next: (response) => {
        console.log('Search RESULT => ', response);
        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: response.content,
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
