import { Routes } from '@angular/router';
import { ListUserComponent } from './user/list-user/list-user.component';
import { UserFormComponent } from './user/user-form/user-form.component';

export const routes: Routes = [
    { path: '', component: ListUserComponent},
    { path: 'list-user', component: ListUserComponent},
    { path: 'user-form', component: UserFormComponent}
];
