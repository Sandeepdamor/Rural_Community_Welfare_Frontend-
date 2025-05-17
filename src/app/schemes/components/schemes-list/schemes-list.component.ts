import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../shared/components/model/table-config';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast.service';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { SchemeService } from '../../../shared/services/scheme.service';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, map, Observable, of } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { SearchRequest } from '../../../shared/interfaces/sarpanch/search-request';
import { SchemeFilter } from '../../../shared/interfaces/scheme/scheme-filter';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryResponse } from '../../../shared/interfaces/category/category-response';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ApplySchemeService } from '../../../shared/services/apply-scheme.service';
import { ResidentService } from '../../../shared/services/resident.service';

@Component({
  selector: 'app-schemes-list',
  imports: [DynamicTableComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './schemes-list.component.html',
  styleUrl: './schemes-list.component.scss'
})
export class SchemesListComponent implements OnInit, AfterViewInit {
  Role = Role;
  role: Role;
  constructor(
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService,
    private schemeService: SchemeService,
    private applySchemeService: ApplySchemeService,
    private userService: UserService,
    private sarpanchService: SarpanchService,
    private categoryService: CategoryService,
    private tokenService: TokenService,
    private authService: AuthService,
    private residentService: ResidentService
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
    isActive: null,
    isDeleted: null,
    pageNumber: 1,
    pageSize: 10,
    sortBy: ''
  };

  filters: SchemeFilter = {
    category: '',
    status: '',
    createdBy: null,
    isActive: null,
    isDeleted: null,
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt'
  };
  isSchemeListView:boolean = false;

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
        displayName: 'Scheme Created By',
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
      { name: 'status', displayName: 'Scheme Status', type: 'schemeStatus' },
      { name: 'isActive', displayName: 'Active Status', type: 'toggle' },
      { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [],
    actions: []
  };



  loadSchemes(paginationRequest: PaginationRequest) {
    this.isLoading = true;

    this.schemeService.getAllSchemes(null, null, paginationRequest).subscribe({
      next: (response) => {
        const schemes = response.content;
        this.isSchemeListView = true;
        console.log('GET ALL SCHEMES 111111111 ===> ',response.content);
        this.mapSchemesWithCreatedByDetails(schemes).subscribe(updatedSchemes => {
          // Adjust the table columns and actions based on the logged-in user's role
          if (this.role === Role.RESIDENT) {
            // Hide unnecessary columns for Resident
            this.agencyTableConfig = {
              ...this.agencyTableConfig,
              data: updatedSchemes,
              totalRecords: response.totalElements,
              columns: this.agencyTableConfig.columns.filter(col =>
                col.name === 'name' ||
                col.name === 'category' ||
                col.name === 'criteria' ||
                col.name === 'process' ||
                col.name === 'action'
              ), // Only show relevant columns for Residents
              actions: ['view profile', 'apply'] // Only 'view' action for Resident
            };
            console.log('CONFIG TABLE IN RESIDENT ===> ', this.agencyTableConfig.actions);
          } else if (this.role === Role.SARPANCH) {
            // Sarpanch can see all columns and perform 'edit' and 'view' actions
            this.agencyTableConfig = {
              ...this.agencyTableConfig,
              data: updatedSchemes,
              totalRecords: response.totalElements,
              actions: ['edit', 'view profile'],
            };
          } else if (this.role === Role.ADMIN) {
            // Admin can see all columns and perform all actions
            this.agencyTableConfig = {
              ...this.agencyTableConfig,
              data: updatedSchemes,
              totalRecords: response.totalElements,
              actions: ['edit', 'view profile'],
            };
          }

          // const loggedInUser = this.authService.getLoggedInUser();

          // console.log('LOGGED IN USER IN LOAD SCHEMES METHOD ==> ',loggedInUser);
          // // Ensure loggedInUser exists and has an id property before accessing
          // if (loggedInUser && loggedInUser.id) {
          //   // Now it's safe to access loggedInUser.id
          //   this.agencyTableConfig.columns.forEach(col => {
          //     if (col.name === 'isActive') {
          //       updatedSchemes.forEach(scheme => {
          //         // Enable toggle only if the logged-in user is the creator
          //         scheme.canToggleIsActive = scheme.createdBy === loggedInUser.id;
          //       });
          //     }
          //   });
          // } else {
          //   console.error('Logged in user is invalid or missing expected properties');
          // }


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


  updateSchemeStatus(event: { id: string, status: string }) {
    this.schemeService.updateSchemeStatus(event.id, event.status).subscribe({
      next: (response) => {
        // Show success message using ToastService
        this.toastService.showSuccess(response.message);
        this.loadSchemes(this.currentPaginationRequest);
      },
      error: (err) => {
        console.error('Status Updation Faild:', err.details);
        // Show error message using ToastService
        this.toastService.showError(err.details || 'Something went wrong');
        this.isLoading = false;
      }
    });
  }

  updateIsActiveStatus(event: { id: string, isActive: boolean }) {
    this.schemeService.updateIsActiveStatus(event.id, event.isActive).subscribe({
      next: (response) => {
        // Show success message using ToastService
        this.toastService.showSuccess(response.message);
        this.loadSchemes(this.currentPaginationRequest);
      },
      error: (err) => {
        console.error('Status Updation Faild:', err.details);
        // Show error message using ToastService
        this.toastService.showError(err.details || 'Something went wrong');
        this.isLoading = false;
      }
    });
  }

  onAction(action: string, element: any): void {
    console.log(`${action} clicked for`, element);

    switch (action) {
      case 'edit':
        // Navigate to the edit Scheme page
        this.router.navigate([`schemes/edit/${element.id}`]);
        break;

      case 'view profile':
        // this.router.navigate(['projects', element.id, 'view']);
        this.router.navigate([`schemes/view/${element.id}`]);

        break;

      case 'apply':
        // this.router.navigate(['projects', element.id, 'view']);
        // this.router.navigate([`schemes/view/${element.id}`]);

        this.applyForScheme(element.id);

        break;

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

      default:
        console.warn('Unknown action:', action);
    }
  }

  delete(schemeId: string): void {
    this.schemeService.deleteScheme(schemeId).subscribe({
      next: (response) => {
        // Show success message using ToastService
        this.toastService.showSuccess(response.message);
        // Refresh the table data after successful deletion
        this.loadSchemes(this.currentPaginationRequest);
      },
      error: (error) => {
        console.error('Error deleting Sarpanch:', error);
        // Show error message using ToastService
        this.toastService.showError(error.message || 'Something went wrong');
      }
    });
  }

  applyForScheme(schemeId: string): void {
    const mobile = this.tokenService.getMobileNumberFromAccessToken();
    const loggedInRole = this.authService.getLoggedInUserRole();
    if (mobile) {
      if (loggedInRole === 'RESIDENT') {
        this.residentService.getResidentByMobile(mobile).subscribe({
          next: (res) => {
            console.log('RESIDENT FOR APPLY SCHEME ==>>', res.response);
            const resident = res.response;
            const data = {
              schemeId: schemeId,
              userId: resident.id
            }

            this.applySchemeService.applyScheme(data).subscribe({
              next: (response) => {
                // Show success message using ToastService
                this.toastService.showSuccess(response.message);
                // Refresh the table data after successful deletion
                this.loadSchemes(this.currentPaginationRequest);
              },
              error: (error) => {
                console.error('Error In Apply Scheme:', error);
                // Show error message using ToastService
                this.toastService.showError(error.message || 'Something went wrong');
              }
            });
          },
          error: (err) => {
            console.error('Error loading resident profile', err);
          }
        });
      }
      else {
        this.toastService.showError("You Are Not Resident So, You Can't Apply In Scheme");
      }
    }
  }

  onSearch() {
    this.isLoading = true;
    const searchRequest = {
      keyword: this.searchTerm,
      isActive: this.search.isActive,
      isDeleted: this.search.isDeleted,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy,

    };
    this.schemeService.searchScheme(searchRequest)
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
      isDeleted: this.filters.isDeleted,
      createdBy: this.filters.createdBy,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy
    };

    this.schemeService.filterScheme(filterRequest).subscribe({
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
