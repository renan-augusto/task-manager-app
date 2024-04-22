import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { PoButtonModule, PoDividerModule, PoDynamicFormField, PoDynamicModule, PoFieldModule, PoHttpInterceptorModule, PoLoadingModule, PoModalModule, PoNotificationService } from '@po-ui/ng-components';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { UserRequest } from '../../../models/user-request.interface';
import { LoadComponent } from '../../load/load.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'create-user',
  standalone: true,
  imports: [
    PoDynamicModule,
    PoButtonModule,
    PoDividerModule,
    PoFieldModule,
    PoLoadingModule,
    LoadComponent,
    FormsModule,
    ReactiveFormsModule,
    PoModalModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit, OnDestroy {
  
  @Output() onFormSucccess = new EventEmitter<boolean>();

  fields: PoDynamicFormField[] = [];
  formResponse!: NgForm;
  registerUserForm: FormGroup;

  authSubscription?: Subscription
  
  constructor(
    public notification: PoNotificationService,
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
    if(this.registerUserForm.valid) {
      const payload: UserRequest = this.createUserRequest();

      this.authSubscription = this._authService.userSingnup(payload).subscribe({
        next: () => {
          this.registerUserForm.reset();
          this.onFormSucccess.emit(true);
        },
        error: (err) => {
          this.notification.error(err.error.message);
          console.error('Error submiting the form', err);
        }
      });
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
    if(this.authSubscription) {
      this.authSubscription?.unsubscribe();
    }
  }
  

}
