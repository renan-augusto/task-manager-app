import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IMenuResponse } from '../models/menu-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _http: HttpClient) { }

  private baseUrl = environment.baseURL;

  getMenus() {
    return this._http.get<IMenuResponse[]>(`${this.baseUrl}menu/menus`);
  }

}
