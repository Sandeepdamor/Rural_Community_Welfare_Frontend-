import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableConfig } from '../../../shared/components/model/table-config';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [RouterLink,DynamicTableComponent],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.scss'
})
export class VendorListComponent {
  agencyTableConfig: TableConfig = {
    columns: [
        { name: 'profilePicture', displayName: 'Logo', type: 'image' },
        {
            name: 'schemeName',
            displayName: 'Scheme Name',
            type: 'text',
            sortable: true,
        },
        {
            name: 'department',
            displayName: 'Department',
            type: 'text',
            sortable: true,
        },
        {
            name: 'eligibility',
            displayName: 'Eligibility',
            type: 'text',
            sortable: true,
        },
        {
            name: 'benefits',
            displayName: 'Benefits',
            type: 'text',
            sortable: true,
        },
        {
            name: 'documents',
            displayName: 'Required Documents',
            type: 'documents'
        },
        { 
            name: 'status', 
            displayName: 'Status', 
            type: 'status' 
        },
        { 
            name: 'details', 
            displayName: 'Details', 
            type: 'action' 
        },
    ],
    data: [
        {
            profilePicture: 'assets/images/svg/scheme-logo.svg',
            schemeName: 'PM Awas Yojana',
            department: 'Ministry of Housing',
            eligibility: 'BPL Families, Low-Income Groups',
            benefits: 'Affordable housing subsidy up to ₹2.67L',
            documents: 'Aadhar, Income Certificate, Bank Details',
            status: 'Active',
            details: 'https://pmay.gov.in/',
        },
        {
            profilePicture: 'assets/images/svg/scheme-logo.svg',
            schemeName: 'Pradhan Mantri Jan Dhan Yojana',
            department: 'Finance Ministry',
            eligibility: 'Indian Citizens above 10 years',
            benefits: 'Zero balance account, insurance cover',
            documents: 'Aadhar, Voter ID, PAN Card',
            status: 'Active',
            details: 'https://pmjdy.gov.in/',
        },
        {
            profilePicture: 'assets/images/svg/scheme-logo.svg',
            schemeName: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
            department: 'Ministry of Rural Development',
            eligibility: 'Rural Workers, Job Seekers',
            benefits: '100 days of wage employment',
            documents: 'Aadhar, Job Card, Ration Card',
            status: 'Upcoming',
            details: 'https://nrega.nic.in/',
        },
        {
            profilePicture: 'assets/images/svg/scheme-logo.svg',
            schemeName: 'Ayushman Bharat',
            department: 'Ministry of Health',
            eligibility: 'BPL Families, Low-Income Groups',
            benefits: 'Health Insurance up to ₹5L per family',
            documents: 'Aadhar, Income Certificate',
            status: 'Expired',
            details: 'https://pmjay.gov.in/',
        },
    ],
    actions: ['apply'],
};
}
