import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export function ValidatePhone(control: AbstractControl): {[key: string]: any} | null  {
    if (control.value && control.value.length !== 10) {
        return { phoneNumberInvalid: true };
    }
    return null;
}

@Directive({
  selector: '[appPhoneValidateDirective]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: AppPhoneValidateDirective,
    multi: true
  }]
})
export class AppPhoneValidateDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} | null {
    return ValidatePhone(control);
  }
}
