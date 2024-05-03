import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoButtonModule, PoDividerModule, PoFieldModule, PoLoadingModule, PoModalModule, PoNotificationModule, PoNotificationService } from '@po-ui/ng-components';
import { TaskService } from '../../../core/task.service';
import { ITaskRequest } from '../../../models/task.interface';
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
export class CreateTaskComponent implements OnDestroy {

  @Output() onFormSuccess = new EventEmitter<boolean>();

  createTaskForm: FormGroup;
  taskSubscription?: Subscription;

  constructor(
    public notification: PoNotificationService,
    private _taskService: TaskService,
  ) {
    this.createTaskForm = new FormGroup ({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      completed: new FormControl(false, [])
    })
  }
  
  onCreateSubmit() {
    if(this.createTaskForm.valid) {
      const payload: ITaskRequest = this.createTaskRequest();
      
      this.taskSubscription = this._taskService.createTask(payload).subscribe({
        next: () => {
          this.createTaskForm.reset();
          this.notification.success('Tarefa criada com sucesso!')
        },
        error: (err) => {
          console.error('Error creating tasks', err);
        }
      });
    }
  }
  
  createTaskRequest(): ITaskRequest {
    let userId = parseInt(window.localStorage.getItem('id_user')!);
    
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