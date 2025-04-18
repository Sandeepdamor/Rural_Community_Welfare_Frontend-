import { ChangeDetectorRef, Component } from '@angular/core';
import { ResidentService } from '../../../shared/services/resident.service';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { TableConfig } from '../../../shared/components/model/table-config';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResidentFilter } from '../../../shared/interfaces/resident/resident-filter';
import { ResidentSearch } from '../../../shared/interfaces/resident/resident-search';
import { Router } from '@angular/router';


@Component({
  selector: 'app-block-user-list',
  imports: [DynamicTableComponent, CommonModule, FormsModule],
  templateUrl: './block-user-list.component.html',
  styleUrl: './block-user-list.component.scss'
})
export class BlockUserListComponent {
  constructor(
    private changeDetection: ChangeDetectorRef,
    private residentService: ResidentService,
    private router: Router
  ) { }
  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt'
  };
  searchTerm: string = '';
  showFilters: boolean = false;
  isLoading: boolean = false;

  filters: ResidentFilter = {
    gender: '',
    minAge: null,
    maxAge: null,
    isActive: null,
    aadharStatus: 'VERIFIED',
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt'
  };

  search: ResidentSearch = {
    keyword: '',
    aadharStatus: 'VERIFIED',
    isDeleted: true,
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt'
  };

  agencyTableConfig: TableConfig = {
    columns: [
      // { name: 'serialNumber', displayName: 'S. No.', type: 'serial' }, 
      { name: 'name', displayName: 'Full Name', type: 'text' },
      { name: 'mobile', displayName: 'Phone Number', type: 'text' },
      { name: 'aadharNumber', displayName: 'Aadhar Number', type: 'text' },
      { name: 'address', displayName: 'Address', type: 'text' },
      // { name: 'isActive', displayName: 'IsActive Status', type: 'status' },
      // { name: 'isDeleted', displayName: 'IsDeleted Status', type: 'delete-status' },
      { name: 'action', displayName: 'Action', type: 'action' },

    ],
    data: [],
    actions: ['view profile']
  };

  ngOnInit(): void {
    this.loadDeletedResidents("VERIFIED", this.currentPaginationRequest);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
  }


  loadDeletedResidents(status: string, paginationRequest: PaginationRequest) {
    this.isLoading = true;
    this.residentService.getAllResidents(status, true, paginationRequest).subscribe({
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
        console.error('Error fetching residents:', err.error);
        // alert(err.error.message);
        this.isLoading = false;
      }
    });
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

  onSearch() {
    this.isLoading = true;
    const searchRequest = {
      keyword: this.searchTerm,
      aadharStatus: this.filters.aadharStatus,
      isDeleted: this.search.isDeleted,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy,

    };
    this.residentService.searchResidents(searchRequest)
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

  onFilter() {
    this.isLoading = true;
    const params: any = {
      gender: this.filters.gender,
      minAge: this.filters.minAge,
      maxAge: this.filters.maxAge,
      isActive: this.filters.isActive,
      aadharStatus: this.filters.aadharStatus,
      pageNumber: this.filters.pageNumber,
      pageSize: this.filters.pageSize,
      sortBy: this.filters.sortBy
    };
    this.residentService.filterResidents(params).subscribe({
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

  onAction(action: string, element: any): void {
    console.log(`${action} clicked for`, element);

    switch (action) {
        case 'view profile':
            this.router.navigate(['/user/profile', element.id]);
            break;

        default:
            console.warn('Unknown action:', action);
    }
}

  // updateUserStatus(event: { id: string, isActive: boolean }) {
  //   this.residentService.updateStatus(event.id, event.isActive).subscribe({
  //     next: (response) => {
  //       alert(response.message);
  //      this.ngOnInit();
  //     },
  //     error: (err) => {
  //       console.error('Status Updation Faild:', err.error.message);
  //       alert(err.error.message);
  //       this.isLoading = false;
  //     }
  //   });
  // }

  //   changeIsDeletedStatus(event: { id: string, isActive: boolean }) {
  //     console.log("DELETE RESIDENT API COLL")
  //     this.residentService.updateIsDeletedStatus(event.id, event.isActive).subscribe({
  //         next: (response) => {
  //             alert(response.message);
  //             this.ngOnInit();
  //         },
  //         error: (err) => {
  //             console.error('Status Updation Faild:', err.error.message);
  //             alert(err.error.message);
  //             this.isLoading = false;
  //         }
  //     });
  // }

}
