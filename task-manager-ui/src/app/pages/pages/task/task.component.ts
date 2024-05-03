import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { PoButtonModule, PoModalComponent, PoModalModule } from '@po-ui/ng-components';
import { CreateTaskComponent } from '../../../shared/modals/create-task/create-task.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    PoButtonModule,
    PoModalModule,
    CreateTaskComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @ViewChild('createTaskModal', {static: true})
  createTaskModal: PoModalComponent | null = null;

  openCreateModal() {
    this.createTaskModal?.open();
  }

  onTaskCreatedSuccess() {
    this.createTaskModal?.close();
  }
}
