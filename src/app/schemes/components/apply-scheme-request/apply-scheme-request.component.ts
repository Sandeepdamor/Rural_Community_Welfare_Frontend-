import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../shared/components/model/table-config';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { Role } from '../../../enums/role.enum';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { ApplySchemeService } from '../../../shared/services/apply-scheme.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CategoryService } from '../../../shared/services/category.service';
import { ResidentService } from '../../../shared/services/resident.service';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { SchemeService } from '../../../shared/services/scheme.service';
import { ToastService } from '../../../shared/services/toast.service';
import { TokenService } from '../../../shared/services/token.service';
import { UserService } from '../../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { SchemeFilter } from '../../../shared/interfaces/scheme/scheme-filter';
import { SearchRequest } from '../../../shared/interfaces/sarpanch/search-request';
import { CategoryResponse } from '../../../shared/interfaces/category/category-response';
import { AddressService } from '../../../shared/services/address.service';

@Component({
  selector: 'app-apply-scheme-request',
  imports: [DynamicTableComponent, CommonModule, FormsModule],
  templateUrl: './apply-scheme-request.component.html',
  styleUrl: './apply-scheme-request.component.scss'
})
export class ApplySchemeRequestComponent implements OnInit, AfterViewInit {

  isLoading: boolean = false;
  searchTerm: string = '';
  showFilters: boolean = false;
  categoryList: CategoryResponse[] = [];
  gramPanchayatList: string[] = [];

  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt'
  };

  filters: SchemeFilter = {
    category: '',
    status: 'PENDING',
    gramPanchayatName: '',
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt'
  };

  search: SearchRequest = {
    keyword: '',
    status: this.filters.status,
    pageNumber: 1,
    pageSize: 10,
    sortBy: ''
  };


  Role = Role;
  role: Role;
  constructor(
    private changeDetection: ChangeDetectorRef,
    private toastService: ToastService,
    private applySchemeService: ApplySchemeService,
    private categoryService: CategoryService,
    private tokenService: TokenService,
    private addressService: AddressService
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.role = roleString as Role; // ✅ safely assign enum
  }

  agencyTableConfig: TableConfig = {
    columns: [
      {
        name: 'schemeDetails',
        displayName: 'Scheme Details',
        type: 'customText',
        customTextFn: (row) => {
          const u = row.schemeDetails;
          return u ? `<strong>Name:</strong> ${u.schemeName},\n<strong>Category:</strong> ${u.category}, \n<strong>Criteria:</strong> ${u.criteria}` : 'N/A';
        }
      },
      {
        name: 'residentDetails',
        displayName: 'Resident Details',
        type: 'customText',
        customTextFn: (row) => {
          const u = row.residentDetails;
          return u ? `<strong>Name:</strong> ${u.residentName},\n<strong>Mobile:</strong> ${u.mobile}, \n<strong>Aadhar Number:</strong> ${u.aadharNumber}, \n<strong>Age:</strong> ${u.age}, \n<strong>Gender:</strong> ${u.gender},  \n<strong>Address:</strong> ${u.address} , \n<strong>Gram Panchayat:</strong> ${u.gramPanchayatName}` : 'N/A';
        }
      },
      { name: 'status', displayName: 'Scheme Status', type: 'applySchemeStatus' },
      { name: 'reason', displayName: 'Rejected Reason', type: 'text' },
      // { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [],
    actions: []
  };


  ngOnInit(): void {

    if (this.role === 'RESIDENT') {
      this.filters.status = '';  // Set to "All Status" for Resident
    }
    if (this.role === 'ADMIN') {
      this.filters.status = 'APPROVED';  // Set to "All Status" for Resident
    }
    this.loadSchemes(this.currentPaginationRequest);
    this.loadCategories();
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

  loadCategories(): void {
    this.categoryService.getAllActiveCategory(null).subscribe({
      next: (res: any) => {
        console.log('CATEGORY 1234  ====>> ', res);
        this.categoryList = res
      },
      error: (err) => console.error(err)
    });
  }

  toggleFilter() {
    this.showFilters = !this.showFilters; // Toggle the visibility of the dropdown
  }
  closeFilterIfClickedOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.showFilters = false;
    }
  }

  loadSchemes(paginationRequest: PaginationRequest) {
    this.isLoading = true;
    // const status = this.role === 'ADMIN' ? "APPROVED" : this.filters.status || null;

    this.applySchemeService.getAllApplySchemes(this.filters.status || null, paginationRequest).subscribe({
      next: (response) => {
        console.log('RESPNSE GET ALL APPLY SCHEMES ===> ', response.content);
        const updatedData = response.content.map((item) => {

          return {
            ...item,
            schemeDetails: {
              schemeName: item.scheme?.name || 'N/A',
              category: item.scheme?.category || 'N/A',
              criteria: item.scheme?.criteria || 'N/A',
              createdBy: item.scheme?.createdBy || 'N/A',
            },
            residentDetails: {
              residentName: item.resident?.name || 'N/A',
              mobile: item.resident?.mobile || 'N/A',
              aadharNumber: item.resident?.aadharNumber || 'N/A',
              address: item.resident?.address || 'N/A',
              gender: item.resident.gender || 'N/A',
              age: item.resident?.age || 'N/A',
              gramPanchayatName: item.resident?.gramPanchayatName || 'N/A',
            },
            reason: item.reason ? item.reason : '--'
          };
        });

        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: updatedData,
          totalRecords: response.totalElements
        };

        this.changeDetection.detectChanges();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching Schemes:', err.error);
        this.isLoading = false;
      }
    });
  }

  changeApprovalStatus(event: {
    id: string;
    approvalStatus: string;
    reason: string;
  }) {
    console.log(
      'IN PENDING REJECT COMPONENT.TS ',
      event.id,
      event.approvalStatus,
      event.reason
    );
    this.applySchemeService.updateApprovalStatus(event.id, event.approvalStatus, event.reason).subscribe({
      next: (response) => {
        this.toastService.showSuccess(response.message);
        this.loadSchemes(this.currentPaginationRequest);
      },
      error: (err) => {
        this.toastService.showError(
          err.error.message || 'Something went wrong'
        );
        this.isLoading = false;
      },
    });
  }




  onFilter(): void {
    this.isLoading = true;
    const filterRequest = {
      category: this.filters.category,
      status: this.filters.status,
      gramPanchayatName: this.filters.gramPanchayatName,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy
    };

    this.applySchemeService.filterApplyScheme(filterRequest).subscribe({
      next: (response) => {
        console.log('RESPNSE GET ALL APPLY SCHEMES FILTER RESPONSE ===> ', response.content);
        const updatedData = response.content.map((item) => {

          return {
            ...item,
            schemeDetails: {
              schemeName: item.scheme?.name || 'N/A',
              category: item.scheme?.category || 'N/A',
              criteria: item.scheme?.criteria || 'N/A',
              createdBy: item.scheme?.createdBy || 'N/A',
            },
            residentDetails: {
              residentName: item.resident?.name || 'N/A',
              mobile: item.resident?.mobile || 'N/A',
              aadharNumber: item.resident?.aadharNumber || 'N/A',
              address: item.resident?.address || 'N/A',
              gender: item.resident.gender || 'N/A',
              age: item.resident?.age || 'N/A',
              gramPanchayatName: item.resident?.gramPanchayatName || 'N/A',
            },
            reason: item.reason ? item.reason : '--'
          };
        });

        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: updatedData,
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

  onSearch() {
    this.isLoading = true;
    const searchRequest = {
      keyword: this.searchTerm,
      status: this.filters.status,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy,

    };
    this.applySchemeService.searchApplyScheme(searchRequest)
      .subscribe({
        next: (response) => {
          console.log('RESPNSE GET ALL APPLY SCHEMES ===> ', response.content);
          const updatedData = response.content.map((item) => {

            return {
              ...item,
              schemeDetails: {
                schemeName: item.scheme?.name || 'N/A',
                category: item.scheme?.category || 'N/A',
                criteria: item.scheme?.criteria || 'N/A',
                createdBy: item.scheme?.createdBy || 'N/A',
              },
              residentDetails: {
                residentName: item.resident?.name || 'N/A',
                mobile: item.resident?.mobile || 'N/A',
                aadharNumber: item.resident?.aadharNumber || 'N/A',
                address: item.resident?.address || 'N/A',
                gender: item.resident.gender || 'N/A',
                age: item.resident?.age || 'N/A',
                gramPanchayatName: item.resident?.gramPanchayatName || 'N/A',
              },
              reason: item.reason ? item.reason : '--'
            };
          });

          this.agencyTableConfig = {
            ...this.agencyTableConfig,
            data: updatedData,
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
