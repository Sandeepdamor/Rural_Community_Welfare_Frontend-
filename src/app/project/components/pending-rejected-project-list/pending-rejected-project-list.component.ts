import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TableConfig } from '../../../shared/components/model/table-config';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { ProjectService } from '../../../shared/services/project.service';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, map, Observable, of } from 'rxjs';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { ProjectProgress } from '../../../enums/project-progress.enum';
import { ProjectFilter } from '../../../shared/interfaces/project/project-filter-request';
import { SearchRequest } from '../../../shared/interfaces/sarpanch/search-request';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';
import { UserService } from '../../../shared/services/user.service';
import { AddressService } from '../../../shared/services/address.service';
import { ProjectApprovalStatus } from '../../../enums/project-approval-status';

@Component({
  selector: 'app-pending-rejected-project-list',
  standalone: true,
  imports: [DynamicTableComponent, CommonModule, FormsModule],
  templateUrl: './pending-rejected-project-list.component.html',
  styleUrl: './pending-rejected-project-list.component.scss',
})
export class PendingRejectedProjectListComponent
  implements OnInit, AfterViewInit {
  Role = Role;
  role: Role;
  constructor(
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private toastService: ToastService,
    private projectService: ProjectService,
    private sarpanchService: SarpanchService,
    private tokenService: TokenService,
    private userService: UserService,
    private addressService: AddressService
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.role = roleString as Role; // ✅ safely assign enum
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
    approvalStatus: '',
    pageNumber: 1,
    pageSize: 5,
    sortBy: '',
  };

  projectApprovalOptions = ['PENDING', 'REJECTED'];
  filters: ProjectFilter = {
    gramPanchayat: '',
    progressStatus: null,
    approvalStatus: ProjectApprovalStatus.PENDING,
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
  };

  agencyTableConfig: TableConfig = {
    columns: [
      { name: 'projectName', displayName: 'Project Name', type: 'text' },
      { name: 'description', displayName: 'Project Description', type: 'text' },
      { name: 'budget', displayName: 'Budget', type: 'text' },
      { name: 'startDate', displayName: 'Project Start Date', type: 'text' },
      { name: 'endDate', displayName: 'Project End Date', type: 'text' },
      {
        name: 'createdByDetails',
        displayName: 'Project Request By',
        type: 'customText',
        customTextFn: (row) => {
          const u = row.createdByDetails;
          return u
            ? `<strong>Name:</strong> ${u.name},\n<strong>Father/Husband Name:</strong> ${u.fatherOrHusbandName}, \n<strong>Gram Panchayat:</strong> ${u.gramPanchayatName}, \n<strong>Role:</strong> ${u.role}`
            : 'N/A';
        },
      },
      {
        name: 'approvalStatus',
        displayName: 'Approval Status',
        type: 'projectstatus',
      },
      {
        name: 'approvalReason',
        displayName: 'FeedBack/Response',
        type: 'text',
      },
      // { name: 'isActive', displayName: 'Status', type: 'status' },
      { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [],
    actions: ['view profile'],
  };

  ngOnInit(): void {
    this.loadPendingRejectProjects(
      this.filters.approvalStatus,
      this.currentPaginationRequest
    );
    this.loadGramPanchayats();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
  }

  loadPendingRejectProjects(
    approvalStatus: ProjectApprovalStatus,
    paginationRequest: PaginationRequest
  ): void {
    this.isLoading = true;
    this.projectService.getAllProjects(approvalStatus, paginationRequest).subscribe({
      next: (response) => {
        const projects = response.content;
        console.log('PROJECT RESPONSE 111 ===> ', response.content);
        this.mapProjectsWithCreatedByDetails(projects).subscribe(
          (updatedProjects) => {
            // Update table config
            this.agencyTableConfig = {
              ...this.agencyTableConfig,
              data: updatedProjects,
              totalRecords: response.totalElements,
            };

            this.changeDetection.detectChanges();
            this.isLoading = false;
          }
        );
      },
      error: (err) => {
        console.error('Error fetching projects:', err.error);
        alert(
          err.error?.message ||
          'Something went wrong while fetching projects.'
        );
        this.isLoading = false;
      },
    });
  }

  private mapProjectsWithCreatedByDetails(projects: any[]): Observable<any[]> {
    if (!projects || projects.length === 0) {
      return of([]);
    }

    const userRequests = projects.map((project) =>
      this.userService.getUserById(project.createdBy).pipe(
        map((userResponse) => {
          const user = userResponse.response;
          let createdByDetails: any = { role: user?.role || 'N/A' };

          if (user?.role === 'SARPANCH') {
            createdByDetails = {
              name: user?.name || 'N/A',
              fatherOrHusbandName: user?.fatherOrHusbandName || 'N/A',
              gramPanchayatName: user?.gramPanchayatName || 'N/A',
              role: 'Sarpanch',
            };
          } else if (user?.role === 'ADMIN') {
            createdByDetails = {
              name: user?.name || 'N/A',
              role: 'Admin',
            };
          }

          return { ...project, createdByDetails };
        })
      )
    );
    return forkJoin(userRequests);
  }

  loadGramPanchayats() {
    this.addressService.getGramPanchayats().subscribe({
      next: (data) => (this.gramPanchayatList = data),
      error: (err) => {
        console.error('Error loading Gram Panchayats', err);
        // Show error message using ToastService
        this.toastService.showError(err.message || 'Something went wrong');
      }
    });
  }

  changeProjectApprovalStatus(event: {
    id: string;
    approvalStatus: string;
    reason: string;
  }) {
    console.log(
      'IN PENDING REJECT COMPONENT.TS ',
      event.id,
      event.approvalStatus,
      event.reason
    );
    this.projectService.updateProjectApprovalStatus(event.id, event.approvalStatus, event.reason).subscribe({
      next: (response) => {
        this.toastService.showSuccess(response.message);
        this.loadPendingRejectProjects(
          this.filters.approvalStatus,
          this.currentPaginationRequest
        );
      },
      error: (err) => {
        this.toastService.showError(
          err.error.message || 'Something went wrong'
        );
        this.isLoading = false;
      },
    });
  }

  onAction(action: string, element: any): void {
    console.log(`${action} clicked for`, element);

    switch (action) {
      // case 'edit':
      //     // Navigate to the edit user page
      //     this.router.navigate(['/user/edit', element.id]);
      //     break;

      case 'view profile': {
        // this.router.navigate([`project/${element.id}/view`]);
        this.router.navigate([`project/${element.id}/view`], {
          state: {
            gramPanchayatName: element.assignedSarpanches[0]?.gramPanchayatName
          }
        });

        break;
      }

      default:
        console.warn('Unknown action:', action);
    }
  }

  toggleFilter() {
    this.showFilters = !this.showFilters;
  }
  closeFilterIfClickedOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.showFilters = false;
    }
  }

  onFilter(): void {
    this.isLoading = true;
    const filterRequest = {
      gramPanchayat: this.filters.gramPanchayat,
      // progressStatus: this.filters.progressStatus,
      approvalStatus: this.filters.approvalStatus,
      minBudget: this.filters.minBudget,
      maxBudget: this.filters.maxBudget,
      startDate: this.filters.startDate,
      endDate: this.filters.endDate,
      minApprovedDate: this.filters.minApprovedDate,
      maxApprovedDate: this.filters.maxApprovedDate,
      createdBy: this.filters.createdBy,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy,
    };

    this.projectService.filterProject(filterRequest).subscribe({
      next: (response) => {
        const projects = response.content;
        console.log('FILTER RESULT ====> ', projects);
        this.mapProjectsWithCreatedByDetails(projects).subscribe(
          (updatedProjects: any[]) => {
            this.agencyTableConfig = {
              ...this.agencyTableConfig,
              data: updatedProjects,
              totalRecords: response.totalElements,
            };
            this.changeDetection.detectChanges();
            this.isLoading = false;
          }
        );
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isLoading = false;
      },
    });
  }

  onSearch() {
    this.isLoading = true;
    this.search.keyword = this.searchTerm;
    this.search.approvalStatus = this.filters.approvalStatus;
    this.search.pageNumber = this.currentPaginationRequest.pageNumber;
    this.search.pageSize = this.currentPaginationRequest.pageSize;
    this.search.sortBy = this.currentPaginationRequest.sortBy;

    this.projectService.searchProject(this.search).subscribe({
      next: (response) => {
        const projects = response.content;
        this.mapProjectsWithCreatedByDetails(projects).subscribe(
          (updatedProjects: any[]) => {
            this.agencyTableConfig = {
              ...this.agencyTableConfig,
              data: updatedProjects,
              totalRecords: response.totalElements,
            };
            this.changeDetection.detectChanges();
            this.isLoading = false;
          }
        );
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isLoading = false;
      },
    });
  }
}
