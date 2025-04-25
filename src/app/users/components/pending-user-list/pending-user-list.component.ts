import { ChangeDetectorRef, Component } from '@angular/core';
import { ResidentService } from '../../../shared/services/resident.service';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { TableConfig } from '../../../shared/components/model/table-config';
import { Router, RouterLink } from '@angular/router';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResidentFilter } from '../../../shared/interfaces/resident/resident-filter';
import { ResidentSearch } from '../../../shared/interfaces/resident/resident-search';
import { GenderPipe } from '../../../shared/pipes/gender.pipe';
import { ToastService } from '../../../shared/services/toast.service';


@Component({
    selector: 'app-pending-user-list',
    imports: [DynamicTableComponent, CommonModule, FormsModule],
    templateUrl: './pending-user-list.component.html',
    styleUrl: './pending-user-list.component.scss'
})
export class PendingUserListComponent {

    constructor(
        private changeDetection: ChangeDetectorRef,
        private residentService: ResidentService,
        private router: Router,
        private toastService: ToastService
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
        aadharStatus: 'PENDING',
        pageNumber: 1,
        pageSize: 5,
        sortBy: 'createdAt'
    };

    search: ResidentSearch = {
        keyword: '',
        aadharStatus: 'PENDING',
        isDeleted: false,
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
            { name: 'aadharVerificationStatus', displayName: 'Aadhar Verification', type: 'aadharstatus' },
            { name: 'action', displayName: 'Action', type: 'action' },

        ],
        data: [],
        actions: ['view profile']
    };

    ngOnInit(): void {
        this.loadPendingResidents("PENDING", this.currentPaginationRequest);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.changeDetection.detectChanges();
        }, 200);
    }


    //   handlePageChange(event: { pageIndex: number, pageSize: number }) {
    //       console.log('PAGE NUMBER => ', event.pageIndex + 1);
    //       console.log('PAGE Size => ', event.pageSize);
    //       const paginationRequest: PaginationRequest = {
    //           pageNumber: event.pageIndex + 1, // Convert to 1-based index for backend
    //           pageSize: event.pageSize,
    //           sortBy: 'createdAt'
    //       };

    //       this.loadPendingResidents("PENDING",paginationRequest);
    //   }



    loadPendingResidents(status: string, paginationRequest: PaginationRequest) {
        this.isLoading = true;
        this.residentService.getAllResidents(status, false, paginationRequest).subscribe({
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

    updateAadharStatus(event: { id: string, aadharVerificationStatus: string }) {
        this.residentService.updateAadharStatus(event.id, event.aadharVerificationStatus).subscribe({
            next: (response) => {
                // Show success message using ToastService
                this.toastService.showSuccess(response.message);
                this.loadPendingResidents("PENDING", this.currentPaginationRequest);
                // this.changeDetection.detectChanges();
                // this.isLoading = false;
            },
            error: (err) => {
                console.error('Status Updation Faild:', err.error.message);

                // Show error message using ToastService
                this.toastService.showError(err.error.message || 'Something went wrong');
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
                this.router.navigate(['/user/profile/resident', element.id]);
                break;

            default:
                console.warn('Unknown action:', action);
        }
    }
}
