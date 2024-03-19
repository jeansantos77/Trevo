import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { VendedorService } from '../../../services/vendedor.service';
import { IVendedor } from '../../../interfaces/vendedor';
import { NgxMaskDirective } from 'ngx-mask';
import { CidadeService } from '../../../services/cidade.service';
import { map } from 'rxjs/operators';
import { ICidade } from '../../../interfaces/cidade';

@Component({
  selector: 'app-vendedor-form',
  templateUrl: './vendedor-form.component.html',
  styleUrl: './vendedor-form.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterLink,
    MatFormFieldModule,
    MatIconModule,
    NgxMaskDirective
  ]
})
export class VendedorFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private vendedorService = inject(VendedorService);
  private authService = inject(AuthService);
  private cidadeService = inject(CidadeService);

  formName: string = "vendedor"
  listPage: string = "/list-vendedor"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    nome: [null, Validators.required],
    email: [null, Validators.email],
    telefone: null,
    cpf: null,
    cep: null, 
    logradouro: null, 
    numero: null,
    complemento: null,
    bairro: null,
    obs: null,
    cidadeId: [null, Validators.required],
    ativo: [true, Validators.required],

  });

  entityId!: number;

  cities: ICidade[] = [];

  situations = [
    { description: 'Ativo', value: true },
    { description: 'Inativo', value: false }
  ];

  ngOnInit() {

    this.cidadeService.getAll().pipe(
      map(cities => cities.map(city => ({id: city.id, nome: city.nome})))
    ).subscribe(cities => {
      this.cities = cities;
    });

    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.vendedorService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['nome'].setValue(data.nome);
          this.entityForm.controls['email'].setValue(data.email);
          this.entityForm.controls['telefone'].setValue(data.telefone);
          this.entityForm.controls['cpf'].setValue(data.cpf);
          this.entityForm.controls['cep'].setValue(data.cep);
          this.entityForm.controls['logradouro'].setValue(data.logradouro);
          this.entityForm.controls['numero'].setValue(data.numero);
          this.entityForm.controls['complemento'].setValue(data.complemento);
          this.entityForm.controls['bairro'].setValue(data.bairro);
          this.entityForm.controls['cidadeId'].setValue(data.cidadeId);
          this.entityForm.controls['obs'].setValue(data.obs);
          this.entityForm.controls['ativo'].setValue(data.ativo);
        }
      },
        (error: any) => {
          this.toastr.error(error.error)
        });
    }

  }

  Save(): void {

    let userLogged = this.authService.getUserLogged();

    if (this.entityForm.valid) {

      const entity: IVendedor = {
        id: this.entityId,
        nome: this.entityForm.value.nome!,
        email: this.entityForm.value.email!,
        telefone: this.entityForm.value.telefone!,
        cpf: this.entityForm.value.cpf!,
        cep: this.entityForm.value.cep!,
        logradouro: this.entityForm.value.logradouro!,
        numero: this.entityForm.value.numero!,
        complemento: this.entityForm.value.complemento!,
        bairro: this.entityForm.value.bairro!,
        cidadeId: this.entityForm.value.cidadeId!,
        obs: this.entityForm.value.obs!,
        ativo: this.entityForm.value.ativo!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.vendedorService.update(entity).subscribe(() => {
          this.toastr.success(this.formName + ' alterado com sucesso!');
          this.redirectList();
        },
          (error: any) => {
            this.toastr.error(error.error || error.message)
          });
      }
      else {
        entity.criadoPor = userLogged;
        entity.criadoEm = new Date();

        this.vendedorService.add(entity).subscribe(() => {
          this.toastr.success(this.formName + ' salvo com sucesso!');
          this.redirectList();
        },
        (error: any) => {
          this.toastr.error(error.error || error.message)
        });
      }
    }
  }

  redirectList(): void {
    this.router.navigateByUrl(this.listPage);
  }

}
