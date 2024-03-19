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
import { FornecedorService } from '../../../services/fornecedor.service';
import { IFornecedor } from '../../../interfaces/fornecedor';
import { NgxMaskDirective } from 'ngx-mask';
import { CidadeService } from '../../../services/cidade.service';
import { map } from 'rxjs/operators';
import { ICidade } from '../../../interfaces/cidade';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.scss',
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
export class FornecedorFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private fornecedorService = inject(FornecedorService);
  private authService = inject(AuthService);
  private cidadeService = inject(CidadeService);

  formName: string = "Fornecedor"
  listPage: string = "/list-fornecedor"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    nome: [null, Validators.required],
    tipoPessoa: ["PJ", Validators.required],
    email: [null, Validators.email],
    telefone: null,
    contato: null,
    cnpj: null,
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

  tipos = [
    { description: 'Pessoa Física', value: 'PF' },
    { description: 'Pessoa Jurídica', value: 'PJ' }
  ];

  situations = [
    { description: 'Ativo', value: true },
    { description: 'Inativo', value: false }
  ];

  isPJ : boolean = true

  ngOnInit() {

    this.cidadeService.getAll().pipe(
      map(cities => cities.map(city => ({id: city.id, nome: city.nome})))
    ).subscribe(cities => {
      this.cities = cities;
    });

    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.fornecedorService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['nome'].setValue(data.nome);
          this.entityForm.controls['tipoPessoa'].setValue(data.tipoPessoa);
          this.entityForm.controls['email'].setValue(data.email);
          this.entityForm.controls['telefone'].setValue(data.telefone);
          this.entityForm.controls['contato'].setValue(data.contato);
          this.entityForm.controls['cnpj'].setValue(data.cnpj);
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

  onChange(value: string) {
    if (value === 'PJ') {
      this.isPJ = true;
    } else {
      this.isPJ = false;
    }
  }

  Save(): void {

    let userLogged = this.authService.getUserLogged();

    if (this.entityForm.valid) {

      const entity: IFornecedor = {
        id: this.entityId,
        nome: this.entityForm.value.nome!,
        tipoPessoa: this.entityForm.value.tipoPessoa!,
        email: this.entityForm.value.email!,
        telefone: this.entityForm.value.telefone!,
        contato: this.entityForm.value.contato!,
        cnpj: this.entityForm.value.cnpj!,
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
        this.fornecedorService.update(entity).subscribe(() => {
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

        this.fornecedorService.add(entity).subscribe(() => {
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
