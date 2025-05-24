import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnnouncementService } from '../../../shared/services/announcement.service';
import { TableConfig } from '../../../shared/components/model/table-config';
import { AnnouncementFilter } from '../../../shared/interfaces/Announcement/announcement-filter';
import { PaginationRequest } from '../../../shared/interfaces/pagination-request';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AnnouncementSearch } from '../../../shared/interfaces/Announcement/announcement-search';

@Component({
  selector: 'app-announcements-delete',
  imports: [DynamicTableComponent, CommonModule, FormsModule],
  templateUrl: './announcements-delete.component.html',
  styleUrl: './announcements-delete.component.scss',
})
export class AnnouncementsDeleteComponent {
  searchTerm: string = '';
  showFilters: boolean = false;
  isLoading: boolean = false;
  deletedAnnouncements: any[] = []; // Store deleted items if needed
  announcementId: number | null = null;
  isViewMode = false;
  id: string | null = null;
  announcementForm!: FormGroup;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private announcementService: AnnouncementService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  currentPaginationRequest: PaginationRequest = {
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt',
  };

  filters: AnnouncementFilter = {
    isActive: true,
    status: null,
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
  };

  searchValue: AnnouncementSearch = {
    search: '',
    pageNumber: 1,
    pageSize: 5,
    sortBy: 'createdAt', // or 'createdAt', depending on your backend's field
  };

  agencyTableConfig: TableConfig = {
    columns: [
      // { name: 'id', displayName: 'ID', type: 'text' },
      { name: 'title', displayName: 'Title', type: 'text' },
      { name: 'content', displayName: 'Content', type: 'text' },
      { name: 'date', displayName: 'Date', type: 'text' },
      { name: 'status', displayName: 'Status', type: 'announcementStatus' },
      { name: 'authorName', displayName: 'Author Name', type: 'text' },
      // { name: 'isDeleted', displayName: 'Deleted', type: 'boolean' },
      // { name: 'isActive', displayName: 'Active', type: 'status' },
      //  { name: 'createdAt', displayName: 'Created At', type: 'datetime' },
      // { name: 'updatedAt', displayName: 'Updated At', type: 'datetime' },
      //{ name: 'attachments', displayName: 'Attachments', type: 'list' },
      { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [],
    actions: ['view profile'],
  };

  onFilter() {}
  toggleFilter() {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initializeForm();

    if (this.id) {
      this.isViewMode = true;
      // this.loadAnnouncementDetails(this.id);
    }
    this.loadDeletedAnnouncements(this.currentPaginationRequest);
  }

  initializeForm() {
    this.announcementForm = this.fb.group({
      title: [''],
      content: [''],
      date: [''],
      status: [''],
      authorName: [''],
    });
  }

  loadDeletedAnnouncements(paginationRequest: PaginationRequest): void {
    this.isLoading = true;

    this.announcementService.getDeletedAnnouncements().subscribe({
      next: (deletedData) => {
        console.log(
          ' fetching deleted announcements--------------------:',
          deletedData.content
        );
        const processedData = deletedData.content.map((event: any) => ({
          ...event,
          authorName: event.createdBy?.name || 'N/A', // extract nested name safely
        }));

        console.log('Processed Data--------------------------:', processedData);

        this.agencyTableConfig = {
          ...this.agencyTableConfig,
          data: processedData,
          totalRecords: deletedData.totalElements,
        };
        this.agencyTableConfig.data = deletedData.content;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching deleted announcements:', err);
        this.isLoading = false;
      },
    });
  }

  onViewAction(event: { action: string; element: any }) {
    const { action, element } = event;
    if (action === 'view profile') {
      console.log('Navigating to profile of announcement with ID:', element.id);
      // this.router.navigate(['announcements/add', element.id]); // WITHOUT 'announcements'
      this.router.navigate(['announcements/add', element.id], {
        queryParams: { mode: 'view' },
      });
    }
  }

  onSearchAnnouncements() {
    console.log('Search button clicked'); // Debug
    this.isLoading = true;

    const searchRequest: any = {
      search: this.searchTerm,
      pageNumber: this.currentPaginationRequest.pageNumber,
      pageSize: this.currentPaginationRequest.pageSize,
      sortBy: this.currentPaginationRequest.sortBy,
    };
    console.log('SEARCH TERM => ', this.searchTerm);

    console.log('SEARCH REQUEST => ', searchRequest);
    console.log('SEARCH REQUEST FILTER => ', this.filters);

    this.announcementService.searchAnnouncements(searchRequest).subscribe({
      next: (response) => {
        console.log('Search RESULT => ', response);
        this.changeDetection.detectChanges();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isLoading = false;
      },
    });
  }
}
