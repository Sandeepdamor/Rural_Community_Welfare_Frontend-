import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../shared/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrievanceService } from '../../../shared/services/grievanceService';
import { Role } from '../../../enums/role.enum';

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

  constructor(
    private changeDetection: ChangeDetectorRef,
    private grievanceService: GrievanceService,
    private snackBar: MatSnackBar,
    private router: Router, // Keep this for navigation
    private route: ActivatedRoute, // Add ActivatedRoute for route params
    private tokenService: TokenService
  ) {
    const roleStr = tokenService.getRoleFromToken();
    this.role = roleStr as Role;
  }

  // statusList: string[] = [
  //   'PENDING',
  //   'FORWARDED',
  //   'REJECTED',
  //   'ACCEPTED',
  //   'IN_PROGRESS',
  //   'RESOLVED',
  // ];

  // statusList1: string[] = [
  //   'FORWARDED',
  //   'REJECTED',
  //   'ACCEPTED',
  //   'IN_PROGRESS',
  //   'RESOLVED',
  // ];

  grievance = {
    id: '', // Make sure to set this from route or selected grievance
    response: '',
    status: '',
  };

  ngOnInit(): void {
    // Assign status list based on user role
    if (this.role === 'ADMIN' || this.role === 'SARPANCH') {
      this.statusList = [
        'FORWARDED',
        'REJECTED',
        'ACCEPTED',
        'IN_PROGRESS',
        'RESOLVED',
      ];
    } else {
      this.statusList = [
        'PENDING',
        'FORWARDED',
        'REJECTED',
        'ACCEPTED',
        'IN_PROGRESS',
        'RESOLVED',
      ];
    }

    // Subscribe to route params and get 'id'
    this.route.params.subscribe((params) => {
      this.grievance.id = params['id']; // Access the ID from the route
      console.log('Grievance ID:', this.grievance.id); // Debugging
    });
  }

  updateGrievance() {
    if (!this.grievance.id) {
      console.warn('Missing grievance ID');
      return;
    }

    this.grievanceService.updateGrievance(this.grievance).subscribe({
      next: () => {
        alert('Grievance updated successfully');
      },
      error: (err) => {
        console.error('Update failed:', err);
      },
    });
  }
}
