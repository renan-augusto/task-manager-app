import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoFieldModule, PoModalComponent, PoModalModule, PoTooltipModule } from '@po-ui/ng-components';
import { CreateUserComponent } from '../../modals/create-user/create-user.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    PoFieldModule, 
    PoButtonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    PoTooltipModule, 
    CreateUserComponent,
    PoModalModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild('createUserModal', { static: true}) createUserModal: PoModalComponent | null = null;

  login: string = '';
  password: string = '';
  minLength: number = 6;


  onSignUpClick() {
    this.createUserModal?.open();
  }

}
