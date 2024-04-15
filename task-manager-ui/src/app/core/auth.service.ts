import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../models/user-request.interface';
import { UserResponse } from '../models/user-response.request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  private baseUrl = environment.baseURL;

  userSingup(user: UserRequest) {
    return this._http.post<UserResponse>(`${this.baseUrl}auth/singup`, user)
  }
  
}
