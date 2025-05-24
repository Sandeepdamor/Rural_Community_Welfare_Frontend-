import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../shared/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrievanceService } from '../../../shared/services/grievanceService';
import { Role } from '../../../enums/role.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-grievance-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './grievance-update.component.html',
  styleUrl: './grievance-update.component.scss',
})
export class GrievanceUpdateComponent {
  selectedStatus: string = '';
  role: Role;
  statusList: string[] = [];
  originalStatus: string = '';
  grievance: any = {
    id: '',
    response: '',
    status: '',
    subject: '',
    description: '',
  };

  constructor(
    private changeDetection: ChangeDetectorRef,
    private grievanceService: GrievanceService,
    private snackBar: MatSnackBar,
    private router: Router, // Keep this for navigation
    private route: ActivatedRoute, // Add ActivatedRoute for route params
    private tokenService: TokenService,
    private location: Location
  ) {
    const roleStr = tokenService.getRoleFromToken();
    this.role = roleStr as Role;
  }
  ngOnInit(): void {
    this.initializeStatusList();
    this.loadGrievanceDetails();
  }

  private initializeStatusList(): void {
    const privilegedRoles = ['ADMIN', 'SARPANCH'];

    this.statusList = privilegedRoles.includes(this.role)
      ? ['FORWARDED', 'REJECTED', 'ACCEPTED', 'IN_PROGRESS', 'RESOLVED']
      : [
          'PENDING',
          'FORWARDED',
          'REJECTED',
          'ACCEPTED',
          'IN_PROGRESS',
          'RESOLVED',
        ];
  }

  private loadGrievanceDetails(): void {
    this.route.params.subscribe((params) => {
      const grievanceId = params['id'];
      this.grievance.id = grievanceId;

      this.grievanceService
        .getGrievanceById(grievanceId)
        .subscribe((response) => {
          const grievanceData = response.response;

          this.grievance = {
            ...grievanceData,
            id: grievanceId,
            response: grievanceData.response || '',
            status: grievanceData.status || '',
            description: grievanceData.description || '',
            subject: grievanceData.subject || '',
          };

          this.originalStatus = this.grievance.status;

          // ✅ Log to debug
          console.log('Resident role check:--------', this.role);
          console.log('Grievance loaded:---------', this.grievance);
        });
    });
  }

  updateGrievance(): void {
    if (!this.grievance.id) {
      console.warn('Missing grievance ID');
      return;
    }

    if (
      this.originalStatus === 'RESOLVED' &&
      this.grievance.status !== 'RESOLVED'
    ) {
      alert('Cannot change status after it is resolved.');
      return;
    }

    const isPrivilegedUser = this.role === 'ADMIN' || this.role === 'SARPANCH';
    const updateObservable = isPrivilegedUser
      ? this.grievanceService.updateGrievance(this.grievance)
      : this.grievanceService.updateGrievance1(this.grievance);

    updateObservable.subscribe({
      next: () => {
        alert('Grievance updated successfully');
        this.router.navigate(['/grievance/grievance-list']);
      },
      error: (err) => {
        console.error('Update failed:', err);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
