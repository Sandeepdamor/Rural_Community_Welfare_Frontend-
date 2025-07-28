import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddUserComponent } from '../../../users/components/add-user/add-user.component';
import { TableConfig } from '../../../shared/components/model/table-config';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterLink,DynamicTableComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  agencyTableConfig: TableConfig = {
    columns: [
        {
            name: 'date',
            displayName: 'Date',
            type: 'text',
            sortable: true,
        },
        {
            name: 'category',
            displayName: 'Category',
            type: 'text',
            sortable: true,
        },
        {
            name: 'title',
            displayName: 'Title',
            type: 'text',
            sortable: true,
        },
        {
            name: 'description',
            displayName: 'Description',
            type: 'text',
            sortable: true,
        },
        {
            name: 'priority',
            displayName: 'Priority',
            type: 'status',
        },
        {
            name: 'status',
            displayName: 'Status',
            type: 'status',
        },
        { 
            name: 'viewDetails', 
            displayName: 'View Details', 
            type: 'action'  
        }
    ],
    data: [
        {
            date: '21/04/2024',
            category: 'Government',
            title: 'Awaas Yojana Notice',
            description: 'New housing scheme updates for rural areas...',
            priority: 'High',
            status: 'New',
            viewDetails: 'https://example.com/awaas-yojana',
        },
        {
            date: '18/04/2024',
            category: 'Community',
            title: 'Health Camp Announcement',
            description: 'Free medical check-up camp for rural citizens...',
            priority: 'Medium',
            status: 'Ongoing',
            viewDetails: 'https://example.com/health-camp',
        },
        {
            date: '15/03/2024',
            category: 'Emergency',
            title: 'Flood Relief Notice',
            description: 'Guidelines for flood-affected regions...',
            priority: 'High',
            status: 'Expired',
            viewDetails: 'https://example.com/flood-relief',
        },
    ],
    actions: ['view'],
};

}
