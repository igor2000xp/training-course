import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const longEnough = value.length >= 8;
    const hasBothCases = /([a-z].*[A-Z])|([A-Z].*[a-z])/.test(value);
    const hasDigitsAndLetters = /(?=.*[A-Za-z])(?=.*\d)/.test(value);
    const hasSpecialChars = /.[@$!%*#?&]/.test(value);

    if (!longEnough) {
      return { passRec: 'at least 8 characters' };
    }

    if (!hasBothCases) {
      return { passRec: 'at least 1 uppercase and 1 lowercase letter' };
    }

    if (!hasDigitsAndLetters) {
      return { passRec: 'at least 1 number' };
    }

    if (!hasSpecialChars) {
      return { passRec: 'at least one special character, e.g., ! @ # ?' };
    }

    return null;
  };
}
