import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../../../shared/services/address.service';
import { Village } from '../../../shared/interfaces/address/village';
import { SarpanchRequest } from '../../../shared/interfaces/sarpanch/sarpanch-request';
import { SarpanchService } from '../../../shared/services/sarpanch.service';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { ErrorResponse } from '../../../shared/interfaces/error/error-response';
import { Router } from '@angular/router';
import { ComponentRoutes } from '../../../shared/utils/component-routes';
import { DeletedSarpanchService } from '../../../shared/services/deleted-sarpanch.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService } from '../../../shared/services/toast.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-sarpanch',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-sarpanch.component.html',
  styleUrls: ['./add-sarpanch.component.scss']
})
export class AddSarpanchComponent implements OnInit {
  sarpanchForm!: FormGroup;
  addresses: any[] = [];
  // selectedVillages: Village[] = []; // Now, TypeScript knows the type of this array
  selectedVillages: Village[] = [];
  isSubmitting: boolean = false;

  // ✅ Step 1: Add required variables in your component
  villagesDisabled: boolean = false;

  cities: string[] = [];


  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private sarpanchService: SarpanchService,
    private router: Router,
    private deletedSarpanchService: DeletedSarpanchService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAddresses();
    this.setupGramPanchayatWatcher(); // 👈 Add this line
  }


  // ✅ Step 2: Set up watcher for Gram Panchayat name change
  setupGramPanchayatWatcher(): void {
    this.sarpanchForm.get('gramPanchayatName')?.valueChanges.subscribe((name: string) => {
      if (name && name.length > 2) {
        this.fetchDeletedSarpanchByGramPanchayat(name);
      }
    });
  }

  // ✅ Step 3: Fetch data from backend if deleted sarpanch is found
  fetchDeletedSarpanchByGramPanchayat(gramPanchayatName: string): void {
    this.deletedSarpanchService.checkDeletedSarpanch(gramPanchayatName).subscribe((res: any) => {
      if (res.response) {
        console.log('RESPONSE => ', res.response.wardNumber)
        console.log('RESPONSE => ', res.response.villageSummaries)
        // Pre-fill data
        this.sarpanchForm.patchValue({
          wardNumber: res.response.wardNumber,
          villageIds: res.response.villageSummaries
        });
        // Disable inputs
        // this.sarpanchForm.get('wardNumber')?.disable();
        this.villagesDisabled = true;

        // Fill selected villages for display
        // this.selectedVillages = res.villageIds.map((id: string) => {
        //   const village = this.addresses.find(addr => addr.id === id);
        //   return village ? { id: village.id, formattedAddress: village.formattedAddress } : null;
        // }).filter(v => v !== null) as Village[];

        console.log('=====>>>> ', res.response.villageSummaries);
        this.selectedVillages = (res.response.villageSummaries ?? []).map((id: string) => {
          const village = this.addresses.find(addr => addr.id === id);
          console.log('VILLAGE => ', village);
          return village ? { id: village.id, formattedAddress: village.formattedAddress } : null;
        }).filter((v: Village | null): v is Village => v !== null);


        console.log('SELECTEDVILLAGES', this.selectedVillages);

      } else {
        // If no deleted sarpanch is found, ensure fields are enabled
        this.sarpanchForm.get('wardNumber')?.enable();
        this.villagesDisabled = false;
        this.selectedVillages = [];
      }
    });
  }

  isVillageAssigned(villageId: string): boolean {
    return this.selectedVillages.some(v => v.id === villageId);
  }





  initializeForm(): void {
    this.sarpanchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z\s]+$/)]],
      fatherOrHusbandName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(22), Validators.max(100)]],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      aadharNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      addressId: ['', Validators.required],
      houseNumber: ['', [Validators.pattern(/^[0-9]+$/), Validators.minLength(1), Validators.maxLength(50)]],
      gramPanchayatName: ['', Validators.required],
      wardNumber: ['', [Validators.pattern(/^[0-9]+$/)]],
      electionYear: [new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2100)]],
      termStartDate: ['', Validators.required],
      termEndDate: ['', Validators.required],
      villageIds: [[], [Validators.minLength(1)]], // Multiple villages assigned
    });
  }

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe(
      (data: any) => {
        this.addresses = data;
        console.log('ADDRESSES => ', this.addresses);
        // Extracting cities from formattedAddress
        this.cities = this.getUniqueCities(this.addresses);
        console.log('Unique Cities => ', this.cities);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching addresses:', error);
      }
    );
  }

  // Method to extract unique cities from address list
  getUniqueCities(addresses: any[]): string[] {
    const citySet = new Set<string>();

    addresses.forEach(address => {
      // Extract city name from formatted address (assuming city is between two commas)
      const city = this.extractCityFromAddress(address.formattedAddress);
      if (city) {
        citySet.add(city);
      }
    });

    // Convert set to array and return unique cities
    return Array.from(citySet);
  }

  // Method to extract city from formatted address (assuming a standard format)
  extractCityFromAddress(formattedAddress: string): string {
    const addressParts = formattedAddress.split(',');

    // Assuming city is the second part of the address
    if (addressParts.length > 2) {
      return addressParts[2].trim(); // Clean city name by trimming extra spaces
    }
    return '';
  }

  isFieldInvalid(field: string): boolean {
    const control = this.sarpanchForm.get(field);
    return !!control && control.invalid && control.touched;
  }


  addVillage(event: any): void {
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
    if (!this.selectedVillages.some(v => v.id === villageId)) {
      this.selectedVillages.push({ id: villageId, formattedAddress: villageName });
    }

    // After adding a village, validate the field (this is just a precautionary step)
    this.sarpanchForm.get('villageIds')?.setValue(this.selectedVillages.map(v => v.id));

    // Check if at least one village is selected, otherwise set error
    if (this.selectedVillages.length === 0) {
      this.sarpanchForm.get('villageIds')?.setErrors({ required: true });
    } else {
      this.sarpanchForm.get('villageIds')?.setErrors(null);
    }
  }

  removeVillage(villageId: string): void {
    // Remove the selected village by filtering out the id
    this.selectedVillages = this.selectedVillages.filter(v => v.id !== villageId);

    // After removing a village, check if there's at least one village selected
    if (this.selectedVillages.length === 0) {
      // Manually set the form control to invalid if no village is selected
      this.sarpanchForm.get('villageIds')?.setErrors({ required: true });
    } else {
      // If there's at least one village, clear the errors
      this.sarpanchForm.get('villageIds')?.setErrors(null);
    }

    // Update the form control value with the remaining village ids
    this.sarpanchForm.get('villageIds')?.setValue(this.selectedVillages.map(v => v.id));
  }

  getFormattedAddress(villageId: string): string {
    const address = this.addresses.find(address => address.id === villageId); // Find address by id (both strings)
    return address ? address.formattedAddress : 'Address not found'; // Return formatted address
  }


  submit(): void {
    if (this.sarpanchForm.valid) {
      const sarpanchData: SarpanchRequest = this.sarpanchForm.value;
      console.log("SARPANCH WHEN ADD => ", this.sarpanchForm.value);
      console.log("SARPANCH WHEN ADD => ", sarpanchData.villageIds);
      this.sarpanchService.addSarpanch(sarpanchData).subscribe({
        next: (res: ApiResponse) => {
          console.log('Sarpanch added:', res);
          // Show success message using ToastService
          this.toastService.showSuccess(res.message);
          this.sarpanchForm.reset();
          this.selectedVillages = [];
          this.router.navigate([ComponentRoutes.SARPANCH, ComponentRoutes.SARPANCHLIST]);
        },
        error: (err) => {
          console.error('Error:', err);
          // Show error message using ToastService
          this.toastService.showError(err.details || 'Something went wrong');
        }
      });
      // Handle your submission logic here
    } else {
      this.sarpanchForm.markAllAsTouched();
    }
  }

  cancel(): void {
    if (this.sarpanchForm.dirty) {
      // Confirm deletion and proceed if confirmed
      // Open the confirmation dialog
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Confirm Close',
          message: `You have unsaved changes. Are you sure you want to cancel?`
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate([ComponentRoutes.SARPANCH, ComponentRoutes.SARPANCHLIST]);
        }
      });

    } else {
      this.router.navigate([ComponentRoutes.SARPANCH, ComponentRoutes.SARPANCHLIST]);
    }
  }
}
