import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../models/user-request.interface';
import { UserResponse } from '../models/user-response.request';
import { UserAuthRequest } from '../models/user-auth-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  private baseUrl = environment.baseURL;

  userSingnup(user: UserRequest) {
    return this._http.post<UserResponse>(`${this.baseUrl}auth/signup`, user)
  }

  userSignin(user: UserAuthRequest) {
    return this._http.post<any>(`${this.baseUrl}auth/signin`, user)
  }
  
}
