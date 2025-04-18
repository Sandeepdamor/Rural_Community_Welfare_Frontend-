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
import { HttpClient } from '@angular/common/http';
import { SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { TableConfig } from '../model/table-config';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { RoleListComponent } from '../../../manage-roles/components/role-list/role-list.component';
import { Router, RouterLink } from '@angular/router';
import { ComponentRoutes } from '../../utils/component-routes';
import {
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { GenderPipe } from '../../pipes/gender.pipe';

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
    // MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
    NgClass,
    MatSlideToggleModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements AfterViewInit, OnChanges {
  constructor(private router: Router){ }
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
  pageSizeOptions = [5, 10, 20]; // Define page size options here
  defaultPageSize = 5; // Default items per page

  @Output() pageChanged = new EventEmitter<{ pageIndex: number, pageSize: number }>();
  @Output() statusChanged = new EventEmitter<{ id: string, isActive: boolean }>();
  // @Output() statusIsDeletedChanged = new EventEmitter<{ id: string, isActive: boolean }>();
  @Output() aadharStatusChanged = new EventEmitter<{ id: string, aadharVerificationStatus: string }>();
  @Output() actionClicked = new EventEmitter<{ action: string, element: any }>();

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

  // changeIsDeletedStatus(element: any, newStatus: boolean) {
  //   this.statusIsDeletedChanged.emit({ id: element.id, isActive: newStatus });
  // }
  changeAadharStatus(element: any, newStatus: string) {
    this.aadharStatusChanged.emit({ id: element.id, aadharVerificationStatus: newStatus });
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
    console.log('NGAFTER VIEW INIT()')
    // Set pagination properties
    if (this.paginator) {
      this.paginator.length = this.config.totalRecords ?? 0;
      this.paginator.pageSize = this.defaultPageSize;
      this.paginator.pageSizeOptions = this.pageSizeOptions;

      this.paginator.page.subscribe(event => {
        console.log('Page changed:', event);
        this.pageChanged.emit({
          pageIndex: event.pageIndex,
          pageSize: event.pageSize
        });
      });
    }
  }

  onAction(action: string, element: any): void {
    this.actionClicked.emit({ action, element });
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
}
