import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }
      console.log(passwordControl.value + '---' + confirmPasswordControl.value);

      if (passwordControl.value !== confirmPasswordControl.value) {
        console.log('not');
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        console.log('match');
        confirmPasswordControl.setErrors({ passwordMismatch: false });
        console.log(confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch);
      }
    };
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    const UserList = ['raj', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }
}

// https://www.freecodecamp.org/news/how-to-validate-angular-template-driven-forms/

