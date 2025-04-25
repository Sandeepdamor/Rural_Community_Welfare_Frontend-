import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { Router, RouterLink } from '@angular/router';
import { TableConfig } from '../../../shared/components/model/table-config';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { ComponentRoutes } from '../../../shared/utils/component-routes';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-sarpanch-list',
  imports: [DynamicTableComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './sarpanch-list.component.html',
  styleUrl: './sarpanch-list.component.scss'
})
export class SarpanchListComponent implements OnInit, AfterViewInit {
  constructor(
    private changeDetection: ChangeDetectorRef,
    private sarpanchService: SarpanchService,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService
  ) { }
  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt'
  };
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadSarpanch(this.currentPaginationRequest);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
  }

  agencyTableConfig: TableConfig = {
    columns: [
      { name: 'name', displayName: 'Full Name', type: 'text' },
      { name: 'fatherOrHusbandName', displayName: 'Father/Husband Name', type: 'text' },
      { name: 'mobile', displayName: 'Phone Number', type: 'text' },
      { name: 'aadharNumber', displayName: 'Aadhar Number', type: 'text' },
      { name: 'address', displayName: 'Personal Address', type: 'text' },
      { name: 'gramPanchayatName', displayName: 'GramPanchayat Name', type: 'text' },
      { name: 'electionYear', displayName: 'Election Year', type: 'text' },
      { name: 'termEndDate', displayName: 'Term Start', type: 'text' },
      { name: 'termStartDate', displayName: 'Term End', type: 'text' },
      { name: 'isActive', displayName: 'Status', type: 'status' },
      { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [],
    actions: ['delete', 'view profile']
  };


  closeFilterIfClickedOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      // this.showFilters = false;
    }
  }

  loadSarpanch(paginationRequest: PaginationRequest) {
    this.isLoading = true;
    this.sarpanchService.getAllSarpanch(false, paginationRequest).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        console.log('Content length:', response.content.length);
        console.log('Total elements:', response.totalElements);

        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: response.content,
          totalRecords: response.totalElements
        };
        this.changeDetection.detectChanges();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching Sarpanches:', err.error);
        alert(err.error.message);
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

      case 'delete':
        // Confirm deletion and proceed if confirmed
        // Open the confirmation dialog
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Confirm Deletion',
            message: `Are you sure you want to delete this item?`
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.delete(element.id);
          }
        });
        break;

      case 'view profile':
        this.router.navigate(['sarpanch/profile/sarpanch', element.id]);
        break;

      default:
        console.warn('Unknown action:', action);
    }
  }

  delete(sarpanchId: string): void {
    this.sarpanchService.deleteSarpanch(sarpanchId).subscribe({
      next: (response) => {
        // Show success message using ToastService
        this.toastService.showSuccess(response.message);
        // Refresh the table data after successful deletion
        this.loadSarpanch(this.currentPaginationRequest);
      },
      error: (error) => {
        console.error('Error deleting Sarpanch:', error);
        // Show error message using ToastService
        this.toastService.showError(error.message || 'Something went wrong');
      }
    });
  }


}
