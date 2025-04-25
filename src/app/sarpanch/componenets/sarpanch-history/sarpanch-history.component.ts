import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DeletedSarpanchService } from '../../../shared/services/deleted-sarpanch.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TableConfig } from '../../../shared/components/model/table-config';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';

@Component({
  selector: 'app-sarpanch-history',
  imports: [DynamicTableComponent, CommonModule, FormsModule],
  templateUrl: './sarpanch-history.component.html',
  styleUrl: './sarpanch-history.component.scss'
})
export class SarpanchHistoryComponent implements OnInit, AfterViewInit {
  constructor(
    private changeDetection: ChangeDetectorRef,
    private deletedSarpanchService: DeletedSarpanchService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'deletedAt'
  };
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadDeletedSarpanch(this.currentPaginationRequest);
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
      { name: 'phone', displayName: 'Phone Number', type: 'text' },
      { name: 'aadharNumber', displayName: 'Aadhar Number', type: 'text' },
      // { name: 'address', displayName: 'Personal Address', type: 'text' },
      { name: 'gramPanchayatName', displayName: 'GramPanchayat Name', type: 'text' },
      { name: 'electionYear', displayName: 'Election Year', type: 'text' },
      // { name: 'termEndDate', displayName: 'Term Start', type: 'text' },
      // { name: 'termStartDate', displayName: 'Term End', type: 'text' },
      // { name: 'isActive', displayName: 'Status', type: 'status' },
      { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [],
    actions: ['view profile']
  };

  closeFilterIfClickedOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      // this.showFilters = false;
    }
  }

  loadDeletedSarpanch(paginationRequest: PaginationRequest) {
    this.isLoading = true;
    this.deletedSarpanchService.getAllDeletedSarpanch(false, paginationRequest).subscribe({
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
        // alert(err.error.message);
        this.isLoading = false;
      }
    });
  }

  onAction(action: string, element: any): void {
    this.router.navigate(['sarpanch/profile/deleted', element.id]);
  }
}
