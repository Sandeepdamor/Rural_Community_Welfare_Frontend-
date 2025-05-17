import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TableConfig } from '../../../shared/components/model/table-config';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { ResidentService } from '../../../shared/services/resident.service';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResidentFilter } from '../../../shared/interfaces/resident/resident-filter';
import { ResidentSearch } from '../../../shared/interfaces/resident/resident-search';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast.service';
import { AddressService } from '../../../shared/services/address.service';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';
import { TableColumn } from '../../../shared/components/model/table-column';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [DynamicTableComponent, CommonModule, FormsModule],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit, AfterViewInit {
    Role = Role;
    role: Role;
    isResidentListView:boolean = false;
    constructor(
        private changeDetection: ChangeDetectorRef,
        private residentService: ResidentService,
        private router: Router,
        private dialog: MatDialog,
        private toastService: ToastService,
        private addressService: AddressService,
        private tokenService: TokenService
    ) {
        const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
        this.role = roleString as Role; // ✅ safely assign enum
    }
    currentPaginationRequest: PaginationRequest = {
        pageNumber: 1,
        pageSize: 10,
        sortBy: ''
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
        aadharStatus: 'VERIFIED',
        pageNumber: 1,
        pageSize: 10,
        sortBy: ''
    };
    search: ResidentSearch = {
        keyword: '',
        aadharStatus: 'VERIFIED',
        isDeleted: false,
        pageNumber: 1,
        pageSize: 10,
        sortBy: ''
    };
    gramPanchayatList: string[] = [];



    ngOnInit(): void {
        this.loadResidents(this.currentPaginationRequest);
        this.loadGramPanchayats();
        this.setTableColumnsByRole();
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
    // agencyTableConfig: TableConfig = {
    //     columns: [
    //         // { name: 'serialNumber', displayName: 'S. No.', type: 'serial' }, 
    //         { name: 'profileUrl', displayName: 'Profile Picture', type: 'image'},
    //         { name: 'name', displayName: 'Full Name', type: 'text' },
    //         { name: 'mobile', displayName: 'Phone Number', type: 'text' },
    //         { name: 'aadharNumber', displayName: 'Aadhar Number', type: 'text' },
    //         { name: 'address', displayName: 'Address', type: 'text' },
    //         { name: 'isActive', displayName: 'Status', type: 'status' },
    //         { name: 'action', displayName: 'Action', type: 'action' },
    //     ],
    //     data: [],
    //     actions: ['delete', 'view profile']
    // };

    private setTableColumnsByRole(): void {
        let commonColumns: TableColumn[] = [
          { name: 'profileUrl', displayName: 'Profile', type: 'image' },
          { name: 'name', displayName: 'User Name', type: 'text' },
          { name: 'address', displayName: 'Address', type: 'text' },
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
            { name: 'mobile', displayName: 'Phone Number', type: 'text' },
            { name: 'aadharNumber', displayName: 'Aadhar Number', type: 'text' },
            { name: 'isActive', displayName: 'Status', type: 'status' },
            { name: 'action', displayName: 'Action', type: 'action' },
          ];
          this.agencyTableConfig.actions = ['delete','view profile'];
        }
      }

    handlePageChange(event: { pageIndex: number, pageSize: number }) {
        console.log('PAGE NUMBER => ', event.pageIndex + 1);
        console.log('PAGE Size => ', event.pageSize);
        const paginationRequest: PaginationRequest = {
            pageNumber: event.pageIndex + 1, // Convert to 1-based index for backend
            pageSize: event.pageSize,
            sortBy: 'aadharNumber'
        };

        this.loadResidents(paginationRequest);
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

    loadResidents(paginationRequest: PaginationRequest) {
        this.isLoading = true;
        this.residentService.getAllResidents('VERIFIED', false, paginationRequest).subscribe({
            next: (response) => {
                console.log('API Response:', response);
                console.log('Content length:', response.content.length);
                console.log('Total elements:', response.totalElements);

                if(this.role === 'RESIDENT')
                    this.isResidentListView = true;
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

    updateUserStatus(event: { id: string, isActive: boolean }) {
        this.residentService.updateStatus(event.id, event.isActive).subscribe({
            next: (response) => {
                alert(response.message);
                this.loadResidents(this.currentPaginationRequest);
            },
            error: (err) => {
                console.error('Status Updation Faild:', err.error.message);
                alert(err.error.message);
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
            aadharStatus: this.search.aadharStatus,
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
        console.log('FILTER REQUEST ======>>> 111 ', this.filters);
        const filterRequest = {
            gramPanchayat: this.filters.gramPanchayat,
            gender: this.filters.gender,
            minAge: this.filters.minAge,
            maxAge: this.filters.maxAge,
            isActive: this.filters.isActive,
            pageNumber: this.currentPaginationRequest.pageNumber,
            pageSize: this.currentPaginationRequest.pageSize,
            sortBy: this.currentPaginationRequest.sortBy,
            aadharStatus: this.filters.aadharStatus
        };
        console.log('FILTER REQUEST >>>> 222', filterRequest);
        this.residentService.filterResidents(filterRequest).subscribe({
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
                this.router.navigate(['/user/profile/resident', element.id]);
                break;

            default:
                console.warn('Unknown action:', action);
        }
    }

    delete(userId: string): void {
        this.residentService.deleteResident(userId).subscribe({
            next: (response) => {
                // Show success message using ToastService
                this.toastService.showSuccess(response.message);
                // Refresh the table data after successful deletion
                this.loadResidents(this.currentPaginationRequest);
            },
            error: (error) => {
                console.error('Error deleting user:', error);
                // Show error message using ToastService
                this.toastService.showError(error.message || 'Something went wrong');
            }
        });
    }

}
