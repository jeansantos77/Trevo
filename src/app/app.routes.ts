import { Routes } from '@angular/router';
import { ListUserComponent } from './pages/user/list-user/list-user.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ListStateComponent } from './pages/state/list-state/list-state.component';
import { StateFormComponent } from './pages/state/state-form/state-form.component';
import { ListCompanyComponent } from './pages/company/list-company/list-company.component';
import { CompanyFormComponent } from './pages/company/company-form/company-form.component';
import { ListCityComponent } from './pages/city/list-city/list-city.component';
import { ListCountryComponent } from './pages/country/list-country/list-country.component';
import { CountryFormComponent } from './pages/country/country-form/country-form.component';
import { CityFormComponent } from './pages/city/city-form/city-form.component';
import { HomeComponent } from './pages/home/home.component';

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
        path: 'list-city', 
        component: ListCityComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'city-form', 
        component: CityFormComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'city-form/:id', 
        component: CityFormComponent,
        canActivate: [authGuard]
    },    
    { 
        path: 'list-country', 
        component: ListCountryComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'country-form', 
        component: CountryFormComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'country-form/:id', 
        component: CountryFormComponent,
        canActivate: [authGuard]
    },   
    { 
        path: 'home', 
        component: HomeComponent,
        canActivate: [authGuard]
    },         
    { 
        path: 'login', 
        component: LoginComponent
    },
    { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
    }, 
    { 
        path: '**', 
        redirectTo: 'list-user', 
        pathMatch: 'full'
    }, 
];
