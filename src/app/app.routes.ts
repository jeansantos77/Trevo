import { Routes } from '@angular/router';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'list-user', component: ListUserComponent},
    { path: 'user-form', component: UserFormComponent},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: 'list-user', pathMatch: 'full'}, 
    { path: '**', redirectTo: 'list-user', pathMatch: 'full'}, 
];
