import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { PoButtonModule, PoDividerModule, PoDynamicFormField, PoDynamicModule, PoFieldModule, PoLoadingModule } from '@po-ui/ng-components';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { UserRequest } from '../../models/user-request.interface';
import { CommonModule } from '@angular/common';
import { LoadComponent } from '../../shared/load/load.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'create-user',
  standalone: true,
  imports: [
    PoDynamicModule,
    FormsModule, 
    ReactiveFormsModule, 
    PoButtonModule,
    PoDividerModule,
    PoFieldModule,
    PoLoadingModule,
    CommonModule,
    LoadComponent
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit, OnDestroy {
  
  @Output() onFormSucccess = new EventEmitter<boolean>();

  fields: PoDynamicFormField[] = [];
  formResponse!: NgForm;
  registerUserForm: FormGroup;
  loading: boolean = false;
  
  
  constructor(
    private _authService: AuthService
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
  }

  onFormSubmit() {
    this.loading = true;
    if(this.registerUserForm.valid) {
      const payload: UserRequest = this.createUserRequest();

      this._authService.userSingup(payload).subscribe({
        next: () => {
          this.registerUserForm.reset();
          this.loading = false;
          this.onFormSucccess.emit(true);
        },
        error: (error) => {
          console.error('Error submiting the form', error);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
    
  }

  passwordMatchvalidator(control: AbstractControl){
    return control.get('password')?.value === control.get('confirmPassword')?.value
    ? null
    : {mismatch: true}
  }

  createUserRequest(): UserRequest {
    return {
      email: this.registerUserForm.get('email')?.value.trim(),
      password: this.registerUserForm.get('password')?.value.trim(),
      firstName: this.registerUserForm.get('name')?.value.trim(),
      lastName: this.registerUserForm.get('lastName')?.value.trim()
    };
  }

  ngOnDestroy(): void {
    
  }
  

}
