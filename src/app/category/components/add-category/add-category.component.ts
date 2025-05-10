import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { ToastService } from '../../../shared/services/toast.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Router } from '@angular/router';
import { ComponentRoutes } from '../../../shared/utils/component-routes';

@Component({
  selector: 'app-add-category',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private toastService: ToastService,
    private categoryService: CategoryService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.categoryForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  submit(): void {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      console.log('Saving category:', categoryData);
      this.categoryService.addCategory(categoryData).subscribe({
        next: (res: ApiResponse) => {
          console.log('CATEGORY added:', res);
          // Show success message using ToastService
          this.toastService.showSuccess(res.message);
          this.categoryForm.reset();

          this.router.navigate([ComponentRoutes.CATEGORY, ComponentRoutes.CATEGORYLIST]);
        },
        error: (err) => {
          console.error('Error:', err);
          // Show error message using ToastService
          this.toastService.showError(err.details || 'Something went wrong');
        }
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.categoryForm.reset();
    this.router.navigate([ComponentRoutes.CATEGORY, ComponentRoutes.CATEGORYLIST]);
  }

  goBack(): void {
    this.location.back();
  }
}
