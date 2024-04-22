import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../core/loader.service';
import { PoLoadingModule } from '@po-ui/ng-components';


@Component({
  selector: 'app-load',
  standalone: true,
  imports: [
    CommonModule,
    PoLoadingModule,
  ],
  templateUrl: './load.component.html',
  styleUrl: './load.component.scss',
})
export class LoadComponent {

  constructor(public loader: LoaderService) {}

}
