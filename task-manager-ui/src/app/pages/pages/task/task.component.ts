import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoButtonModule, PoDividerModule, PoModalComponent, PoModalModule, PoNotificationModule, PoNotificationService, PoTableAction, PoTableColumn, PoTableModule, PoToasterOrientation } from '@po-ui/ng-components';
import { CreateTaskComponent } from '../../../shared/modals/create-task/create-task.component';
import { TableColumsService } from '../../../core/table-colums.service';
import { ITask, ITaskResponse } from '../../../models/task.interface';
import { Subscription } from 'rxjs';
import { TaskService } from '../../../core/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    PoButtonModule,
    PoModalModule,
    CreateTaskComponent,
    PoDividerModule,
    PoTableModule,
    PoNotificationModule
  ],
  providers: [
    PoNotificationService
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit, OnDestroy {

  @ViewChild('createTaskModal', {static: true})
  
  createTaskModal: PoModalComponent | null = null;
  tasksTableColumns!: PoTableColumn[];
  tasks: ITaskResponse[] = [];
  actions: PoTableAction[] = [
    {icon: 'po-icon po-icon-eye', label: 'Visualizar', action: this.viewTask.bind(this)},
    {icon: 'po-icon po-icon-edit', label: 'Alterar'},
    {icon: 'po-icon po-icon-delete', label: 'Excluir', type: 'danger'},
  ];

  selectedTask: ITask | undefined;
  tasksSubscription!: Subscription;


  constructor(
    private _tableColumns: TableColumsService,
    private _taskService: TaskService,
    public notification: PoNotificationService,
  ) {}
  
  ngOnInit(): void {
    this.tasksTableColumns = this._tableColumns.getTasksColumns();
    this.getTasks();
    
  }
  
  openCreateModal() {
    this.createTaskModal?.open();
  }
  
  onTaskCreatedSuccess() {
    this.createTaskModal?.close();
  }
  
  getTasks() {
    
    let userId = window.localStorage.getItem('userId');
    if(userId) {
      this.tasksSubscription = this._taskService.getTasks(userId).subscribe({
        next: (res: ITaskResponse[]) => {
          this.tasks = res;
        },
        error: (err: any) => {
          console.error('Error retrieving tasks', err);
          this.notification.warning({message: 'Não foi possível recuperar suas tarefas. Por favor, tente novamente mais tarde.', orientation: PoToasterOrientation.Top, duration: 3000})
        }
      });
    }
  }

  viewTask(task: ITaskResponse) {
    const taskToView: ITask = {
      title: task.title,
      description: task.description,
      completed: task.completed,
    }

    this.selectedTask = taskToView;

    this.createTaskModal?.open();
  }

  onTaskCreateModalClose() {
    this.getTasks();
  }

  ngOnDestroy(): void {
    if(this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }
}
