import { Component } from '@angular/core';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import { RouterLink } from '@angular/router';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { TableConfig } from '../../../shared/components/model/table-config';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterLink,DynamicTableComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss'
})
export class BookingListComponent {
  agencyTableConfig: TableConfig = {
    columns: [
        {
            name: 'grievanceId',
            displayName: 'Grievance ID',
            type: 'text',
            sortable: true,
        },
        {
            name: 'name',
            displayName: 'Name',
            type: 'text',
            sortable: true,
        },
        {
            name: 'email',
            displayName: 'Email',
            type: 'text',
            sortable: true,
        },
        {
            name: 'phoneNumber',
            displayName: 'Phone Number',
            type: 'text',
            sortable: true,
        },
        {
            name: 'subject',
            displayName: 'Subject',
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
            name: 'address',
            displayName: 'Address',
            type: 'text',
            sortable: true,
        },
        {
            name: 'serviceAddress',
            displayName: 'Service Address',
            type: 'text',
            sortable: true,
        },
        {
            name: 'submissionDate',
            displayName: 'Submission Date',
            type: 'text',
            sortable: true,
        },
        {
            name: 'status',
            displayName: 'Status',
            type: 'status', // Can be 'Pending', 'In Progress', or 'Resolved'
            sortable: true,
        },
        { 
            name: 'viewDetails', 
            displayName: 'View Details', 
            type: 'action' // Clicking will open full grievance details
        }
    ],
    data: [
        {
            grievanceId: 'G202401',
            name: 'Sandeep',
            email: 'Sandeep2121@gmail.com',
            phoneNumber: '7024561482',
            subject: 'AC Repair',
            description: 'Not working properly',
            address: '174e/28, 1 Floor 1 Main, Vidyaranyanagar, Magadi Road',
            serviceAddress: 'Indore, Bhawarkua',
            submissionDate: '01/03/2024',
            status: 'Pending',
            viewDetails: 'https://example.com/grievance-202401'
        },
        {
            grievanceId: 'G202402',
            name: 'Rajesh Kumar',
            email: 'rajesh@gmail.com',
            phoneNumber: '9876543210',
            subject: 'Water Supply Issue',
            description: 'No water supply since two days.',
            address: 'Sector 5, New Delhi',
            serviceAddress: 'New Delhi, Block A',
            submissionDate: '28/02/2024',
            status: 'In Progress',
            viewDetails: 'https://example.com/grievance-202402'
        },
        {
            grievanceId: 'G202403',
            name: 'Priya Sharma',
            email: 'priya.sharma@gmail.com',
            phoneNumber: '8745123698',
            subject: 'Road Repair',
            description: 'Potholes causing accidents near main road.',
            address: 'MG Road, Pune',
            serviceAddress: 'Pune, Shivaji Nagar',
            submissionDate: '25/02/2024',
            status: 'Resolved',
            viewDetails: 'https://example.com/grievance-202403'
        }
    ],
    actions: ['edit', 'delete'], // Users can edit/delete grievances before resolution
};

}
