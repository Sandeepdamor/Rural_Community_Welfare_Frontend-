import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { filter, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { ProjectApprovalStatus } from '../../../enums/project-approval-status';
import { TableColumn } from '../../../shared/components/model/table-column';
@Component({
  selector: 'app-project-list',
  imports: [DynamicTableComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {

  Role = Role;
  role: Role;
  constructor(
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private toastService: ToastService,
    private projectService: ProjectService,
    private addressService: AddressService,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.role = roleString as Role; // ✅ safely assign enum
  }
  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt'
  };
  isLoading: boolean = false;
  searchTerm: string = '';
  showFilters: boolean = false;
  gramPanchayatList: string[] = [];
  search: SearchRequest = {
    keyword: '',
    approvalStatus: 'APPROVED',
    pageNumber: 1,
    pageSize: 10,
    sortBy: ''
  };

  projectProgressOptions: ProjectProgress[] = Object.values(ProjectProgress);
  filters: ProjectFilter = {
    gramPanchayat: '',
    progressStatus: null,
    approvalStatus: ProjectApprovalStatus.APPROVED,
    minBudget: null,
    maxBudget: null,
    startDate: null,
    endDate: null,
    minApprovedDate: null,
    maxApprovedDate: null,
    createdBy: null,
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt'
  };

  ngOnInit(): void {
    this.setTableColumnsByRole();
    this.loadProjects('APPROVED', this.currentPaginationRequest); // Call API with approval status
    this.loadGramPanchayats();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
  }

  agencyTableConfig: TableConfig = {
    columns: [],
    data: [],
    actions: []
  };

  private setTableColumnsByRole(): void {
    let commonColumns: TableColumn[] = [
      { name: 'projectName', displayName: 'Project Name', type: 'text' },
      { name: 'description', displayName: 'Project Description', type: 'text' },
      { name: 'budget', displayName: 'Budget', type: 'text' },
      { name: 'startDate', displayName: 'Project Start Date', type: 'text' },
      { name: 'endDate', displayName: 'Project End Date', type: 'text' },
      { name: 'progressStatus', displayName: 'Progress Status', type: 'projectProgress' },
    ];

    if (this.role === Role.RESIDENT) {
      this.agencyTableConfig.columns = [
        ...commonColumns,
        { name: 'action', displayName: 'Action', type: 'action' } // only view profile shown
      ];
      this.agencyTableConfig.actions = ['view profile'];
    } else if (this.role === Role.SARPANCH || this.role === Role.ADMIN) {
      this.agencyTableConfig.columns = [
        ...commonColumns,
        { name: 'approvedDate', displayName: 'Project Approved Date', type: 'text' },
        {
          name: 'approvalReason',
          displayName: 'FeedBack/Response',
          type: 'text'
        },
        {
          name: 'createdByDetails',
          displayName: 'Project Created By',
          type: 'customText',
          customTextFn: (row) => {
            const u = row.createdByDetails;
            if (!u) return 'N/A';
            if (u.role === 'Admin') {
              return `<strong>Name:</strong> ${u.name},\n<strong>Role:</strong> ${u.role}`;
            } else {
              return `<strong>Name:</strong> ${u.name},\n<strong>Father/Husband Name:</strong> ${u.fatherOrHusbandName},\n<strong>Gram Panchayat:</strong> ${u.gramPanchayatName},\n<strong>Role:</strong> ${u.role}`;
            }
          }
        },
        { name: 'action', displayName: 'Action', type: 'action' } // full actions
      ];
      this.agencyTableConfig.actions = ['view profile'];
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

  loadProjects(approvalStatus: string, paginationRequest: PaginationRequest): void {
    this.isLoading = true;

    // Clear table before reloading
    this.agencyTableConfig = {
      ...this.agencyTableConfig,
      data: [],
      totalRecords: 0
    };

    this.projectService.getAllProjects(approvalStatus, paginationRequest).subscribe({
      next: (response) => {
        const projects = response.content;
        this.mapProjectsWithCreatedByDetails(projects).subscribe((updatedProjects: any[]) => {
          console.log("Updated Projects => ", updatedProjects); // Check if duplicates are here
          this.agencyTableConfig = {
            ...this.agencyTableConfig,
            data: updatedProjects,
            totalRecords: response.totalElements
          };
          console.log('------------>>>', this.agencyTableConfig);
          this.changeDetection.detectChanges();
          this.isLoading = false;
        });
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.isLoading = false;
      }
    });
  }



  private mapProjectsWithCreatedByDetails(projects: any[]): Observable<any[]> {
    if (!projects || projects.length === 0) {
      return of([]); // Ensure observable is returned
    }

    const userRequests = projects.map(project =>
      this.userService.getUserById(project.createdBy).pipe(
        map(userResponse => {
          const user = userResponse.response;
          let createdByDetails: any = { role: user?.role || 'N/A' };

          if (user?.role === 'SARPANCH') {
            createdByDetails = {
              name: user?.name || 'N/A',
              fatherOrHusbandName: user?.fatherOrHusbandName || 'N/A',
              gramPanchayatName: user?.gramPanchayatName || 'N/A',
              role: 'Sarpanch'
            };
          } else if (user?.role === 'ADMIN') {
            createdByDetails = {
              name: user?.name || 'N/A',
              role: 'Admin'
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
      next: (data) => this.gramPanchayatList = data,
      error: (err) => {
        console.error('Error loading Gram Panchayats', err)
        // Show error message using ToastService
        this.toastService.showError(err.message || 'Something went wrong');

      }

    });
  }
  updateProjectProgressStatus(event: { id: string, progressStatus: string }) {
    this.projectService.updateProjectProgressStatus(event.id, event.progressStatus).subscribe({
      next: (response) => {
        // Show success message using ToastService
        this.toastService.showSuccess(response.message);
        this.loadProjects(this.filters.approvalStatus, this.currentPaginationRequest);
      },
      error: (err) => {
        console.error('Status Updation Faild:', err.details);
        // Show error message using ToastService
        this.toastService.showError(err.details || 'Something went wrong');
        this.isLoading = false;
      }
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
    this.isLoading = true;
    this.search.keyword = this.searchTerm;
    this.search.pageNumber = this.currentPaginationRequest.pageNumber;
    this.search.pageSize = this.currentPaginationRequest.pageSize;
    this.search.sortBy = this.currentPaginationRequest.sortBy;

    this.projectService.searchProject(this.search).subscribe({
      next: (response) => {
        const projects = response.content;
        this.mapProjectsWithCreatedByDetails(projects).subscribe((updatedProjects: any[]) => {
          this.agencyTableConfig = {
            ...this.agencyTableConfig,
            data: updatedProjects,
            totalRecords: response.totalElements
          };
          this.changeDetection.detectChanges();
          this.isLoading = false;
        });
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isLoading = false;
      }
    });
  }

  onFilter(): void {
    this.isLoading = true;
    const filterRequest = {
      gramPanchayat: this.filters.gramPanchayat,
      progressStatus: this.filters.progressStatus,
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
      sortBy: this.currentPaginationRequest.sortBy
    };

    this.projectService.filterProject(filterRequest).subscribe({
      next: (response) => {
        const projects = response.content;
        console.log('FILTER RESULT ====> ', projects);
        this.mapProjectsWithCreatedByDetails(projects).subscribe((updatedProjects: any[]) => {
          this.agencyTableConfig = {
            ...this.agencyTableConfig,
            data: updatedProjects,
            totalRecords: response.totalElements
          };
          this.changeDetection.detectChanges();
          this.isLoading = false;
        });
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isLoading = false;
      }
    });
  }

}
