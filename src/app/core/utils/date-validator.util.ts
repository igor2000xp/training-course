import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const date = new Date(control.value).valueOf();
    const now = new Date().valueOf();

    if (!date || date > now) {
      return { date: true };
    }

    return null;
  };
}
