import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { TableConfig } from '../../../shared/components/model/table-config';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent {
  isRoleTable = true;
  agencyTableConfig: TableConfig = {
    columns: [
      {
        name: 'role',
        displayName: 'Role',
        type: 'text',
        sortable: true,
      },
      { name: 'action', displayName: 'Action', type: 'action' },
    ],
    data: [
      {
        role: 'Admin',
      },
      {
        role: 'Sub admin',
      },
      {
        role: 'ARelationship managerdmin',
      },    
    ],
    actions: ['edit', 'delete','manage-permission'],
  };
  
}
