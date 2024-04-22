import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IUserRequest } from '../models/user-request.interface';
import { IUserResponse } from '../models/user-response.request';
import { IUserAuthRequest } from '../models/user-auth-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  private baseUrl = environment.baseURL;

  isLoggedin = signal(false);

  userSingnup(user: IUserRequest) {
    return this._http.post<IUserResponse>(`${this.baseUrl}auth/signup`, user);
  }

  userSignin(user: IUserAuthRequest) {
    return this._http.post<any>(`${this.baseUrl}auth/signin`, user);
  }
  
}
