import { Component } from '@angular/core';
import { TableConfig } from '../../../shared/components/model/table-config';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { RouterLink } from '@angular/router';
import { AddServiceCategoryComponent } from '../add-service-category/add-service-category.component';

@Component({
  selector: 'app-service-category-list',
  standalone: true,
  imports: [RouterLink,DynamicTableComponent],
  templateUrl: './service-category-list.component.html',
  styleUrl: './service-category-list.component.scss'
})
export class ServiceCategoryListComponent {
  agencyTableConfig: TableConfig = {
    columns: [
        {
            name: 'projectName',
            displayName: 'Project Name',
            type: 'text',
            sortable: true,
        },
        {
            name: 'description',
            displayName: 'Description',
            type: 'text',
            sortable: false,
        },
        {
            name: 'startDate',
            displayName: 'Start Date',
            type: 'text',
            sortable: true,
        },
        {
            name: 'endDate',
            displayName: 'End Date',
            type: 'text',
            sortable: true,
        },
        {
            name: 'location',
            displayName: 'Location',
            type: 'text',
            sortable: true,
        },
        {
            name: 'status',
            displayName: 'Status',
            type: 'status', // Can be 'Ongoing', 'Completed', 'Pending'
            sortable: true,
        },
        { 
            name: 'details', 
            displayName: 'Details', 
            type: 'action' // Clicking will open project details
        }
    ],
    data: [
        {
            projectName: 'Clean Water Initiative',
            description: 'Installing water purification systems in rural areas.',
            startDate: '01/02/2024',
            endDate: '30/06/2024',
            location: 'Village A, District B',
            status: 'Ongoing',
            details: 'https://example.com/clean-water-project'
        },
        {
            projectName: 'Rural Road Development',
            description: 'Constructing and repairing roads in underdeveloped areas.',
            startDate: '15/01/2023',
            endDate: '20/12/2023',
            location: 'Village X, District Y',
            status: 'Completed',
            details: 'https://example.com/rural-road-project'
        },
        {
            projectName: 'Women Empowerment Program',
            description: 'Providing skill training and self-employment opportunities.',
            startDate: '10/03/2024',
            endDate: '15/09/2024',
            location: 'Community Center, City Z',
            status: 'Ongoing',
            details: 'https://example.com/women-empowerment'
        },
        {
            projectName: 'Tree Plantation Drive',
            description: 'Planting 10,000 trees in deforested areas.',
            startDate: '05/06/2024',
            endDate: '10/07/2024',
            location: 'Green Belt Area, District C',
            status: 'Pending',
            details: 'https://example.com/tree-plantation'
        }
    ],
    actions: ['view'], // Users can only view project details
};

}
