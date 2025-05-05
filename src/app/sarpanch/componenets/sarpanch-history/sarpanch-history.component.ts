import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DeletedSarpanchService } from '../../../shared/services/deleted-sarpanch.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TableConfig } from '../../../shared/components/model/table-config';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { SarpanchFilter } from '../../../shared/interfaces/sarpanch/sarpanch-filter';
import { ToastService } from '../../../shared/services/toast.service';
import { AddressService } from '../../../shared/services/address.service';
import { SearchRequest } from '../../../shared/interfaces/sarpanch/search-request';

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
    private dialog: MatDialog,
    private toastService: ToastService,
    private addressService: AddressService
  ) { }

  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'deletedAt'
  };
  isLoading: boolean = false;

  searchTerm: string = '';
  showFilters: boolean = false;
  gramPanchayatList: string[] = [];

  filters: SarpanchFilter = {
    gramPanchayat: '',
    gender: '',
    minAge: null,
    maxAge: null,
    minElectionYear: null,
    maxElectionYear: null,
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'deletedAt'
  };
  search: SearchRequest = {
    keyword: '',
    pageNumber: 1,
    pageSize: 5,
    sortBy: ''
  };


  ngOnInit(): void {
    this.loadDeletedSarpanch(this.currentPaginationRequest);
    this.loadGramPanchayats();
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

  toggleFilter() {
    this.showFilters = !this.showFilters;
  }
  closeFilterIfClickedOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.showFilters = false;
    }
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


  onFilter() {
    this.isLoading = true;
    const filterRequest = {
      gramPanchayat: this.filters.gramPanchayat,
      gender: this.filters.gender,
      minAge: this.filters.minAge,
      maxAge: this.filters.maxAge,
      minElectionYear: this.filters.minElectionYear,
      maxElectionYear: this.filters.maxElectionYear,
      isActive: this.filters.isActive,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy
    };
    this.deletedSarpanchService.filterDeletedSarpanch(filterRequest).subscribe({
      next: (response) => {
        console.log('Search RESULT => ', response);
        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: response.content,
          totalRecords: response.totalElements
        };
        this.changeDetection.detectChanges();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Filter failed:', err);
        this.isLoading = false;
      }
    });
  }


  onSearch() {
    this.isLoading = true;
    const searchRequest = {
      keyword: this.searchTerm,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy,

    };
    this.deletedSarpanchService.searchDeletedSarpanch(searchRequest)
      .subscribe({
        next: (response) => {
          console.log('Search RESULT => ', response);
          this.agencyTableConfig = {
            ...this.agencyTableConfig,
            data: response.content,
            totalRecords: response.totalElements
          };
          this.changeDetection.detectChanges();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Search failed:', err);
          this.isLoading = false;
        }
      });
  }


}
