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
import { MarcaFormComponent } from './pages/marca/marca-form/marca-form.component';
import { ListMarcaComponent } from './pages/marca/list-marca/list-marca.component';
import { ModeloFormComponent } from './pages/modelo/modelo-form/modelo-form.component';
import { ListModeloComponent } from './pages/modelo/list-modelo/list-modelo.component';
import { ListTipoDespesaComponent } from './pages/tipo-despesa/list-tipo-despesa/list-tipo-despesa.component';
import { TipoDespesaFormComponent } from './pages/tipo-despesa/tipo-despesa-form/tipo-despesa-form.component';
import { ListCatDespesaComponent } from './pages/categoria-despesa/list-cat-despesa/list-cat-despesa.component';
import { CatDespesaFormComponent } from './pages/categoria-despesa/cat-despesa-form/cat-despesa-form.component';
import { ListCatVeiculoComponent } from './pages/categoria-veiculo/list-cat-veiculo/list-cat-veiculo.component';
import { CatVeiculoFormComponent } from './pages/categoria-veiculo/cat-veiculo-form/cat-veiculo-form.component';
import { CombustivelFormComponent } from './pages/combustivel/combustivel-form/combustivel-form.component';
import { ListCombustivelComponent } from './pages/combustivel/list-combustivel/list-combustivel.component';
import { CorFormComponent } from './pages/cor/cor-form/cor-form.component';
import { ListCorComponent } from './pages/cor/list-cor/list-cor.component';
import { AcessorioFormComponent } from './pages/acessorio/acessorio-form/acessorio-form.component';
import { ListAcessorioComponent } from './pages/acessorio/list-acessorio/list-acessorio.component';
import { ListSitVeiculoComponent } from './pages/situacao-veiculo/list-sit-veiculo/list-sit-veiculo.component';
import { SitVeiculoFormComponent } from './pages/situacao-veiculo/sit-veiculo-form/sit-veiculo-form.component';
import { ListFormaPagtoComponent } from './pages/forma-pagto/list-forma-pagto/list-forma-pagto.component';
import { FormaPagtoFormComponent } from './pages/forma-pagto/forma-pagto-form/forma-pagto-form.component';
import { FornecedorFormComponent } from './pages/fornecedor/fornecedor-form/fornecedor-form.component';
import { ListFornecedorComponent } from './pages/fornecedor/list-fornecedor/list-fornecedor.component';
import { VendedorFormComponent } from './pages/vendedor/vendedor-form/vendedor-form.component';
import { ListVendedorComponent } from './pages/vendedor/list-vendedor/list-vendedor.component';
import { ListFinanceiraComponent } from './pages/financeira/list-financeira/list-financeira.component';
import { FinanceiraFormComponent } from './pages/financeira/financeira-form/financeira-form.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { ListClienteComponent } from './pages/cliente/list-cliente/list-cliente.component';
import { CambioFormComponent } from './pages/cambio/cambio-form/cambio-form.component';
import { ListCambioComponent } from './pages/cambio/list-cambio/list-cambio.component';
import { VersaoFormComponent } from './pages/versao/versao-form/versao-form.component';
import { ListVersaoComponent } from './pages/versao/list-versao/list-versao.component';
import { VeiculoFormComponent } from './pages/veiculo/veiculo-form/veiculo-form.component';
import { ListVeiculoComponent } from './pages/veiculo/list-veiculo/list-veiculo.component';

export const routes: Routes = [
    { path: 'list-user', component: ListUserComponent, canActivate: [authGuard]},
    { path: 'user-form', component: UserFormComponent, canActivate: [authGuard]}, 
    { path: 'user-form/:id', component: UserFormComponent, canActivate: [authGuard]},
    { path: 'list-state', component: ListStateComponent, canActivate: [authGuard]},
    { path: 'state-form', component: StateFormComponent, canActivate: [authGuard]},
    { path: 'state-form/:id', component: StateFormComponent, canActivate: [authGuard]},
    { path: 'list-company', component: ListCompanyComponent, canActivate: [authGuard]},
    { path: 'company-form', component: CompanyFormComponent, canActivate: [authGuard]},
    { path: 'company-form/:id', component: CompanyFormComponent, canActivate: [authGuard]},  
    { path: 'list-city', component: ListCityComponent, canActivate: [authGuard]},
    { path: 'city-form', component: CityFormComponent, canActivate: [authGuard]},
    { path: 'city-form/:id', component: CityFormComponent, canActivate: [authGuard]},   
    { path: 'list-country',  component: ListCountryComponent, canActivate: [authGuard]},
    { path: 'country-form', component: CountryFormComponent, canActivate: [authGuard]},
    { path: 'country-form/:id', component: CountryFormComponent, canActivate: [authGuard]},  
    { path: 'list-marca', component: ListMarcaComponent, canActivate: [authGuard]},
    { path: 'marca-form', component: MarcaFormComponent, canActivate: [authGuard]},
    { path: 'marca-form/:id', component: MarcaFormComponent, canActivate: [authGuard]},   
    { path: 'list-modelo', component: ListModeloComponent, canActivate: [authGuard]},
    { path: 'modelo-form', component: ModeloFormComponent, canActivate: [authGuard]},
    { path: 'modelo-form/:id', component: ModeloFormComponent, canActivate: [authGuard]},     
    { path: 'list-tipo-despesa', component: ListTipoDespesaComponent, canActivate: [authGuard]},
    { path: 'tipo-despesa-form', component: TipoDespesaFormComponent, canActivate: [authGuard]},
    { path: 'tipo-despesa-form/:id', component: TipoDespesaFormComponent, canActivate: [authGuard]},   
    { path: 'list-cat-despesa', component: ListCatDespesaComponent, canActivate: [authGuard]},
    { path: 'cat-despesa-form', component: CatDespesaFormComponent, canActivate: [authGuard]},
    { path: 'cat-despesa-form/:id', component: CatDespesaFormComponent, canActivate: [authGuard]},      
    { path: 'list-cat-veiculo', component: ListCatVeiculoComponent, canActivate: [authGuard]},
    { path: 'cat-veiculo-form', component: CatVeiculoFormComponent, canActivate: [authGuard]},
    { path: 'cat-veiculo-form/:id', component: CatVeiculoFormComponent, canActivate: [authGuard]},      
    { path: 'list-combustivel', component: ListCombustivelComponent, canActivate: [authGuard]},
    { path: 'combustivel-form', component: CombustivelFormComponent, canActivate: [authGuard]},
    { path: 'combustivel-form/:id', component: CombustivelFormComponent, canActivate: [authGuard]},  

    { path: 'list-cambio', component: ListCambioComponent, canActivate: [authGuard]},
    { path: 'cambio-form', component: CambioFormComponent, canActivate: [authGuard]},
    { path: 'cambio-form/:id', component: CambioFormComponent, canActivate: [authGuard]}, 

    { path: 'list-versao', component: ListVersaoComponent, canActivate: [authGuard]},
    { path: 'versao-form', component: VersaoFormComponent, canActivate: [authGuard]},
    { path: 'versao-form/:id', component: VersaoFormComponent, canActivate: [authGuard]}, 

    { path: 'list-veiculo', component: ListVeiculoComponent, canActivate: [authGuard]},
    { path: 'veiculo-form', component: VeiculoFormComponent, canActivate: [authGuard]},
    { path: 'veiculo-form/:id', component: VeiculoFormComponent, canActivate: [authGuard]}, 


    { path: 'list-cor', component: ListCorComponent, canActivate: [authGuard]},
    { path: 'cor-form', component: CorFormComponent, canActivate: [authGuard]},
    { path: 'cor-form/:id', component: CorFormComponent, canActivate: [authGuard]}, 
    { path: 'list-acessorio', component: ListAcessorioComponent, canActivate: [authGuard]},
    { path: 'acessorio-form', component: AcessorioFormComponent, canActivate: [authGuard]},
    { path: 'acessorio-form/:id', component: AcessorioFormComponent, canActivate: [authGuard]}, 
    { path: 'list-sit-veiculo', component: ListSitVeiculoComponent, canActivate: [authGuard]},
    { path: 'sit-veiculo-form', component: SitVeiculoFormComponent, canActivate: [authGuard]},
    { path: 'sit-veiculo-form/:id', component: SitVeiculoFormComponent, canActivate: [authGuard]}, 
    { path: 'list-financeira', component: ListFinanceiraComponent, canActivate: [authGuard]},
    { path: 'financeira-form', component: FinanceiraFormComponent, canActivate: [authGuard]},
    { path: 'financeira-form/:id', component: FinanceiraFormComponent, canActivate: [authGuard]}, 
    { path: 'list-fornecedor', component: ListFornecedorComponent, canActivate: [authGuard]},
    { path: 'fornecedor-form', component: FornecedorFormComponent, canActivate: [authGuard]},
    { path: 'fornecedor-form/:id', component: FornecedorFormComponent, canActivate: [authGuard]}, 
    { path: 'list-cliente', component: ListClienteComponent, canActivate: [authGuard]},
    { path: 'cliente-form', component: ClienteFormComponent, canActivate: [authGuard]},
    { path: 'cliente-form/:id', component: ClienteFormComponent, canActivate: [authGuard]}, 

    { path: 'list-forma-pagto', component: ListFormaPagtoComponent, canActivate: [authGuard]},
    { path: 'forma-pagto-form', component: FormaPagtoFormComponent, canActivate: [authGuard]},
    { path: 'forma-pagto-form/:id', component: FormaPagtoFormComponent, canActivate: [authGuard]}, 
    { path: 'list-vendedor', component: ListVendedorComponent, canActivate: [authGuard]},
    { path: 'vendedor-form', component: VendedorFormComponent, canActivate: [authGuard]},
    { path: 'vendedor-form/:id', component: VendedorFormComponent, canActivate: [authGuard]}, 
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
        redirectTo: 'home', 
        pathMatch: 'full'
    }, 
];
