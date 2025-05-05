import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  // ✅ Start Date and End Date should not be in the past
  static dateNotInPast(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // ignore time
      return selectedDate < today ? { dateInPast: true } : null;
    };
  }

  // ✅ End Date should not be before Start Date
  static endDateAfterStartDate(startField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent;
      if (!formGroup) return null;

      const startControl = formGroup.get(startField);
      if (!startControl || !control.value || !startControl.value) return null;

      const startDate = new Date(startControl.value);
      const endDate = new Date(control.value);

      return endDate < startDate ? { endBeforeStart: true } : null;
    };
  }
}
