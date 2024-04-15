import { Component, EventEmitter, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { PoButtonModule, PoDividerModule, PoDynamicFormField, PoDynamicModule, PoFieldModule } from '@po-ui/ng-components';
import { DynamicFormFieldsService } from '../../core/dynamic-form-fields.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { UserRequest } from '../../models/user-request.interface';

@Component({
  selector: 'create-user',
  standalone: true,
  imports: [
    PoDynamicModule,
    FormsModule, 
    ReactiveFormsModule, 
    PoButtonModule,
    PoDividerModule,
    PoFieldModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit, OnDestroy {
  
  @Output() formResult = new EventEmitter<NgForm>();

  fields: PoDynamicFormField[] = [];
  formResponse!: NgForm;
  registerUserForm!: FormGroup;
  loading = signal(false);
  
  
  constructor(
    private _formService: DynamicFormFieldsService,
    private _auth: AuthService
  ) {
    this.registerUserForm = new FormGroup(
      {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]),
      }, 
      {
        validators: this.passwordMatchvalidator,
      }
    );
  }

  ngOnInit(): void {
    this.fields = this._formService.getDynamicFormFieldUsers();
  }

  onFormChange(event: NgForm) {
    this.formResponse = event;
  }

  onFormSubmit() {
    this.loading.set(true)
    if(this.registerUserForm.valid) {
      const payload: UserRequest = this.createUserRequest();
    }
    
  }

  passwordMatchvalidator(control: AbstractControl){
    return control.get('password')?.value === control.get('confirmPassword')?.value
    ? null
    : {mismatch: true}
  }

  createUserRequest(): UserRequest {
    return {
      email: this.registerUserForm.get('email')?.value,
      password: this.registerUserForm.get('password')?.value,
      firstName: this.registerUserForm.get('name')?.value,
      lastName: this.registerUserForm.get('lastName')?.value
    };
  }

  ngOnDestroy(): void {
    
  }
  

}
