import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoButtonModule, PoDividerModule, PoFieldModule, PoLoadingModule, PoModalModule, PoNotificationModule, PoNotificationService, PoToasterOrientation } from '@po-ui/ng-components';
import { TaskService } from '../../../core/task.service';
import { ITask, ITaskRequest } from '../../../models/task.interface';
import { Subscription } from 'rxjs';
import { TaskState } from '../../../models/task-enum.enum';

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
export class CreateTaskComponent implements OnDestroy, OnChanges, OnInit {

  @Input() task?: ITask;
  @Input() taskState: TaskState = TaskState.Create;
  @Output() onFormSuccess = new EventEmitter<boolean>();

  createTaskForm: FormGroup;
  taskSubscription?: Subscription;

  inputDisable: string = 'false';

  constructor(
    public notification: PoNotificationService,
    private _taskService: TaskService,
  ) {
    this.createTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      completed: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.handleInputDisabled();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && !changes['task'].firstChange) {
      this.createTaskForm = new FormGroup({
        title: new FormControl(this.task?.title, [Validators.required]),
        description: new FormControl(this.task?.description),
        completed: new FormControl(this.task?.completed)
      })
    }

    if (changes['taskState'] && !changes['taskState'].firstChange) {
      this.handleInputDisabled();
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

  onUpdateSubmit() {
    
  }

  handleInputDisabled() {
    switch(this.taskState) {
      case TaskState.Create:
        this.inputDisable = 'false';
        break;
      case TaskState.Update:
        this.inputDisable = 'true';
        break;
      case TaskState.View:
        this.inputDisable = 'true';
        break;
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
