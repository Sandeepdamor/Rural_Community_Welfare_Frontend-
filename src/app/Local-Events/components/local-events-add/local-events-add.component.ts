import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalEventsService } from '../../../shared/services/local-events';
import { Village } from '../../../shared/interfaces/address/village';
import { AddressService } from '../../../shared/services/address.service';
import { Role } from '../../../enums/role.enum';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-local-events-add',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './local-events-add.component.html',
  styleUrl: './local-events-add.component.scss',
})
export class LocalEventsAddComponent {
  localEventForm!: FormGroup;
  isReadOnly = false;
  mode: string | null = null; // To track view/add/update mode
  grievanceId: string | null = null; // To store the ID if in update/view mode
  selectedFiles: File[] = [];
  selectedLocationId: number | null = null;
  showFilters: boolean = false;
  isLoading: boolean = false;

  locations: any[] = [];
  selectedLocations: Village[] = [];

  isSubmitting: boolean = false;
  attachmentUrls: string[] = [];

  assignedSarpanchesDetails: {
    sarpanchName: string;
    gramPanchaytName: string; // Add gramPanchaytName
    assignedVillages: string;
  }[] = [];
  currentUser: any;
  Role = Role;
  role: Role;

  constructor(
    private fb: FormBuilder,
    private localEventsService: LocalEventsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
    private addressService: AddressService,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
    this.role = roleString as Role; // ✅ safely assign enum
  }

  ngOnInit(): void {
    this.dateInit();
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.fetchLocations(); // Now call fetchLocations after the user is fetched
      },
      error: (err) => {
        console.error('Error fetching logged-in user:', err);
        alert('Failed to load logged-in user.');
      },
    });

    this.localEventForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      locationId: [null, Validators.required], //  Add this line
      attachments: [[]],
    });
    this.fetchLocations();
  }

  today: string = '';

  dateInit() {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }

  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;

    if (start && end && new Date(start) > new Date(end)) {
      return { dateRangeInvalid: true };
    }
    return null;
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.localEventForm.valid) {
      console.log(' ==============>>> ', this.localEventForm.value.name);
      console.log(
        'Selected Location ID:',
        this.localEventForm.value.locationId
      );
      const formData = new FormData();
      formData.append('name', this.localEventForm.value.name);
      formData.append('description', this.localEventForm.value.description);
      formData.append('startDate', this.localEventForm.value.startDate);
      formData.append('endDate', this.localEventForm.value.endDate);
      formData.append('locationId', this.localEventForm.value.locationId);

      console.log(
        '------------------------------------',
        formData.get('location')
      );

      // Add form fields
      Object.entries(this.localEventForm.value).forEach(([key, value]) => {
        if (key === 'attachments') {
          this.selectedFiles.forEach((file: File) => {
            formData.append('attachments', file);
          });
        } else {
          // formData.append(key, value);
        }
      });

      console.log('--- FormData Content ---');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      this.localEventsService.addlocalEvent(formData).subscribe({
        next: (res: any) => {
          console.log('Successfully submitted:', res);
          this.snackBar.open('Event submitted successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-success'],
          });
          this.localEventForm.reset(); // Optional: reset form
          this.selectedFiles = []; // Clear files
          setTimeout(() => {
            this.router.navigate(['/local-Events/Local-Events-list']);
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error submitting event:', err.message);
          this.snackBar.open(
            'Failed to submit event. Please try again.',
            'Close',
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar-error'],
            }
          );
        },
      });
    } else {
      console.log('Form is invalid');
      Object.keys(this.localEventForm.controls).forEach((controlName) => {
        const control = this.localEventForm.get(controlName);
        if (control?.invalid) {
          console.warn(`${controlName} is invalid`, control.errors);
          control.markAsTouched(); // Trigger validation UI
        }
      });
    }
  }

  removeAttachment(index: number): void {
    console.log('Removing file at index:------', index); // Debug the index being removed
    this.selectedFiles.splice(index, 1);
    console.log('Updated Files List:-----', this.selectedFiles); // Check the updated list
  }

  // Handle file input change and add selected files
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    console.log('Selected Files:------', files); // Debugging the selected file
    if (files.length > 0) {
      console.log('Adding file:------', files); // Log each file being added
      this.selectedFiles = Array.from(files); // Store selected files in an array
    }
  }

  addLocation(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    if (!selectElement || !selectElement.options) {
      console.error('Invalid select element or options.');
      return;
    }
    const selectedOption = selectElement.options[selectElement.selectedIndex]; // Get the selected option

    // Check if selectedOption is null or undefined
    if (!selectedOption) {
      console.error('No option selected.');
      return;
    }

    const villageId = selectedOption.value; // Get the value of the selected option
    const villageName = selectedOption.text; // Get the text of the selected option

    // Check if villageId and villageName are valid
    if (!villageId || !villageName) {
      console.error('Invalid village data.');
      return;
    }

    // Check if village is already selected by comparing the villageId
    if (!this.selectedLocations.some((v) => v.id === villageId)) {
      this.selectedLocations.push({
        id: villageId,
        formattedAddress: villageName,
      });
    }

    // After adding a village, validate the field (this is just a precautionary step)
    // this.projectForm.get('locationIds')?.setValue(this.selectedLocations.map(v => v.id));
  }

  fetchLocations(): void {
    console.log(' LOGGED IN USER ROLE =====>> ', this.role);
    if (this.role === 'ADMIN') {
      // Show all addresses
      this.addressService.getAddresses().subscribe({
        next: (data) => {
          this.locations = data;
          console.log(
            ' ///////////////////////// All addresses:',
            this.locations
          );
        },
        error: (error) => {
          console.error('Error fetching addresses:', error);
          alert(error.message);
        },
      });
    } else if (this.role === 'SARPANCH') {
      // Show Sarpancch addresses
      this.addressService
        .getAddressesBySarpanchId(this.currentUser.id)
        .subscribe({
          next: (data) => {
            this.locations = data;
            console.log('All addresses:', this.locations);
          },
          error: (error) => {
            console.error('Error fetching addresses:', error);
            alert(error.message);
          },
        });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    //const control = this.projectForm.get(fieldName);
    // Ensure the control exists and is valid
    return false;
    //  return control ? control.invalid && control.touched : false;
  }

  getFormattedLocations(locationId: string): string {
    const address = this.locations.find(
      (location) => location.id === locationId
    ); // Find address by id (both strings)
    return address ? address.formattedAddress : 'Address not found'; // Return formatted address
  }

  removeLocation(villageId: string): void {}
  goBack(): void {
    this.location.back();
  }
}
