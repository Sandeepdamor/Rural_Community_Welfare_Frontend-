import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { MatTableModule } from '@angular/material/table';

import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { TableConfig } from '../model/table-config';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { RoleListComponent } from '../../../manage-roles/components/role-list/role-list.component';
import { ComponentRoutes } from '../../utils/component-routes';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { ProjectProgress } from '../../../enums/project-progress.enum';
import { Project } from '../../interfaces/project/project';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../services/token.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReasonDialogComponent } from '../reason-dialog/reason-dialog.component';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    //MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
    NgClass,
    MatSlideToggleModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements AfterViewInit, OnChanges {
  componentRoutes = ComponentRoutes;
  isLastPage: boolean = false;
  toggleDropdown() {
    throw new Error('Method not implemented.');
  }
  @Input() config!: TableConfig;
  @Input() isRoleTable!: RoleListComponent;
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [];
  pageSizeOptions = [10, 20, 30]; // Define page size options here
  defaultPageSize = 10; // Default items per page
  // @Output() statusIsDeletedChanged = new EventEmitter<{ id: string, isActive: boolean }>();
  @Output() aadharStatusChanged = new EventEmitter<{
    id: string;
    aadharVerificationStatus: string;
  }>();
  @Output() projectApprovalStatusChanged = new EventEmitter<{
    id: string;
    approvalStatus: string;
    reason: string;
  }>();
  @Output() projectProgressStatusChanged = new EventEmitter<{
    id: string;
    progressStatus: string;
  }>();
  @Output() actionClicked = new EventEmitter<{
    action: string;
    element: any;
  }>();

  @Output() pageChanged = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
  }>();
  @Output() statusChanged = new EventEmitter<{
    id: string;
    isActive: boolean;
  }>();
  @Output() schemeStatusChanged = new EventEmitter<{
    id: string;
    status: string;
  }>();
  @Output() changeAnnouncementStatusEvent = new EventEmitter<{
    id: number;
    AnnouncementStatus: string;
  }>();

  @Output() deleteAnnouncement: EventEmitter<string> =
    new EventEmitter<string>();

  @Output() getdeleteAnnouncement = new EventEmitter<string>();

  Role = Role;
  userRole: Role;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.userRole = roleString as Role;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && changes['config'].currentValue) {
      this.dataSource = new MatTableDataSource(this.config.data);
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.config.data);
    this.displayedColumns = this.config.columns.map((col) => col.name);

    // Debug logs
    console.log('Initial Data:', this.config.data);
    console.log('Total Records:', this.config.totalRecords);
    console.log('Displayed Columns:', this.displayedColumns);
  }

  changeStatus(element: any, newStatus: boolean) {
    this.statusChanged.emit({ id: element.id, isActive: newStatus });
  }

  changeSchemeStatus(element: any, newStatus: string) {
    this.schemeStatusChanged.emit({ id: element.id, status: newStatus });
  }

  changeAnnouncementsStatus(element: any, newStatus: string) {
    this.changeAnnouncementStatusEvent.emit({
      id: element.id,
      AnnouncementStatus: newStatus,
    });
  }

  changeAadharStatus(element: any, newStatus: string) {
    this.aadharStatusChanged.emit({
      id: element.id,
      aadharVerificationStatus: newStatus,
    });
  }

  changeProjectApprovalStatus(element: any, newStatus: string) {
    console.log(
      'IN DYNAMIC TABLE CHANGE APPROVAL STATUS ==> ',
      element,
      newStatus
    );

    if (newStatus === 'PENDING') {
      this.projectApprovalStatusChanged.emit({
        id: element.id,
        approvalStatus: newStatus,
        reason: '', // No reason required
      });
      return;
    }

    const dialogRef = this.dialog.open(ReasonDialogComponent, {
      width: '400px',
      disableClose: true, // Prevent closing without action
      data: { status: newStatus },
    });

    dialogRef.afterClosed().subscribe((reason: string) => {
      if (reason && reason.trim().length > 0) {
        this.projectApprovalStatusChanged.emit({
          id: element.id,
          approvalStatus: newStatus,
          reason: reason.trim(),
        });
      } else {
        console.warn('Reason is required but not provided.');
        // Optionally reopen the dialog or show a message
      }
    });
  }

  changeProjectProgressStatus(element: any, newStatus: any): void {
    console.log(`Changing status of project to: ${newStatus}`, element);
    this.projectProgressStatusChanged.emit({
      id: element.id,
      progressStatus: newStatus,
    });
  }

  // getSerialNumber(row: any): number {
  //   const index = this.dataSource?.data.indexOf(row);
  //   const pageIndex = this.paginator?.pageIndex ?? 0;
  //   const pageSize = this.paginator?.pageSize ?? 5;
  //   return (pageIndex * pageSize) + index + 1;
  // }

  ngAfterViewInit() {
    // Initialize paginator and sort
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('NGAFTER VIEW INIT()');
    // Set pagination properties
    if (this.paginator) {
      this.paginator.length = this.config.totalRecords ?? 0;
      this.paginator.pageSize = this.defaultPageSize;
      this.paginator.pageSizeOptions = this.pageSizeOptions;

      this.paginator.page.subscribe((event) => {
        console.log('Page changed:', event);
        this.pageChanged.emit({
          pageIndex: event.pageIndex,
          pageSize: event.pageSize,
        });
      });
    }
  }

  onAction(action: string, element: any): void {
    this.actionClicked.emit({ action, element });
  }

  getBackgroundColor(status: string): string {
    switch (status) {
      case ProjectProgress.NOT_STARTED:
        return '#edecf8';
      case ProjectProgress.ONGOING:
        return 'rgba(255, 53, 53, 0.05)';
      case ProjectProgress.ON_HOLD:
        return '#F5F6FA';
      case ProjectProgress.COMPLETED:
        return '#F5F6FA';
      default:
        return '#fff';
    }
  }

  getStatusColor(status: string): string {
    if (
      status === ProjectProgress.ON_HOLD ||
      status === ProjectProgress.COMPLETED
    ) {
      return '#4F46BB';
    }
    return '#000';
  }

  checkboxLabel(row?: any): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  trackByFn(index: number, item: any): any {
    return item.name || index;
  }
  selectedValue: string = '';
  selectedCar: string = '';

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  cars: any[] = [
    { value: 'volvo', viewValue: 'Volvo' },
    { value: 'saab', viewValue: 'Saab' },
    { value: 'mercedes', viewValue: 'Mercedes' },
  ];

  private _formBuilder = inject(FormBuilder);

  isChecked = true;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }

  deleteAnnouncementById(announcementId: string): void {
    this.deleteAnnouncement.emit(announcementId);
  }

  onDelete(announcement: any) {
    this.getdeleteAnnouncement.emit(announcement);
  }
}
