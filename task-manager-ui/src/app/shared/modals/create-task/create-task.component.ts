import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoButtonModule, PoDividerModule, PoFieldModule, PoLoadingModule, PoModalModule, PoNotificationModule, PoNotificationService, PoToasterOrientation } from '@po-ui/ng-components';
import { TaskService } from '../../../core/task.service';
import { ITask, ITaskRequest } from '../../../models/task.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'create-task',
  standalone: true,
  imports: [
    CommonModule,
    CreateTaskComponent,
    PoNotificationModule,
    PoLoadingModule,
    PoButtonModule,
    PoDividerModule,
    PoButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PoFieldModule
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnDestroy, OnChanges {

  @Input() task?: ITask;
  @Output() onFormSuccess = new EventEmitter<boolean>();

  createTaskForm: FormGroup;
  taskSubscription?: Subscription;

  constructor(
    public notification: PoNotificationService,
    private _taskService: TaskService,
  ) {
    const defaultFormValues = {
      title: '',
      description: '',
      completed: false,
    }
    
    const taskFormValues = this.task ? {
      title: this.task.title,
      description: this.task.description,
      completed: this.task.completed,
    } : defaultFormValues;
    
    this.createTaskForm = new FormGroup({
      title: new FormControl(taskFormValues.title, [Validators.required]),
      description: new FormControl(taskFormValues.description),
      completed: new FormControl(taskFormValues.completed),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && !changes['task'].firstChange) {
      this.createTaskForm
    }
  }
  
  onCreateSubmit() {
    if(this.createTaskForm.valid) {
      const payload: ITaskRequest = this.createTaskRequest();
      
      this.taskSubscription = this._taskService.createTask(payload).subscribe({
        next: () => {
          this.createTaskForm.reset();
          this.notification.success({message: 'Tarefa criada com sucesso!', duration: 3000, orientation: PoToasterOrientation.Top})
        },
        error: (err) => {
          console.error('Error creating tasks', err);
        }
      });
    }
  }
  
  createTaskRequest(): ITaskRequest {
    let userId = parseInt(window.localStorage.getItem('userId')!);
    
    return {
      title: this.createTaskForm.get('title')?.value.trim(),
      description: this.createTaskForm.get('description')?.value ? this.createTaskForm.get('description')?.value : '',
      completed: this.createTaskForm.get('completed')?.value == true ? this.createTaskForm.get('completed')?.value : false,
      userId: userId ? userId : 0,
    };
  }

  ngOnDestroy(): void {
    if(this.taskSubscription) {
      this.taskSubscription?.unsubscribe();
    }
  }
  
}
