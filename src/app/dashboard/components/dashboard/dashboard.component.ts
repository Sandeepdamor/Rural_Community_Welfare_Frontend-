import { ChartType, ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';
import { DashboardData } from '../../../shared/interfaces/dashboard-data';
import { DashboardService } from '../../../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // 👤 Current user role: 'ADMIN' | 'SARPANCH' | 'RESIDENT'
  Role = Role;
  userRole: Role;
  dashboardData: DashboardData = {} as DashboardData;
  constructor(
    private tokenService: TokenService,
    private dashboardService: DashboardService
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.userRole = roleString as Role; //  safely assign enum
  }

  // 🍰 Gender Distribution Chart
  genderChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: [20, 25, 5],
        backgroundColor: ['#4F46BB', '#FD9292', '#3CD856'],
      },
    ],
  };
  genderChartType: ChartType = 'pie';

  // 🏗️ Projects Section
  selectedStatus = 'Ongoing';
  projects = [
    { name: 'Water Supply Project', status: 'Ongoing' },
    { name: 'School Renovation', status: 'Ongoing' },
    { name: 'Panchayat Office Setup', status: 'Completed' },
    { name: 'Road Construction', status: 'Completed' },
  ];
  filteredProjects: any[] = [];

  // 📢 Announcements Section
  announcements = [
    { message: 'Gram Sabha meeting on May 5th.', date: '2025-04-29' },
    { message: 'Rainwater harvesting awareness.', date: '2025-04-26' },
  ];

  // 📋 Schemes
  schemes = [
    { title: 'Pension Yojana', isNew: true },
    { title: 'PM Awas Yojana', isNew: false },
    { title: 'Digital Gram Panchayat', isNew: true },
  ];

  // 📈 Village/District-wise Summary Chart (Admin)
  villageDistrictChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Village A', 'Village B', 'Village C'],
    datasets: [
      {
        data: [10, 20, 15],
        label: 'User Count',
        backgroundColor: '#4F46BB',
      },
    ],
  };

  // 🧑 Resident Section
  resident = {
    name: 'Ravi Sharma',
    status: 'Verified',
    contactInfo: 'ravi@example.com, +91 9876543210',
  };

  residentAnnouncements = [
    { message: 'Power cut in Village A on May 1', date: '2025-04-27' },
    { message: 'Free medical camp at PHC', date: '2025-04-24' },
  ];

  residentSchemes = [
    { title: 'Free Sanitary Pad Scheme' },
    { title: 'Grain Subsidy Card' },
  ];

  ongoingProjects = [
    { name: 'Drainage Line Construction' },
    { name: 'Community Center Setup' },
  ];

  sarpanch = {
    name: 'Smt. Rekha Devi',
    phone: '+91 9123456780',
    email: 'rekha.sarpanch@gram.org',
  };

  ngOnInit(): void {
    this.filterProjects();
    // Fetch the dashboard data when the component initializes
    if (this.userRole !== Role.RESIDENT) {
      this.dashboardService.getDashboardData()
        .subscribe((data: DashboardData) => {
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
      // this.getLatestProjects(); // Fetch latest projects on initialization
    }
  }

  // 🔁 Project Filter based on status tab
  onStatusChange(status: string) {
    this.selectedStatus = status;
    this.filterProjects();
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(
      (p) => p.status === this.selectedStatus
    );
  }

  // ➕ Sarpanch buttons
  addAnnouncement() {
    alert('Redirect to Add Announcement Form');
  }

  createScheme() {
    alert('Redirect to Create Scheme Form');
  }
}
