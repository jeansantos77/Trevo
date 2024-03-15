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
import { EmpresaService } from '../../../services/empresa.service';
import { IEmpresa } from '../../../interfaces/empresa';
import { NgxMaskDirective } from 'ngx-mask';
import { CidadeService } from '../../../services/cidade.service';
import { map } from 'rxjs/operators';
import { ICidade } from '../../../interfaces/cidade';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
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
export class CompanyFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private empresaService = inject(EmpresaService);
  private authService = inject(AuthService);
  private cidadeService = inject(CidadeService);

  formName: string = "Empresa"
  listPage: string = "/list-company"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    nome: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    telefone: [null, Validators.required],
    cnpj: [null, Validators.required],
    cep: [null, Validators.required],
    logradouro: [null, Validators.required],
    numero: [null, Validators.required],
    bairro: [null, Validators.required],
    cidadeId: [null, Validators.required],

  });

  entityId!: number;

  cities: ICidade[] = [];

  ngOnInit() {

    this.cidadeService.getAll().pipe(
      map(cities => cities.map(city => ({id: city.id, nome: city.nome})))
    ).subscribe(cities => {
      this.cities = cities;
    });

    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.empresaService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['nome'].setValue(data.nome);
          this.entityForm.controls['email'].setValue(data.email);
          this.entityForm.controls['telefone'].setValue(data.telefone);
          this.entityForm.controls['cnpj'].setValue(data.cnpj);
          this.entityForm.controls['cep'].setValue(data.cep);
          this.entityForm.controls['logradouro'].setValue(data.logradouro);
          this.entityForm.controls['numero'].setValue(data.numero);
          this.entityForm.controls['bairro'].setValue(data.bairro);
          this.entityForm.controls['cidadeId'].setValue(data.cidadeId);
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

      const entity: IEmpresa = {
        id: this.entityId,
        nome: this.entityForm.value.nome!,
        email: this.entityForm.value.email!,
        telefone: this.entityForm.value.telefone!,
        cnpj: this.entityForm.value.cnpj!,
        cep: this.entityForm.value.cep!,
        logradouro: this.entityForm.value.logradouro!,
        numero: this.entityForm.value.numero!,
        bairro: this.entityForm.value.bairro!,
        cidadeId: this.entityForm.value.cidadeId!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.empresaService.update(entity).subscribe(() => {
          this.toastr.success(this.formName + ' alterada com sucesso!');
          this.redirectList();
        },
          (error: any) => {
            this.toastr.error(error.error || error.message)
          });
      }
      else {
        entity.criadoPor = userLogged;
        entity.criadoEm = new Date();

        this.empresaService.add(entity).subscribe(() => {
          this.toastr.success(this.formName + ' salva com sucesso!');
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
