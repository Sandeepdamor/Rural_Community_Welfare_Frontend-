import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GrievanceService } from '../../../shared/services/grievanceService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '../../../shared/services/token.service';
import { Role } from '../../../enums/role.enum';
import { GrievanceSearch } from '../../../shared/interfaces/Grievance/grievance-search';
import { TableConfig } from '../../../shared/components/model/table-config';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { GrievanceFilter } from '../../../shared/interfaces/Grievance/grievance-filter';

@Component({
  selector: 'app-grievance-delete',
  imports: [RouterLink, DynamicTableComponent, CommonModule, FormsModule],
  templateUrl: './grievance-delete.component.html',
  styleUrl: './grievance-delete.component.scss',
})
export class GrievanceDeleteComponent {
  searchTerm: string = '';
  showFilters: boolean = false;
  isLoading: boolean = false;
  role: Role;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private grievanceService: GrievanceService,
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

  filters: GrievanceFilter = {
    isActive: true,
    status: null,
    date: {
      from: null,
      to: null,
    },
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
  };

  searchValue: GrievanceSearch = {
    search: '',
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt', // or 'createdAt', depending on your backend's field
  };

  agencyTableConfig: TableConfig = {
    columns: [
      //  { name: 'id', displayName: 'ID', type: 'text' },
      { name: 'subject', displayName: 'Subject', type: 'text' },
      { name: 'description', displayName: 'Description', type: 'text' },
      { name: 'submittedDate', displayName: 'Submitted Date', type: 'text' },
      { name: 'status', displayName: 'Status', type: 'text' },
      { name: 'resident', displayName: 'Author Name', type: 'text' },
      //    { name: 'isDeleted', displayName: 'Deleted', type: 'text' },
      // { name: 'isActive', displayName: 'Active', type: 'status' },
      { name: 'response', displayName: 'Response', type: 'text' },
      //  { name: 'updatedAt', displayName: 'Updated At', type: 'text' },
      //    { name: 'attachments', displayName: 'Attachments', type: 'text' },
      { name: 'action', displayName: 'Update', type: 'action' },
    ],
    data: [],
    actions: ['edit'],
  };

  onSearchGrievance() {
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

    this.grievanceService.searchGrievance(searchRequest).subscribe({
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

  onFilter() {
    this.isLoading = true;
    const params: any = {
      isActive: this.filters.isActive,
      status: this.filters.status,
      date: {
        from: this.filters.date?.from ? this.filters.date.from : null,
        to: this.filters.date?.to ? this.filters.date.to : null,
      },
      pageNumber: this.filters.pageNumber,
      pageSize: this.filters.pageSize,
      sortBy: this.filters.sortBy,
    };

    this.grievanceService.filterGrievance(params).subscribe({
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

  onActionClicked(event: { action: string; element: any }) {}
  closeFilterIfClickedOutside(event: MouseEvent) {}

  toggleFilter() {
    this.showFilters = !this.showFilters;
  }
}
