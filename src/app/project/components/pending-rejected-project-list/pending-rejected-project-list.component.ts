import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../shared/components/model/table-config';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { ProjectService } from '../../../shared/services/project.service';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, map } from 'rxjs';
import { SarpanchService } from '../../../shared/services/sarpanch.service';

@Component({
  selector: 'app-pending-rejected-project-list',
  standalone: true,
  imports: [DynamicTableComponent, CommonModule, FormsModule],
  templateUrl: './pending-rejected-project-list.component.html',
  styleUrl: './pending-rejected-project-list.component.scss'
})
export class PendingRejectedProjectListComponent implements OnInit, AfterViewInit {

  constructor(
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private toastService: ToastService,
    private projectService: ProjectService,
    private sarpanchService: SarpanchService
  ) {}

  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt'
  };

  isLoading: boolean = false;

  agencyTableConfig: TableConfig = {
    columns: [
      { name: 'projectName', displayName: 'Project Name', type: 'text' },
      { name: 'description', displayName: 'Project Description', type: 'text' },
      { name: 'budget', displayName: 'Budget', type: 'text' },
      { name: 'startDate', displayName: 'Project Start Date', type: 'text' },
      { name: 'endDate', displayName: 'Project End Date', type: 'text' },
      {
        name: 'createdByDetails',
        displayName: 'Request By',
        type: 'customText',
        customTextFn: (row) => {
          const u = row.createdByDetails;
          return u ? `${u.name}, ${u.fatherOrHusbandName}, ${u.gramPanchayatName}` : 'N/A';
        }
      },
      { name: 'approvalStatus', displayName: 'Approval Status', type: 'aadharstatus' },
      { name: 'isActive', displayName: 'Status', type: 'status' },
      { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [],
    actions: ['edit', 'delete', 'view profile']
  };

  ngOnInit(): void {
    this.loadPendingRejectProjects('PENDING', this.currentPaginationRequest);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
  }

  loadPendingRejectProjects(approvalStatus: string, paginationRequest: PaginationRequest): void {
    this.isLoading = true;

    this.projectService.getAllProjects(approvalStatus, paginationRequest).subscribe({
      next: (response) => {
        const projects = response.content;

        const userRequests = projects.map(project =>
          this.sarpanchService.getSarpanchById(project.createdBy).pipe(
            map(userResponse => {
              const user = userResponse.response; // Assuming .response exists
              const limitedDetails = {
                name: user?.name || 'N/A',
                fatherOrHusbandName: user?.fatherOrHusbandName || 'N/A',
                gramPanchayatName: user?.gramPanchayatName || 'N/A'
              };
              return {
                ...project,
                createdByDetails: limitedDetails
              };
            })
          )
        );

        forkJoin(userRequests).subscribe(updatedProjects => {
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
        console.error('Error fetching projects:', err.error);
        alert(err.error?.message || 'Something went wrong while fetching projects.');
        this.isLoading = false;
      }
    });
  }

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

  toggleFilter() {
    // this.showFilters = !this.showFilters;
  }
  closeFilterIfClickedOutside(event: MouseEvent) {
    // const target = event.target as HTMLElement;
    // if (!target.closest('.dropdown')) {
    //   this.showFilters = false;
    // }
  }
}
