import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoMenuPanelItem, PoMenuPanelModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';
import { MenuService } from '../../core/menu.service';
import { Subscription } from 'rxjs';
import { IMenuResponse } from '../../models/menu-response.interface';
import { Action } from 'rxjs/internal/scheduler/Action';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    PoMenuPanelModule,
    PoToolbarModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {

  menuResponse: IMenuResponse[] = [];
  menuSubscription!: Subscription;
  menuItens: PoMenuPanelItem[] = [];

  constructor(
    private _router: Router,
    private _menuService: MenuService
  ) {}
  
  ngOnInit(): void {
    this.getMenus()
  }
  
  getMenus() {
    this.menuSubscription = this._menuService.getMenus().subscribe({
      next: (res: IMenuResponse[]) => {
        this.menuResponse = res;
        this.setItensActions(this.menuResponse);
      },
      error: (err: any) => {
        console.error('Error retrieving menus:', err);
      }
    });
  }

  setItensActions(menus: IMenuResponse[]): PoMenuPanelItem[] {
    this.menuItens = menus.map( (menu) => {
      return ({
        ...menu,
        action: () => this._navigateTo(menu.action)
      })
    })

    return this.menuItens;
  }
  
  private _navigateTo(route: string) {
    this._router.navigate([route])
  }
  
  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
  }
  
}
