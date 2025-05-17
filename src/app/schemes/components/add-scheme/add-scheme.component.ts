import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { SchemeService } from '../../../shared/services/scheme.service';
import { CategoryResponse } from '../../../shared/interfaces/category/category-response';
import { CommonModule, Location } from '@angular/common';
import { ComponentRoutes } from '../../../shared/utils/component-routes';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { ToastService } from '../../../shared/services/toast.service';
import { UserService } from '../../../shared/services/user.service';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { SchemeResponse } from '../../../shared/interfaces/scheme/scheme-response';
import { Role } from '../../../enums/role.enum';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-add-scheme',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-scheme.component.html',
  styleUrl: './add-scheme.component.scss'
})
export class AddSchemeComponent implements OnInit {
  schemeForm!: FormGroup;
  categories: CategoryResponse[] = [];
  selectedFiles: File[] = [];
  isSubmitting = false;
  mode: 'add' | 'edit' | 'view' = 'add';
  schemeId!: string;
  attachmentUrls: string[] = [];
  isViewerOpen = false;
  currentImageIndex = 0;

  currentUser: any;
  Role = Role;
  role: Role;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private schemeService: SchemeService,
    private router: Router,
    private location: Location,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private userService: UserService,
    private sarpanchService: SarpanchService,
    private tokenService: TokenService
  ) {
    const roleString = this.tokenService.getRoleFromToken();
    this.role = roleString as Role;
  }

  schemeDetails: Partial<SchemeResponse> = {
    category: '',
    createdBy: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    isActive: null
  };

  ngOnInit(): void {

    this.detectMode();
    this.initForm();
    this.loadCategories();
    if (this.mode !== 'add') {
      this.loadSchemeById();
    }
  }

  detectMode(): void {
    const routeData = this.route.snapshot.data;
    if (routeData && routeData['mode']) {
      this.mode = routeData['mode'];
    } else {
      const lastSegment = this.router.url.split('/').pop();
      this.mode = lastSegment === 'view' ? 'view' : lastSegment === 'edit' ? 'edit' : 'add';
    }

    if (this.mode !== 'add') {
      this.schemeId = this.route.snapshot.paramMap.get('id')!;
    }
  }

  initForm(): void {
    this.schemeForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      criteria: ['', Validators.required],
      process: ['', Validators.required],
      benefits: ['', Validators.required],
      status: ['', Validators.required],
      attachments: []
    });

    if (this.mode === 'view') {
      this.schemeForm.disable();
    }
  }

  loadCategories(): void {
    this.categoryService.getAllActiveCategory(true).subscribe({
      next: (res: any) => (this.categories = res),
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.schemeForm.invalid) return;

    this.isSubmitting = true;
    const formData = new FormData();

    if (this.mode === 'edit') {
      this.attachmentUrls.forEach(url => {
        formData.append('existingAttachmentUrls', url);  // ✅ separate field
      });
    }
    this.selectedFiles.forEach(file => {
      formData.append('attachments', file);             // ✅ only new files
    });


    // ✅ Add all form data including disabled fields
    if (this.mode === 'edit') {
      const allValues = this.schemeForm.getRawValue();
      Object.entries(allValues).forEach(([key, value]) => {
        if (key !== 'attachments' && value !== null && value !== undefined) {
          console.log('FORM DATA ON UPDATE TIME ==> ', key, ' : ', value);
          formData.append(key, typeof value === 'string' ? value.trim() : String(value));
        }
      });
    }
    if (this.mode === 'add') {
      Object.entries(this.schemeForm.value).forEach(([key, value]) =>
        formData.append(key, value as string)
      );
    }

    console.log('FORMA DATA ===> ');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }


    // Handle submission
    const submitObs = this.mode === 'edit'
      ? this.schemeService.updateScheme(this.schemeId, formData)
      : this.schemeService.addScheme(formData);

    submitObs.subscribe({
      next: (res: ApiResponse) => {
        this.toastService.showSuccess(res.message);
        this.isSubmitting = false;
        this.attachmentUrls = [];
        this.selectedFiles = [];
        this.router.navigate([ComponentRoutes.SCHEMES, ComponentRoutes.SCHEMESLIST]);
      },
      error: (err) => {
        console.error(err);
        this.toastService.showError(err.details || err.error.message || 'Submission failed');
        this.isSubmitting = false;
      }
    });
  }

   isFieldRequired(fieldName: string): boolean {
      // Replace with your form control logic to check if the field is required
      return this.schemeForm.get(fieldName)?.hasValidator(Validators.required) ?? false;
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

  removeExistAttachment(index: number): void {
    this.attachmentUrls.splice(index, 1);
  }


  loadSchemeById(): void {
    this.schemeService.getSchemeById(this.schemeId).subscribe({
      next: (res) => {
        const scheme = res.response;

        console.log('SCHEME BY ID ===>> 123 ', res.response);
        this.patchSchemeForm(scheme);
        this.setSchemeDetails(scheme);
      },
      error: (err) => {
        console.error('Error loading scheme:', err);
        this.toastService.showError('Failed to load scheme');
      }
    });
  }

  patchSchemeForm(scheme: any): void {
    this.schemeForm.patchValue({
      name: scheme.name,
      criteria: scheme.criteria,
      process: scheme.process,
      benefits: scheme.benefits,
      categoryId: scheme.category,
      status: scheme.status
    });

    // Set existing attachment URLs
    this.attachmentUrls = scheme.attachments || [];

    if (this.mode === 'view') {
      this.schemeForm.disable();
    }

    if (this.mode === 'edit') {
      this.schemeForm.disable(); // Disable the form fields for edit mode

      // Enable only the required fields for editing
      this.schemeForm.get('criteria')?.enable();
      this.schemeForm.get('process')?.enable();
      this.schemeForm.get('benefits')?.enable();
    }
  }


  setSchemeDetails(scheme: any): void {
    const createdById = scheme.createdBy;

    if (createdById) {
      this.userService.getUserById(createdById).subscribe(userRes => {
        const user = userRes.response;
        console.log('GET SCHEME BY ID ROLE => ', userRes.response.role);
        if (user.role === 'ADMIN') {
          this.schemeDetails.createdBy = user.role;
        } else if (user.role === 'SARPANCH') {
          this.sarpanchService.getSarpanchById(createdById).subscribe(sarpanchRes => {
            console.log("SARPANCH RESPONSE IN SCHEME => ", sarpanchRes);
            const sarpanch = sarpanchRes.response;
            this.schemeDetails.createdBy = `${sarpanch.name || 'N/A'} (${sarpanch.fatherOrHusbandName || 'N/A'}), ${sarpanch.gramPanchayatName || 'N/A'}, Sarpanch`;
          });
        }
      });
    }

    this.schemeDetails.createdAt = scheme.createdAt;
    this.schemeDetails.updatedAt = scheme.updatedAt;
    this.schemeDetails.isActive = scheme.isActive;
    this.schemeDetails.status = scheme.status;
    this.schemeDetails.category = scheme.category;

    console.log('SCHEME DETAILS ==> ', this.schemeDetails);
  }

  // Viewers and utility methods
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

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }

  isPdf(url: string): boolean {
    return /\.pdf$/i.test(url);
  }

  getFileName(url: string): string {
    return url.split('/').pop() || 'Unknown File';
  }

  onCancel(): void {
    this.schemeForm.reset();
    this.selectedFiles = [];
    this.router.navigate([ComponentRoutes.SCHEMES, ComponentRoutes.SCHEMESLIST]);
  }

  goBack(): void {
    this.location.back();
  }
}