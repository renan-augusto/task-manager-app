import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoButtonModule, PoFieldModule, PoInterceptorsModule, PoModalComponent, PoModalModule, PoNotificationModule, PoNotificationService, PoTooltipModule } from '@po-ui/ng-components';
import { CreateUserComponent } from '../../shared/modals/create-user/create-user.component';
import { IUserAuthRequest } from '../../models/user-auth-request.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { MenuComponent } from '../../shared/menu/menu.component';
import { Router } from '@angular/router';

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
    MenuComponent
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
    private _authService: AuthService,
    private _router: Router,
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
      const payload: IUserAuthRequest = this.createAuthRequest();

      this.loginSubscription = this._authService.userSignin(payload).subscribe({
        next: (res) => {
          window.localStorage.setItem('token', res.access_token);
          window.localStorage.setItem('id_user', res.id.toString());
          this._router.navigate(['']);
          this.notification.success('Bem vindo!');
          this.userLoginForm.reset();
        },
        error: (err) => {
          if(err.error.message) {
            this.notification.error(err.error.message);
          } else {
            this.notification.error('Server error')
          }
          console.error('Login error', err);
        }
      })

    }
  }

  onFormSuccess(event: boolean) {
    if(event == true) {
      this.notification.success('Usuário cadastrado!');
      return this.createUserModal?.close();
    } else {
      return
    }
  }

  createAuthRequest(): IUserAuthRequest {
    return {
      email: this.userLoginForm.get('email')?.value.trim(),
      password: this.userLoginForm.get('password')?.value.trim()
    }
  }

  ngOnDestroy(): void {
    if(this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
