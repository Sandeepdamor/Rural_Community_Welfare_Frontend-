import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { AddressService } from '../../../shared/services/address.service';
import { Village } from '../../../shared/interfaces/address/village';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { ToastService } from '../../../shared/services/toast.service';
import { ComponentRoutes } from '../../../shared/utils/component-routes';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../shared/services/project.service';
import { AssignedSarpanch } from '../../../shared/interfaces/project/asignedproject-sarpanch';
import { ProjectResponse } from '../../../shared/interfaces/project/project-response';
import { ProjectProgress } from '../../../enums/project-progress.enum';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { map } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { AadharStatus } from '../../../enums/aadhar-status.enum';
import { AuthService } from '../../../shared/services/auth.service';
import { TokenService } from '../../../shared/services/token.service';
import { Role } from '../../../enums/role.enum';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent implements OnInit {
  @ViewChild('fileInput') fileInputRef!: ElementRef;

  projectForm!: FormGroup;
  locations: any[] = [];
  selectedLocations: Village[] = [];
  selectedFiles: File[] = [];
  isSubmitting: boolean = false;
  attachmentUrls: string[] = [];

  isViewerOpen = false;
  currentImageIndex = 0;

  projectDetails: Partial<ProjectResponse> = {
    progressStatus: '' as ProjectProgress, // or better, set a default like ProjectProgress.NOT_STARTED
    approvalStatus: '' as AadharStatus,
    createdBy: '',
    approvedBy: '',
    approvedDate: '',
    createdAt: '',
    updatedAt: ''
  };



  mode: 'add' | 'edit' | 'view' = 'add';
  projectId!: string;

  assignedSarpanchesDetails: {
    sarpanchName: string;
    gramPanchaytName: string; // Add gramPanchaytName
    assignedVillages: string;
  }[] = [];
  currentUser: any;
  Role = Role;
  role: Role;
  constructor(
    private location: Location,
    private addressService: AddressService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private sarpanchService: SarpanchService,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService

  ) { 
    const roleString = this.tokenService.getRoleFromToken(); // e.g., returns "ADMIN"
        this.role = roleString as Role; // ✅ safely assign enum
  }

  ngOnInit(): void {
    this.detectMode();
    this.initializeForm();
    // Fetch the logged-in user and then call fetchLocations()
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.fetchLocations();  // Now call fetchLocations after the user is fetched
      },
      error: (err) => {
        console.error('Error fetching logged-in user:', err);
        alert('Failed to load logged-in user.');
      }
    });

    if (this.mode !== 'add') {
      this.loadProjectById();
    }
  }

  detectMode(): void {
    const segments = this.router.url.split('/');
    const lastSegment = segments[segments.length - 1];
    if (lastSegment === 'view') {
      this.mode = 'view';
    } else if (lastSegment === 'edit') {
      this.mode = 'edit';
    } else {
      this.mode = 'add';
    }

    if (this.mode !== 'add') {
      this.projectId = this.route.snapshot.paramMap.get('id')!;
    }
  }


  initializeForm(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      locationIds: [[], Validators.required],
      budget: ['', Validators.required],
      startDate: ['', [Validators.required, CustomValidators.dateNotInPast()]],
      endDate: [
        '',
        [
          Validators.required,
          CustomValidators.dateNotInPast(),
          CustomValidators.endDateAfterStartDate('startDate'),
        ],
      ],
      attachments: [''],
    });
  }

  fetchLocations(): void {
    if (this.currentUser.role === 'ADMIN') {
      // Show all addresses
      this.addressService.getAddresses().subscribe({
        next: (data) => {
          this.locations = data;
          console.log('All addresses:', this.locations);
        },
        error: (error) => {
          console.error('Error fetching addresses:', error);
          alert(error.message);
        }
      });

    } else if (this.currentUser.role === 'SARPANCH') {
       // Show Sarpancch addresses
       this.addressService.getAddressesBySarpanchId(this.currentUser.id).subscribe({
        next: (data) => {
          this.locations = data;
          console.log('All addresses:', this.locations);
        },
        error: (error) => {
          console.error('Error fetching addresses:', error);
          alert(error.message);
        }
      });
    }
  }


  getFormattedLocations(locationId: string): string {
    const address = this.locations.find(location => location.id === locationId); // Find address by id (both strings)
    return address ? address.formattedAddress : 'Address not found'; // Return formatted address
  }

  // getFormattedLocations(location: any): string {
  //   if (this.currentUser.role === 'ADMIN') {
  //     const address = this.locations.find((loc: any) => loc.id === location.id);
  //     return address ? address.formattedAddress : 'Address not found';
  //   } else if (this.currentUser.role === 'SARPANCH') {
  //     console.log('LOCATION ===>> 123',location);
  //     const address = this.locations.find((loc: any) => loc.id === location.id || loc.id === location);
  //   return address ? address.formatAddress : 'Address not found';
  //   }
  //   return 'Invalid user role';
  // }
  

  get locationIds(): FormArray {
    return this.projectForm.get('locationIds') as FormArray;
  }

  addLocation(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    if (!selectElement || !selectElement.options) {
      console.error("Invalid select element or options.");
      return;
    }
    const selectedOption = selectElement.options[selectElement.selectedIndex]; // Get the selected option

    // Check if selectedOption is null or undefined
    if (!selectedOption) {
      console.error("No option selected.");
      return;
    }

    const villageId = selectedOption.value; // Get the value of the selected option
    const villageName = selectedOption.text; // Get the text of the selected option

    // Check if villageId and villageName are valid
    if (!villageId || !villageName) {
      console.error("Invalid village data.");
      return;
    }

    // Check if village is already selected by comparing the villageId
    if (!this.selectedLocations.some(v => v.id === villageId)) {
      this.selectedLocations.push({ id: villageId, formattedAddress: villageName });
    }

    // After adding a village, validate the field (this is just a precautionary step)
    this.projectForm.get('locationIds')?.setValue(this.selectedLocations.map(v => v.id));

  }

  removeLocation(villageId: string): void {
    // Remove the selected village by filtering out the id
    this.selectedLocations = this.selectedLocations.filter(v => v.id !== villageId);

    const locationControl = this.projectForm.get('locationIds');
    if (this.selectedLocations.length === 0) {
      locationControl?.setErrors({ required: true });
      locationControl?.markAsTouched(); // ✅ validation trigger karega
      return;
    }
    locationControl?.setValue(this.selectedLocations.map(v => v.id));
    locationControl?.setErrors(null);

  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.projectForm.get(fieldName);
    // Ensure the control exists and is valid
    return control ? control.invalid && control.touched : false;
  }



  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const alreadyAdded = this.selectedFiles.some(f => f.name === file.name && f.size === file.size);
        if (!alreadyAdded) {
          this.selectedFiles.push(file);
        }
      }
    }
  }

  removeAttachment(index: number): void {
    this.selectedFiles.splice(index, 1);
  }


  onSubmit(): void {
    if (this.isSubmitting || this.projectForm.invalid || this.mode === 'view') return;

    this.isSubmitting = true;
    const formValue = this.projectForm.value;
    const formData = new FormData();

    formData.append('name', formValue.name);
    formData.append('description', formValue.description);
    formData.append('budget', formValue.budget);
    formData.append('startDate', this.formatDateTime(formValue.startDate));
    formData.append('endDate', this.formatDateTime(formValue.endDate));

    formValue.locationIds.forEach((id: string) => {
      formData.append('locationIds', id);
    });

    this.selectedFiles.forEach((file: File) => {
      formData.append('attachments', file);
    });

    const request$ = this.mode === 'edit'
      ? this.projectService.updateProject(this.projectId, formData)
      : this.projectService.addProject(formData);

    request$.subscribe({
      next: (res: ApiResponse) => {
        this.toastService.showSuccess(res.message);
        this.router.navigate([ComponentRoutes.PROJECT, ComponentRoutes.PROJECTLIST]);
      },
      error: (err) => {
        console.error('Project save failed', err);
        this.toastService.showError(err.details);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
        this.projectForm.reset();
      }
    });
  }


  formatDateTime(date: string): string {
    // Converts "2025-05-01" -> "2025-05-01 00:00:00"
    return date + ' 00:00:00';
  }

  loadProjectById(): void {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        console.log('GET PROJECT BY ID ===> ', res);
        const project = res.response;

        // Patch basic project fields
        this.projectForm.patchValue({
          name: project.projectName,
          description: project.description,
          budget: project.budget,
          startDate: this.formatDateForInput(project.startDate),
          endDate: this.formatDateForInput(project.endDate),
        });
        this.attachmentUrls = project.attachmenets || [];
        console.log(' PROJECT ATTACHEMENTS ===> ', project.attachmenets);
        console.log('ATTACHEMENTS ===> ', this.attachmentUrls);


        // Extract locations from assigned sarpanches
        this.selectedLocations = (project.assignedSarpanches || []).flatMap((s: any) =>
          (s.locations || []).map((formattedAddress: string) => {
            const matched = this.locations.find(loc => loc.formattedAddress === formattedAddress);
            return matched ? { id: matched.id, formattedAddress } : null;
          }).filter((loc: Village | null): loc is Village => loc !== null)
        );



        // Handle view/edit mode
        if (this.mode === 'view') {
          // Fetch Sarpanch details for createdBy field

          this.userService.getUserById(project.createdBy).subscribe(res => {
            const role = res.response.role;
            console.log('GET USER BY ID => ', res.response);
            console.log('GET USER BY ID ROLE => ', res.response.role);
            if (role === 'ADMIN') {
              this.projectDetails.createdBy = role;

            }
            else if (role === 'SARPANCH') {
              this.sarpanchService.getSarpanchById(project.createdBy).subscribe(res => {
                const user = res.response;
                const name = user?.name || 'N/A';
                const fatherOrHusbandName = user?.fatherOrHusbandName || 'N/A';
                const gramPanchayatName = user?.gramPanchayatName || 'N/A';
                const role = 'Sarpanch';

                const createdByDetailsString = `${name} (${fatherOrHusbandName}), ${gramPanchayatName},${role}`;
                this.projectDetails.createdBy = createdByDetailsString;
                console.log('CREATED BY => ', this.projectDetails.createdBy);
                console.log('USer => ', user);
              });
            }
          });

          // Set other fields immediately
          this.projectDetails.approvalStatus = project.approvalStatus;
          this.projectDetails.progressStatus = project.progressStatus;
          this.projectDetails.approvedBy = project.approvedBy ? 'ADMIN' : 'Not Approved';
          this.projectDetails.approvedDate = project.approvedDate;
          this.projectDetails.createdAt = project.createdAt;
          this.projectDetails.updatedAt = project.updatedAt;

          this.projectForm.get('locationIds')?.disable();
          this.projectForm.disable();
          this.displayAssignedSarpanches(project.assignedSarpanches);
        } else {
          this.projectForm.get('locationIds')?.enable();
          const selectedIds = this.selectedLocations.map(loc => loc.id);
          this.projectForm.patchValue({
            locationIds: selectedIds,
          });
        }
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.toastService.showError('Project load failed.');
      }
    });
  }

  // ✅ Updated method to format assigned village addresses as a single string using '|'
  // Method to display assigned Sarpanch details in view mode
  displayAssignedSarpanches(assignedSarpanches: AssignedSarpanch[]): void {
    console.log('111111111111 ==> ', assignedSarpanches);

    this.assignedSarpanchesDetails = assignedSarpanches.map((s) => {
      let formattedVillages = 'No villages assigned';

      if (Array.isArray(s.assignedVillage) && s.assignedVillage.length > 0) {
        // Assuming each village has a 'formattedAddress' property
        console.log('1---------------------------1 ', s.assignedVillage);
        formattedVillages = s.assignedVillage
          .map((v: Village) => v) // Access the 'formattedAddress' field here
          .join(' | ');  // Join with ' | '
      }

      return {
        sarpanchName: s.sarpanchName,
        gramPanchaytName: s.gramPanchayatName ?? 'N/A',
        assignedVillages: formattedVillages
      };
    });

    console.log('Assigned Sarpanches for view:', this.assignedSarpanchesDetails);
  }




  openImageViewer(index: number): void {
    this.currentImageIndex = index;
    this.isViewerOpen = true;
  }

  closeImageViewer(): void {
    this.isViewerOpen = false;
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.attachmentUrls.length - 1) {
      this.currentImageIndex++;
    }
  }

  // Check if the file is an image
  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }

  // Check if the file is PDF
  isPdf(url: string): boolean {
    return /\.(pdf)$/i.test(url);
  }

  // Get file name from URL
  getFileName(url: string): string {
    return url.split('/').pop() || 'Unknown File';
  }



  formatDateForInput(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0]; // returns '2025-05-10'
  }

  goBack(): void {
    this.location.back();
  }
}
