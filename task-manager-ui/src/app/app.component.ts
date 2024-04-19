import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadComponent } from './shared/load/load.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoadComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager-ui';
}
