import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Role } from '../../../enums/role.enum';
import { GrievanceService } from '../../../shared/services/grievanceService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '../../../shared/services/token.service';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { GrievanceFilter } from '../../../shared/interfaces/Grievance/grievance-filter';
import { GrievanceSearch } from '../../../shared/interfaces/Grievance/grievance-search';
import { TableConfig } from '../../../shared/components/model/table-config';
import { LocalEventResponse } from '../../../shared/interfaces/Local-Events/GrievanceResponse';
import { PageResponse } from '../../../shared/interfaces/page-response';
import { LocalEventsService } from '../../../shared/services/local-events';
import { EventSearch } from '../../../shared/interfaces/Local-Events/search-events';
import { EventFilter } from '../../../shared/interfaces/Local-Events/Event-filter';

@Component({
  selector: 'app-local-events',
  imports: [DynamicTableComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './local-events.component.html',
  styleUrl: './local-events.component.scss',
})
export class LocalEventsComponent {
  searchTerm: string = '';
  showFilters: boolean = false;
  isLoading: boolean = false;
  role: Role;
  constructor(
    private changeDetection: ChangeDetectorRef,
    private localEventsService: LocalEventsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private tokenService: TokenService
  ) {
    const roleStr = tokenService.getRoleFromToken();
    this.role = roleStr as Role;
  }

  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt',
  };

  filters: EventFilter = {
    isActive: true,
    date: {
      from: null,
      to: null,
    },
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
  };

  searchValue: EventSearch = {
    search: '',
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt', // or 'createdAt', depending on your backend's field
  };

  agencyTableConfig: TableConfig = {
    columns: [
      //  { name: 'id', displayName: 'ID', type: 'text' },
      { name: 'name', displayName: 'Name', type: 'text' },
      { name: 'descriptions', displayName: 'Description', type: 'text' },
      { name: 'startDate', displayName: 'Start Date', type: 'text' },
      { name: 'endDate', displayName: 'End Date', type: 'text' },
      { name: 'authorName', displayName: 'Author Name', type: 'text' },
      //    { name: 'isDeleted', displayName: 'Deleted', type: 'text' },
      // { name: 'isActive', displayName: 'Active', type: 'status' },
      // { name: 'response', displayName: 'Response', type: 'text' },
      //  { name: 'updatedAt', displayName: 'Updated At', type: 'text' },
      //    { name: 'attachments', displayName: 'Attachments', type: 'text' },
      { name: 'action', displayName: 'Update', type: 'action' },
    ],
    data: [],
    actions: ['delete'],
  };

  ngOnInit(): void {
    console.log('LOAD ANNOUNCEMENT');
    this.loadGLocalEvent(this.currentPaginationRequest);
  }

  loadGLocalEvent(paginationRequest: PaginationRequest): void {
    this.isLoading = true;

    this.localEventsService.getAllEvents(true, paginationRequest).subscribe({
      next: (response: PageResponse<LocalEventResponse>) => {
        console.log('API Response:', response.content);
        console.log('Content length:', response.content.length);
        console.log('Total elements:', response.totalElements);

        response.content.map((item: LocalEventResponse) => item.name);

        const processedData = response.content.map((event) => ({
          ...event,
          authorName: event.createdBy?.name || 'N/A', // extract nested name safely
        }));

        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: processedData,
          totalRecords: response.totalElements,
        };
        this.changeDetection.detectChanges();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching grievance:', err.error);
        this.isLoading = false;
      },
    });
  }

  onSearchEvent() {
    console.log('Search button clicked'); // Debug
    this.isLoading = true;

    const searchRequest: any = {
      search: this.searchTerm,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy,
    };
    // console.log('SEARCH TERM => ', this.searchTerm);
    // console.log('SEARCH REQUEST => ', searchRequest);
    // console.log('SEARCH REQUEST FILTER => ', this.filters);

    this.localEventsService.searchEvent(searchRequest).subscribe({
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
  toggleFilter() {
    this.showFilters = !this.showFilters;
  }

  onActionClicked(event: { action: string; element: any }) {}

  closeFilterIfClickedOutside(event: MouseEvent) {}

  onFilter() {
    this.isLoading = true;
    const params: any = {
      isActive: this.filters.isActive,
      date: {
        from: this.filters.date?.from ? this.filters.date.from : null,
        to: this.filters.date?.to ? this.filters.date.to : null,
      },
      pageNumber: this.filters.pageNumber,
      pageSize: this.filters.pageSize,
      sortBy: this.filters.sortBy,
    };

    this.localEventsService.filterEvent(params).subscribe({
      next: (response) => {
        console.log('filter RESULT => ', response);
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
}
