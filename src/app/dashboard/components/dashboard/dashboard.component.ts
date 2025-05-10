import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';
import { DashboardData } from '../../../shared/interfaces/dashboard-data';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Project } from '../../../shared/interfaces/project/project';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // 👤 Current user role: 'ADMIN' | 'SARPANCH' | 'RESIDENT'
  Role = Role;
  userRole: Role;
  dashboardData: DashboardData = {} as DashboardData;
  selectedStatus: string = 'Ongoing'; // Default selected status
  projects: { [key: string]: Project[] } = {}; // To store projects grouped by status
  filteredProjects: Project[] = []; // To hold projects filtered by selected status

  statusTabs = [
    { key: 'ONGOING', label: 'Ongoing' },
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'NOT_STARTED', label: 'Not Started' },
    { key: 'ON_HOLD', label: 'On Hold' }
  ];


  constructor(private tokenService: TokenService, private dashboardService: DashboardService) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.userRole = roleString as Role; // ✅ safely assign enum
  }

  // 🍰 Gender Distribution Chart
  genderChartType: ChartType = 'pie'; // or 'doughnut', 'bar', etc.

  genderChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'], // Male, Female, Other
      }
    ]
  };

  // 📢 Announcements Section
  announcements = [
    { message: 'Gram Sabha meeting on May 5th.', date: '2025-04-29' },
    { message: 'Rainwater harvesting awareness.', date: '2025-04-26' }
  ];

  // 📋 Schemes
  schemes = [
    { title: 'Pension Yojana', isNew: true },
    { title: 'PM Awas Yojana', isNew: false },
    { title: 'Digital Gram Panchayat', isNew: true }
  ];

  // 📈 Village/District-wise Summary Chart (Admin)
  villageDistrictChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Village A', 'Village B', 'Village C'],
    datasets: [
      {
        data: [10, 20, 15],
        label: 'User Count',
        backgroundColor: '#4F46BB'
      }
    ]
  };

  // 🧑 Resident Section
  resident = {
    name: 'Ravi Sharma',
    status: 'Verified',
    contactInfo: 'ravi@example.com, +91 9876543210'
  };

  residentAnnouncements = [
    { message: 'Power cut in Village A on May 1', date: '2025-04-27' },
    { message: 'Free medical camp at PHC', date: '2025-04-24' }
  ];

  residentSchemes = [
    { title: 'Free Sanitary Pad Scheme' },
    { title: 'Grain Subsidy Card' }
  ];

  ongoingProjects = [
    { name: 'Drainage Line Construction' },
    { name: 'Community Center Setup' }
  ];

  sarpanch = {
    name: 'Smt. Rekha Devi',
    phone: '+91 9123456780',
    email: 'rekha.sarpanch@gram.org'
  };

  ngOnInit(): void {
    // Fetch the dashboard data when the component initializes
    this.dashboardService.getDashboardData().subscribe((data: DashboardData) => {
      this.dashboardData = data;
      console.log('DASHBOARD DATA 11=> ', data);
      console.log('DASHBOARD DATA 22 => ', this.dashboardData);
      // this.updateDashboardForRole();

      // ✅ Update chart data
      if (data.genderDistribution) {
        const genderDist = data.genderDistribution;

        this.genderChartData.labels = Object.keys(genderDist); // ['Male', 'Female', 'Other']
        this.genderChartData.datasets[0].data = Object.values(genderDist); // [12, 18, 3]
      }
    });
    this.getLatestProjects(); // Fetch latest projects on initialization

  }

  // Fetch the latest projects from the backend
  getLatestProjects(): void {
    this.dashboardService.getLatestProjects().subscribe(
      (projectsByStatus: { [key: string]: Project[] }) => {
        // Flatten all projects from the grouped response (e.g., APPROVED, PENDING)
        const allProjects = Object.values(projectsByStatus).flat();

        // Group projects by progressStatus like 'ONGOING', 'COMPLETED'
        this.projects = allProjects.reduce((acc, project) => {
          const key = project.progressStatus?.toUpperCase() || 'UNKNOWN';
          console.log('PROJECT KEY ==> ', key);
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(project);
          return acc;
        }, {} as { [key: string]: Project[] });

        console.log('Grouped by progressStatus =>', this.projects);

        this.filterProjectsByStatus(); // Filter on default status
      },
      error => {
        console.error('Error fetching projects:', error);
      }
    );
  }


  // Filter projects based on selected status
  filterProjectsByStatus(): void {
    console.log('All Projects:', this.projects); // Log all projects to inspect the structure
    console.log('Selected Status:', this.selectedStatus); // Log selected status to ensure it is correct

    // Check if the selectedStatus exists in projects object and has values
    if (this.projects && this.projects[this.selectedStatus]) {
      this.filteredProjects = this.projects[this.selectedStatus];
      console.log('Filtered Projects:', this.filteredProjects); // Log filtered projects
    } else {
      this.filteredProjects = []; // Reset filtered projects if no match
      console.log('No projects found for this status');
    }
  }

  // Handle status change in the tab
  onStatusChange(status: string): void {
    console.log('Status changing to:', status); // Log status change
    this.selectedStatus = status;

    // Ensure you call the filter function after the status change
    this.filterProjectsByStatus();
  }


  // ➕ Sarpanch buttons
  addAnnouncement() {
    alert('Redirect to Add Announcement Form');
  }

  createScheme() {
    alert('Redirect to Create Scheme Form');
  }
}
