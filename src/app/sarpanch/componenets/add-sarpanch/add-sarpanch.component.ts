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
  errorMessage:string='';

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private sarpanchService: SarpanchService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAddresses();
  }

  initializeForm(): void {
    this.sarpanchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z\s]+$/)]],
      fatherOrHusbandName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(22), Validators.max(100)]],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]],
      aadharNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      addressId: ['', Validators.required],
      houseNumber: ['', [Validators.pattern(/^[0-9]+$/), Validators.minLength(1), Validators.maxLength(50)]],
      gramPanchayatName: ['', Validators.required],
      wardNumber: ['', Validators.pattern(/^[0-9]+$/)],
      electionYear: [new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2100)]],
      termStartDate: ['', Validators.required],
      termEndDate: ['', Validators.required],
      villageIds: [[], [Validators.required, Validators.minLength(1)]], // Multiple villages assigned
    });
  }

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe(
      (data: any) => {
        this.addresses = data;
        console.log('ADDRESSES => ', this.addresses);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching addresses:', error);
      }
    );
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
      console.log("SARPANCH WHEN ADD => ", sarpanchData);
      console.log("SARPANCH WHEN ADD => ", sarpanchData.villageIds);
      this.sarpanchService.addSarpanch(sarpanchData).subscribe({
        next: (res: ApiResponse) => {
          console.log('Sarpanch added:', res);
          this.errorMessage='';
          alert(res.message);
          // Optionally use res.response (e.g. to get saved Sarpanch details)
          this.sarpanchForm.reset();
          this.selectedVillages = [];
        },
        error: (err: ErrorResponse) => {
          console.error('Error:', err);
          this.errorMessage=err.details;
          // Show the backend error message and details
          alert(`${err.details}`);
        }
      });
      // Handle your submission logic here
    } else {
      this.sarpanchForm.markAllAsTouched();
    }
  }
}
