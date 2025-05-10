import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { TableConfig } from '../../../shared/components/model/table-config';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { SchemeService } from '../../../shared/services/scheme.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CategoryService } from '../../../shared/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-category-list',
  imports: [DynamicTableComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit, AfterViewInit {

  constructor(
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService,
    private categoryService: CategoryService
  ) { }
  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt'
  };
  isLoading: boolean = false;
  searchTerm: string = '';
  showFilters: boolean = false;
  filters = {
    isActive: null as boolean | null,
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt'
  };

  ngOnInit(): void {
    this.loadCategory(null,this.currentPaginationRequest);

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDetection.detectChanges();
    }, 200);
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
      { name: 'name', displayName: 'Category Name', type: 'text' },
      { name: 'isActive', displayName: 'Category Status', type: 'toggle' },
      { name: 'createdAt', displayName: 'Create Date', type: 'text' },
      { name: 'updatedAt', displayName: 'Last Update Date', type: 'text' },
    ],
    data: [],
    actions: []
  };



  loadCategory(isActive:boolean|null,paginationRequest: PaginationRequest) {
    this.isLoading = true;
    this.categoryService.getAllCategory(isActive,paginationRequest).subscribe({
      next: (response) => {
        console.log('API Response IN CATEGORY:', response);

        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: response.content,
          totalRecords: response.totalElements
        };
        this.changeDetection.detectChanges();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching Schemes:', err.error);
        // alert(err.error.message);
        this.isLoading = false;
      }
    });
  }

  updateIsActiveStatus(event: { id: string, isActive: boolean }) {
    this.categoryService.updateStatus(event.id, event.isActive).subscribe({
      next: (response) => {
        console.log('CATEGORY RESPONSE ==> ', response);
        // Show success message using ToastService
        this.toastService.showSuccess(response.message);
        this.loadCategory(null,this.currentPaginationRequest);
      },
      error: (err) => {
        console.error('Status Updation Faild:', err.details);
        // Show error message using ToastService
        this.toastService.showError(err.details || 'Something went wrong');
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
    this.categoryService.searchCategory(searchRequest)
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
      this.loadCategory(this.filters.isActive,this.currentPaginationRequest);
  }
}

