import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { Router, RouterLink } from '@angular/router';
import { TableConfig } from '../../../shared/components/model/table-config';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { ComponentRoutes } from '../../../shared/utils/component-routes';

@Component({
  selector: 'app-sarpanch-list',
  imports: [DynamicTableComponent, CommonModule, FormsModule,RouterLink],
  templateUrl: './sarpanch-list.component.html',
  styleUrl: './sarpanch-list.component.scss'
})
export class SarpanchListComponent implements OnInit, AfterViewInit {
  constructor(
    private changeDetection: ChangeDetectorRef,
    private sarpanchService: SarpanchService,
    private router: Router
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
        if (confirm('Are you sure you want to delete this Sarpanch?')) {
          this.delete(element.id);
        }
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
        alert(response.message); // Show backend response message
        // Refresh the table data after successful deletion
        this.loadSarpanch(this.currentPaginationRequest);
      },
      error: (error) => {
        console.error('Error deleting Sarpanch:', error);
        alert(error.message);
      }
    });
  }

  
}
