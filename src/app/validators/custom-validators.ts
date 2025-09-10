import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

// ✅ Example 1: No spaces allowed
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return (control.value as string).includes(' ')
      ? { noSpaces: true }
      : null;
  };
}

// ✅ Example 2: Minimum age validator
export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const age = Number(control.value);
    return age < minAge ? { minAge: { required: minAge, actual: age } } : null;
  };
}

// ✅ Example 3: Async validator (simulate API check for username availability)
export function usernameTakenValidator() {
  const taken = ['admin', 'test', 'user'];
  return (control: AbstractControl) => {
    return of(
      taken.includes(control.value) ? { usernameTaken: true } : null
    ).pipe(delay(1000));
  };
}
