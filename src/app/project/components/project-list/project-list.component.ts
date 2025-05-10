import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { TableConfig } from '../../../shared/components/model/table-config';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../shared/services/project.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { SearchRequest } from '../../../shared/interfaces/sarpanch/search-request';
import { AddressService } from '../../../shared/services/address.service';
import { SarpanchFilter } from '../../../shared/interfaces/sarpanch/sarpanch-filter';
import { ProjectFilter } from '../../../shared/interfaces/project/project-filter-request';
import { ProjectProgress } from '../../../enums/project-progress.enum';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';
@Component({
  selector: 'app-project-list',
  imports: [DynamicTableComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit, AfterViewInit {
  Role = Role;
  role: Role;
  constructor(
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService,
    private projectService: ProjectService,
    private addressService: AddressService,
    private tokenService: TokenService
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.role = roleString as Role; //  safely assign enum
  }
  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt',
  };
  isLoading: boolean = false;
  searchTerm: string = '';
  showFilters: boolean = false;
  gramPanchayatList: string[] = [];
  search: SearchRequest = {
    keyword: '',
    approvalStatus: 'APPROVED',
    pageNumber: 1,
    pageSize: 5,
    sortBy: '',
  };

  projectProgressOptions: ProjectProgress[] = Object.values(ProjectProgress);
  filters: ProjectFilter = {
    gramPanchayat: '',
    progressStatus: null,
    minBudget: null,
    maxBudget: null,
    startDate: null,
    endDate: null,
    minApprovedDate: null,
    maxApprovedDate: null,
    createdBy: null,
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt',
    approvalStatus: null as any, // Or a valid enum like ProjectApprovalStatus.APPROVED
    // ✅ Add this line
  };

  ngOnInit(): void {
    this.loadProjects('APPROVED', this.currentPaginationRequest); // Call API with approval status
    this.loadGramPanchayats();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
  }

  agencyTableConfig: TableConfig = {
    columns: [
      { name: 'projectName', displayName: 'Project Name', type: 'text' },
      { name: 'description', displayName: 'Project Description', type: 'text' },
      { name: 'budget', displayName: 'Budget', type: 'text' },
      { name: 'startDate', displayName: 'Project Start Date', type: 'text' },
      { name: 'endDate', displayName: 'Project End Date', type: 'text' },
      {
        name: 'approvedDate',
        displayName: 'Project Approved Date',
        type: 'text',
      },
      // { name: 'createdBy', displayName: 'Created By', type: 'text' },
      {
        name: 'progressStatus',
        displayName: 'Progress Status',
        type: 'projectProgress',
      },
      // { name: 'isActive', displayName: 'Status', type: 'status' },
      { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [],
    actions: ['view profile'],
  };

  toggleFilter() {
    this.showFilters = !this.showFilters;
  }
  closeFilterIfClickedOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.showFilters = false;
    }
  }

  loadProjects(
    approvalStatus: string,
    paginationRequest: PaginationRequest
  ): void {
    this.isLoading = true;
    this.projectService
      .getAllProjects(approvalStatus, paginationRequest)
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          console.log('Content length:', response.content.length);
          console.log('Total elements:', response.totalElements);

          this.agencyTableConfig = {
            ...this.agencyTableConfig,
            data: response.content, // Fill data with project content
            totalRecords: response.totalElements,
          };
          this.changeDetection.detectChanges();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching projects:', err.error);
          // alert(err.error.message);
          this.isLoading = false;
        },
      });
  }

  loadGramPanchayats() {
    this.addressService.getGramPanchayats().subscribe({
      next: (data) => (this.gramPanchayatList = data),
      error: (err) => {
        console.error('Error loading Gram Panchayats', err);
        // Show error message using ToastService
        this.toastService.showError(err.message || 'Something went wrong');
      },
    });
  }

  // updateIsActiveStatus(event: { id: string, isActive: boolean }) {
  //   this.projectService.updateIsActiveStatus(event.id, event.isActive).subscribe({
  //     next: (response) => {
  //       // Show success message using ToastService
  //       this.toastService.showSuccess(response.message);
  //       this.loadProjects( 'APPROVED',this.currentPaginationRequest);
  //     },
  //     error: (err) => {
  //       console.error('Status Updation Faild:', err.details);
  //       // Show error message using ToastService
  //       this.toastService.showError(err.details || 'Something went wrong');
  //       this.isLoading = false;
  //     }
  //   });
  // }

  onAction(action: string, element: any): void {
    console.log(`${action} clicked for`, element);

    switch (action) {
      // case 'edit':
      //     // Navigate to the edit user page
      //     this.router.navigate(['/user/edit', element.id]);
      //     break;

      case 'view profile':
        // this.router.navigate(['projects', element.id, 'view']);
        this.router.navigate([`project/${element.id}/view`]);

        break;

      default:
        console.warn('Unknown action:', action);
    }
  }

  onSearch() {
    console.log('11111111111111111111', this.searchTerm);
    this.isLoading = true;
    // const searchRequest = {
    //   keyword: this.searchTerm,
    //   approvalStatus: this.search.approvalStatus,
    //   pageNumber: this.currentPaginationRequest.pageNumber,
    //   pageSize: this.currentPaginationRequest.pageSize,
    //   sortBy: this.currentPaginationRequest.sortBy,

    // };

    this.search.keyword = this.searchTerm;
    this.search.pageNumber = this.currentPaginationRequest.pageNumber;
    this.search.pageNumber = this.currentPaginationRequest.pageSize;
    this.search.sortBy = this.currentPaginationRequest.sortBy;

    this.projectService.searchProject(this.search).subscribe({
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

  onFilter(): void {}
  updateProjectProgressStatus(event: any) {
    console.log('Received project progress status:', event);
  }
}
