import { TokenService } from './../../../shared/services/token.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { GrievanceFilter } from '../../../shared/interfaces/Grievance/grievance-filter';
import { GrievanceSearch } from '../../../shared/interfaces/Grievance/grievance-search';
import { TableConfig } from '../../../shared/components/model/table-config';
import { GrievanceService } from '../../../shared/services/grievanceService';

@Component({
  selector: 'app-resident-grievance-list',
  imports: [],
  templateUrl: './resident-grievance-list.component.html',
  styleUrl: './resident-grievance-list.component.scss',
})
export class ResidentGrievanceListComponent {
  searchTerm: string = '';
  showFilters: boolean = false;
  isLoading: boolean = false;
  //resident!: Resident; // Or use `any` if you don’t have a model yet
  residentDetails: string = '';

  constructor(
    private changeDetection: ChangeDetectorRef,
    private grievanceService: GrievanceService,
    private tokenservice: TokenService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

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
      { name: 'residentName', displayName: 'Author Name', type: 'text' },
      //    { name: 'isDeleted', displayName: 'Deleted', type: 'text' },
      //   { name: 'isActive', displayName: 'Active', type: 'status' },
      { name: 'response', displayName: 'Response', type: 'text' },
      //  { name: 'updatedAt', displayName: 'Updated At', type: 'text' },
      //    { name: 'attachments', displayName: 'Attachments', type: 'text' },
      { name: 'action', displayName: 'Update', type: 'action' },
    ],
    data: [],
    actions: ['edit'],
  };

  loadGrievance(paginationRequest: PaginationRequest) {
    this.isLoading = true;
    this.grievanceService
      .getAllGrievance('PENDING', true, paginationRequest)
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
          this.isLoading = false;
        },
      });
  }
}
