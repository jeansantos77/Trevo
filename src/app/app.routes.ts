import { Routes } from '@angular/router';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ListStateComponent } from './pages/list-state/list-state.component';
import { StateFormComponent } from './pages/state-form/state-form.component';
import { ListCompanyComponent } from './pages/list-company/list-company.component';
import { CompanyFormComponent } from './pages/company-form/company-form.component';

export const routes: Routes = [
    { 
        path: 'list-user', 
        component: ListUserComponent,
        //canActivate: [authGuard]
    },
    { 
        path: 'user-form', 
        component: UserFormComponent,
        //canActivate: [authGuard]
    },
    { 
        path: 'user-form/:id', 
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'list-state', 
        component: ListStateComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'state-form', 
        component: StateFormComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'state-form/:id', 
        component: StateFormComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'list-company', 
        component: ListCompanyComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'company-form', 
        component: CompanyFormComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'company-form/:id', 
        component: CompanyFormComponent,
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
