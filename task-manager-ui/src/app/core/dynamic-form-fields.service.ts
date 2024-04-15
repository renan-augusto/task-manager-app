import { Injectable } from '@angular/core';
import { PoDynamicFormField } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormFieldsService {

  constructor() { }

  getDynamicFormFieldUsers(): PoDynamicFormField[] {
    return [
      {
        property: 'firstName',
        label: 'First Name',
        divider: 'Personal data',
        required: true,
        minLength: 3,
        gridColumns: 6,
        order: 1,
        placeholder: 'Enter your first name.'
      },
      {
        property: 'lastName',
        label: 'Second Name',
        required: true,
        minLength: 2,
        gridColumns: 6,
        order: 2,
        placeholder: 'Enter your last name'
      },
      {
        property: 'email',
        divider: 'Login data',
        required: true,
        type: 'email',
        gridColumns: 4,
        placeholder: 'Enter your e-mail'
      },
      {
        property: 'password',
        label: 'Password',
        placeholder: 'Type your password',
        minLength: 4,
        required: true,
        secret: true
      }

    ]
  }
}
