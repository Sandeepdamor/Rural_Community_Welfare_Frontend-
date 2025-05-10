import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { TableConfig } from '../../../shared/components/model/table-config';

@Component({
  selector: 'app-update-role',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './update-role.component.html',
  styleUrl: './update-role.component.scss'
})
export class UpdateRoleComponent {
  // agencyTableConfig: TableConfig = {
  //   columns: [
  //     {
  //       name: 'type',
  //       displayName: 'Type',
  //       type: 'text',
  //       sortable: true,
  //     },
  //     {
  //       name: 'create',
  //       displayName: 'Create',
  //       type: 'toggle',
  //       sortable: true,
  //     },
  //     {
  //       name: 'update',
  //       displayName: 'Update',
  //       type: 'toggle',
  //       sortable: true,
  //     },
  //     {
  //       name: 'delete',
  //       displayName: 'Delete',
  //       type: 'toggle',
  //       sortable: true,
  //     },
  //     {
  //       name: 'read',
  //       displayName: 'Read',
  //       type: 'toggle',
  //       sortable: true,
  //     },
   
  //   ],
  //   data: [
  //     {
  //       type: 'User',
  //       create: 'toggle',
  //       update: 'toggle',
  //        delete: 'toggle',
  //        read:'toggle',
  //     },
  //     {
  //       type: 'Customer',
  //       create: 'toggle',
  //       update: 'toggle',
  //        delete: 'toggle',
  //        read:'toggle',
       
  //     },
  //     {
  //       type: 'Vendor',
  //       create: 'toggle',
  //       update: 'toggle',
  //        delete: 'toggle',
  //        read:'toggle',
  //     },
  //   ],
   
  // };
}
