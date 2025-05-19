import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ComponentRoutes } from '../../shared/utils/component-routes';
import { PaginationRequest } from '../../shared/interfaces/pagination-request';
import { SchemeService } from '../../shared/services/scheme.service';
import { SchemeResponse } from '../../shared/interfaces/scheme/scheme-response';
import { CommonModule } from '@angular/common';
import { Category } from '../../shared/interfaces/category/category';
import { CategoryService } from '../../shared/services/category.service';
import { ProjectResponse } from '../../shared/interfaces/project/project-response';
import { ProjectService } from '../../shared/services/project.service';
import { AnnouncementResponse } from '../../shared/interfaces/Announcement/announcement-response';
import { AnnouncementService } from '../../shared/services/announcement.service';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
})
export class LandingpageComponent implements OnInit {
  schemes: SchemeResponse[] = [];
  projects: ProjectResponse[] = [];
  categories: Category[] = [];
  currentImageIndex: { [schemeId: string]: number } = {};
  intervalMap: { [schemeId: string]: any } = {};
  currentIndexes: number[] = [];
  announcements: AnnouncementResponse[] = [];


  constructor(private schemeService: SchemeService, private router: Router,
    private categoryService: CategoryService, private projectService: ProjectService,
    private announcementService: AnnouncementService,
    private tokenService: TokenService
  ) { }

  isLoggin: boolean = false;

  ngOnInit(): void {

    const token = this.tokenService.getAccessToken();
    if (token) {
      if (this.tokenService.isTokenExpired()) {
        this.tokenService.clearTokens();
        this.isLoggin = false
      }
      else {
        this.isLoggin = true;
      }
    }
    else {
      this.isLoggin = false;
    }


    this.loadAnnouncements();
    this.loadSchemes();
    this.loadProjects();



    setInterval(() => this.autoSlideImages(), 4000); // Auto-slide every 4 sec
    this.loadCategories();
    this.currentIndexes = this.schemes.map(() => 0);
    this.startImageRotation(); // ✅ start image rotation

  }

  loadSchemes(): void {
    this.schemeService.getAllSchemesForPublic().subscribe({
      next: (response) => {
        this.schemes = response;
        this.schemes.forEach(s => this.currentImageIndex[s.id] = 0);
      },
      error: (err) => {
        console.error('Error fetching schemes:', err);
        alert(err?.error?.message || 'Something went wrong while fetching schemes.');
      }
    });
  }

  loadAnnouncements(): void {
    this.announcementService.getAllAnnouncementForPublic().subscribe({
      next: (response) => {
        this.announcements = response;
        console.log('IN LANDING PAGE AANOUNCEMENTS ===> ', this.announcements);
        this.announcements.forEach(s => this.currentImageIndex[s.id] = 0);
      },
      error: (err) => {
        console.error('Error fetching schemes:', err);
        alert(err?.error?.message || 'Something went wrong while fetching announcements.');
      }
    });
  }


  loadProjects(): void {
    this.projectService.getAllProjectsForPublic().subscribe({
      next: (response) => {
        this.projects = response;
        console.log('PROJECT RESPONSE ====>> ', response);
        this.currentIndexes = this.projects.map(() => 0);
        this.startImageRotation();
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
    const attachments = this.projects[projectIndex]?.attachmenets || [];
    const imageAttachments = attachments.filter(file => this.isImage(file));
    return imageAttachments[this.currentIndexes[projectIndex]] || 'assets/default-image.jpg';
  }


  isImage(filePath: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    const lowerPath = filePath.toLowerCase();
    return imageExtensions.some(ext => lowerPath.endsWith(ext));
  }



  loadCategories(): void {
    this.categoryService.getAllActiveCategory(true).subscribe({
      next: (response) => {
        this.categories = response;
        return;
      },
      error: (err) => {
        console.error('Error fetching schemes:', err);
        alert(err?.error?.message || 'Something went wrong while fetching Categories.');
      }
    });
  }

  prevImage(schemeId: string, total: number) {
    this.currentImageIndex[schemeId] = (this.currentImageIndex[schemeId] - 1 + total) % total;
  }

  nextImage(schemeId: string, total: number) {
    this.currentImageIndex[schemeId] = (this.currentImageIndex[schemeId] + 1) % total;
  }

  autoSlideImages() {
    this.schemes.forEach(scheme => {
      const total = scheme.attachments.length;
      this.nextImage(scheme.id, total);
    });
  }
  redirectToLogin() {
    this.router.navigate(['/login']); // Replace '/login' with your actual route
  }
}
