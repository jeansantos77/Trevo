import { Routes } from '@angular/router';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { 
        path: 'list-user', 
        component: ListUserComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'user-form', 
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'user-form/:id', 
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'login', 
        component: LoginComponent
    },
    { 
        path: '', 
        redirectTo: 'list-user', 
        pathMatch: 'full'
    }, 
    { 
        path: '**', 
        redirectTo: 'list-user', 
        pathMatch: 'full'
    }, 
];
