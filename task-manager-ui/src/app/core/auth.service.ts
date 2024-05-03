import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserRequest } from '../models/user-request.interface';
import { IUserResponse } from '../models/user-response.request';
import { IUserAuthRequest } from '../models/user-auth-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  private _baseUrl = environment.baseURL;
  
  private _jwtToken = window.localStorage.getItem('token')?.toString();

  private _header: HttpHeaders = new HttpHeaders({
    'Authorization': `bearer ${this._jwtToken}`
  });

  userSingnup(user: IUserRequest) {
    return this._http.post<IUserResponse>(`${this._baseUrl}auth/signup`, user);
  }

  userSignin(user: IUserAuthRequest) {
    return this._http.post<IUserResponse>(`${this._baseUrl}auth/signin`, user);
  }

  validateToken() {
    return this._http.post<any>(`${this._baseUrl}auth/validate-token`, {headers: this._header});
  }
  
}
