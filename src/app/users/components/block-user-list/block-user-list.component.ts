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
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';
import { AddressService } from '../../../shared/services/address.service';
import { ToastService } from '../../../shared/services/toast.service';


@Component({
  selector: 'app-block-user-list',
  imports: [DynamicTableComponent, CommonModule, FormsModule],
  templateUrl: './block-user-list.component.html',
  styleUrl: './block-user-list.component.scss'
})
export class BlockUserListComponent {

  Role = Role;
  role: Role;
  gramPanchayatList: string[] = [];
  constructor(
    private changeDetection: ChangeDetectorRef,
    private residentService: ResidentService,
    private router: Router,
    private tokenService: TokenService,
    private addressService: AddressService,
    private toastService:ToastService
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.role = roleString as Role; // ✅ safely assign enum
  }
  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt'
  };
  searchTerm: string = '';
  showFilters: boolean = false;
  isLoading: boolean = false;

  filters: ResidentFilter = {
    gramPanchayat: '',
    gender: '',
    minAge: null,
    maxAge: null,
    isActive: null,
    aadharStatus: '',
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
    this.loadGramPanchayats();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
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
      gramPanchayat: this.filters.gramPanchayat,
      gender: this.filters.gender,
      minAge: this.filters.minAge,
      maxAge: this.filters.maxAge,
      isActive: this.filters.isActive,
      aadharStatus: this.filters.aadharStatus,
      pageNumber: this.filters.pageNumber,
      pageSize: this.filters.pageSize,
      sortBy: this.filters.sortBy
    };

    console.log('BLOCK USER FILTER REQUEST ===> ',params);
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
        this.router.navigate(['/user/profile/resident', element.id]);
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
