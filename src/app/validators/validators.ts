import { FormGroup,  FormControl, AbstractControl, ValidatorFn, Validators } from '@angular/forms';


// SINGLE FIELD VALIDATORS
export function emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}

// FORM GROUP VALIDATORS
export function validatePasswordConfirmation(control: FormGroup): any {
  if(this.myForm) {
    return control.value === this.myForm.get('password').value ? null : { notConciden: true}
  }
}


