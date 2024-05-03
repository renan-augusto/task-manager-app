import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MainlayoutComponent } from './shared/mainlayout/mainlayout.component';
import { TaskComponent } from './pages/pages/task/task.component';

export const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent,
    },
    {
        path: '',
        component: MainlayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'task', component: TaskComponent }
        ],
        canActivate: [authGuard]
    }
];
