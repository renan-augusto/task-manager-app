import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ITaskRequest, ITaskResponse } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }

  private _baseUrl = environment.baseURL;

  createTask(task: ITaskRequest) {
    return this._http.post<ITaskResponse>(`${this._baseUrl}task/create-task`, task);
  }

  getTaskById(idTask: string) {
    return this._http.get<ITaskResponse>(`${this._baseUrl}task/get-by-id?id=${idTask}`);
  }

  getTasks(userId: string) {
    return this._http.get<ITaskResponse[]>(`${this._baseUrl}task/get-tasks?userId=${userId}`);
  }

  updateTask(task: ITaskRequest) {
    return this._http.put<ITaskResponse>(`${this._baseUrl}task/update-task`, task);
  }

}
