import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoButtonModule, PoFieldModule, PoModalComponent, PoModalModule, PoNotificationModule, PoNotificationService, PoTooltipModule } from '@po-ui/ng-components';
import { CreateUserComponent } from '../../modals/create-user/create-user.component';
import { UserAuthRequest } from '../../models/user-auth-request.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    CreateUserComponent,
    PoFieldModule,
    PoButtonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    PoTooltipModule, 
    PoModalModule,
    PoNotificationModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('createUserModal', { static: true}) createUserModal: PoModalComponent | null = null;

  login: string = '';
  password: string = '';
  minLength: number = 6;
  userLoginForm: FormGroup;
  loginSubscription?: Subscription;

  constructor(
    public notification: PoNotificationService,
    private _authService: AuthService
  ) {
    this.userLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.login = '';
    this.password = '';
  }

  onSignUpClick() {
    this.createUserModal?.open();
  }

  onSignInClick() {
    if(this.userLoginForm.valid) {
      const payload: UserAuthRequest = this.createAuthRequest();

      this.loginSubscription = this._authService.userSignin(payload).subscribe({
        next: () => {
          this.notification.success('User logged in');
          this.userLoginForm.reset();
        },
        error: (error) => {
          console.error('Login error', error);
        }
      })

    }
  }

  onFormSuccess(event: boolean) {
    if(event == true) {
      this.notification.success('User created!');
      return this.createUserModal?.close();
    } else {
      return
    }
  }

  createAuthRequest(): UserAuthRequest {
    return {
      email: this.userLoginForm.get('email')?.value.trim(),
      password: this.userLoginForm.get('password')?.value.trim()
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
