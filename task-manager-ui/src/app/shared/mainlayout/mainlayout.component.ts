import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mainlayout',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    RouterOutlet
  ],
  templateUrl: './mainlayout.component.html',
  styleUrl: './mainlayout.component.scss'
})
export class MainlayoutComponent {

}
