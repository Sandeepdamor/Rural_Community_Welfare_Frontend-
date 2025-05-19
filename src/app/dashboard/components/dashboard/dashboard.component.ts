import { ChartType, ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';
import { DashboardData } from '../../../shared/interfaces/dashboard-data';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { SchemeResponse } from '../../../shared/interfaces/scheme/scheme-response';
import { Router, RouterLink } from '@angular/router';
import { Project } from '../../../shared/interfaces/project/project';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // 👤 Current user role: 'ADMIN' | 'SARPANCH' | 'RESIDENT'
  Role = Role;
  userRole: Role;
  dashboardData: DashboardData = {} as DashboardData;
  projects: Project[] = [];
  currentIndexes: number[] = [];
  constructor(
    private tokenService: TokenService,
    private dashboardService: DashboardService,
    private router: Router
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

  // 📢 Announcements Section
  announcements = [
    { message: 'Gram Sabha meeting on May 5th.', date: '2025-04-29' },
    { message: 'Rainwater harvesting awareness.', date: '2025-04-26' },
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



  //📋 Schemes
  schemes: SchemeResponse[] = [];




  ngOnInit(): void {

    this.loadDashboardData();



    // setInterval(() => this.autoSlideImages(), 4000); // Auto-slide every 4 sec
    // this.filterProjects();
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
    // this.filterProjects();
  }



  // ➕ Sarpanch buttons
  addAnnouncement() {
    alert('Redirect to Add Announcement Form');
  }

  createScheme() {
    alert('Redirect to Create Scheme Form');
  }





  loadDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data: DashboardData) => {
        console.log('DASHBOARD DATA RESPONSE ===> ', data);
        this.schemes = data.schemes;
        this.projects = data.projects;
        this.dashboardData = data;
        // Initialize currentIndexes for each project
        this.currentIndexes = this.projects.map(() => 0);
        this.startImageRotation(); // ✅ start image rotation
        console.log('PROJECTS ======>>> ', this.projects);
      },
      error: (err) => {
        console.error('Error fetching schemes:', err);
        alert(err?.error?.message || 'Something went wrong while fetching schemes.');
      }
    });
  }

  startImageRotation(): void {
    setInterval(() => {
      this.projects.forEach((project, i) => {
        if (project.attachmenets.length > 1) {
          this.currentIndexes[i] = (this.currentIndexes[i] + 1) % project.attachmenets.length;
        }
      });
    }, 3000); // change image every 3 seconds
  }

  getImage(projectIndex: number): string {
    return this.projects[projectIndex].attachmenets[this.currentIndexes[projectIndex]];
  }

  navigatToAnnouncementView(id: string): void {
    this.router.navigate(['announcements/add', id], {
      queryParams: { mode: 'view-announcements' },
    });
  }

}
