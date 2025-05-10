import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, Router } from '@angular/router';
import { Observable, of, map, forkJoin } from 'rxjs';
import { Role } from '../../../enums/role.enum';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { TableConfig } from '../../../shared/components/model/table-config';
import { CategoryResponse } from '../../../shared/interfaces/category/category-response';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { SearchRequest } from '../../../shared/interfaces/sarpanch/search-request';
import { SchemeFilter } from '../../../shared/interfaces/scheme/scheme-filter';
import { CategoryService } from '../../../shared/services/category.service';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { SchemeService } from '../../../shared/services/scheme.service';
import { ToastService } from '../../../shared/services/toast.service';
import { TokenService } from '../../../shared/services/token.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-delete-list',
  imports: [DynamicTableComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './delete-list.component.html',
  styleUrl: './delete-list.component.scss'
})
export class DeleteListComponent implements OnInit, AfterViewInit {
  Role = Role;
  role: Role;
  constructor(
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService,
    private schemeService: SchemeService,
    private userService: UserService,
    private sarpanchService: SarpanchService,
    private categoryService: CategoryService,
    private tokenService: TokenService
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.role = roleString as Role; // ✅ safely assign enum
  }
  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt'
  };
  isLoading: boolean = false;
  searchTerm: string = '';
  showFilters: boolean = false;
  search: SearchRequest = {
    keyword: '',
    isDeleted: false,
    pageNumber: 1,
    pageSize: 10,
    sortBy: ''
  };

  filters: SchemeFilter = {
    category: '',
    status: '',
    createdBy: null,
    isActive: null,
    isDeleted: false,
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt'
  };

  categoryList: CategoryResponse[] = [];

  ngOnInit(): void {
    this.loadSchemes(this.currentPaginationRequest);
    this.loadCategories();

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
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


  agencyTableConfig: TableConfig = {
    columns: [
      { name: 'name', displayName: 'Scheme Name', type: 'text' },
      { name: 'category', displayName: 'Scheme Category', type: 'text' },
      { name: 'criteria', displayName: 'Elibility Criteria', type: 'text' },
      { name: 'process', displayName: 'Apply Process', type: 'text' },
      {
        name: 'createdByDetails',
        displayName: 'Project Request By',
        type: 'customText',
        customTextFn: (row) => {
          const u = row.createdByDetails;
          if (u.role === 'Admin') {
            return u ? `<strong>Name:</strong> ${u.name},\n<strong>Role:</strong> ${u.role}` : 'N/A';
          }
          else {
            return u ? `<strong>Name:</strong> ${u.name},\n<strong>Father/Husband Name:</strong> ${u.fatherOrHusbandName}, \n<strong>Gram Panchayat:</strong> ${u.gramPanchayatName}, \n<strong>Role:</strong> ${u.role}` : 'N/A';
          }
        }
      },
      // { name: 'status', displayName: 'Scheme Status', type: 'schemeStatus' },
      // { name: 'isActive', displayName: 'Active Status', type: 'toggle' },
      { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [],
    actions: ['view profile']
  };



  loadSchemes(paginationRequest: PaginationRequest) {
    this.isLoading = true;

    this.schemeService.getDeletedSchemes(paginationRequest).subscribe({
      next: (response) => {
        const schemes = response.content;

        this.mapSchemesWithCreatedByDetails(schemes).subscribe(updatedSchemes => {
          this.agencyTableConfig = {
            ...this.agencyTableConfig,
            data: updatedSchemes,
            totalRecords: response.totalElements
          };

          this.changeDetection.detectChanges();
          this.isLoading = false;
        });
      },
      error: (err) => {
        console.error('Error fetching Schemes:', err.error);
        alert(err.error?.message || 'Something went wrong while fetching schemes.');
        this.isLoading = false;
      }
    });
  }


  private mapSchemesWithCreatedByDetails(schemes: any[]): Observable<any[]> {
    if (!schemes || schemes.length === 0) {
      return of([]);
    }

    const userRequests = schemes.map(scheme =>
      this.userService.getUserById(scheme.createdBy).pipe(
        map(userResponse => {
          const user = userResponse.response;
          let createdByDetails: any = { role: user?.role || 'N/A' };

          if (user?.role === 'SARPANCH') {
            createdByDetails = {
              name: user?.name || 'N/A',
              fatherOrHusbandName: user?.fatherOrHusbandName || 'N/A',
              gramPanchayatName: user?.gramPanchayatName || 'N/A',
              role: 'Sarpanch'
            };
          } else if (user?.role === 'ADMIN') {
            createdByDetails = {
              name: user?.name || 'N/A',
              role: 'Admin'
            };
          }

          return { ...scheme, createdByDetails };
        })
      )
    );

    return forkJoin(userRequests);
  }

  onAction(action: string, element: any): void {
    console.log('------------------------------------');
    console.log(`${action} clicked for`, element);

    switch (action) {
      case 'view profile':
        // this.router.navigate(['projects', element.id, 'view']);
        this.router.navigate([`schemes/view/${element.id}`]);

        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  onSearch() {
    this.isLoading = true;
    const searchRequest = {
      keyword: this.searchTerm,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy,
    };
    this.schemeService.searchDeletedScheme(searchRequest)
      .subscribe({
        next: (response) => {
          const scheme = response.content;
          this.mapSchemesWithCreatedByDetails(scheme).subscribe((updatedSchmes: any[]) => {
            this.agencyTableConfig = {
              ...this.agencyTableConfig,
              data: updatedSchmes,
              totalRecords: response.totalElements
            };
            this.changeDetection.detectChanges();
            this.isLoading = false;
          });
        },
        error: (err) => {
          console.error('Search failed:', err);
          this.isLoading = false;
        }
      });
  }

  onFilter(): void {
    this.isLoading = true;
    const filterRequest = {
      category: this.filters.category,
      status: this.filters.status,
      isActive: this.filters.isActive,
      createdBy: this.filters.createdBy,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy
    };

    this.schemeService.filterDeletedScheme(filterRequest).subscribe({
      next: (response) => {
        const schemes = response.content;
        console.log('FILTER RESULT ====> ', schemes);
        this.mapSchemesWithCreatedByDetails(schemes).subscribe((updatedSchemes: any[]) => {
          this.agencyTableConfig = {
            ...this.agencyTableConfig,
            data: updatedSchemes,
            totalRecords: response.totalElements
          };
          this.changeDetection.detectChanges();
          this.isLoading = false;
        });
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isLoading = false;
      }
    });
  }
}

