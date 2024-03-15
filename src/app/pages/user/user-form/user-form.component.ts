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
import { UsuarioService } from '../../../services/usuario.service';
import { IUsuario } from '../../../interfaces/usuario';
import { AuthService } from '../../../services/auth.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
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
export class UserFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);

  formName: string = "Usuário"
  listPage: string = "/list-user"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    nome: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    login: [null, Validators.required],
    senha: [null, Validators.required],
    perfil: [1, Validators.required],
    cpf: null,
    telefone: null,
    ativo: true
  });

  profiles = [
    { name: 'Administrador', value: 1 },
    { name: 'Usuario', value: 2 }
  ];

  defaultProfile = 1;

  situations = [
    { description: 'Ativo', value: true },
    { description: 'Inativo', value: false }
  ];

  defaultSituation = true

  entityId!: number;

  ngOnInit() {
    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.usuarioService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['nome'].setValue(data.nome);
          this.entityForm.controls['email'].setValue(data.email);
          this.entityForm.controls['login'].setValue(data.login);
          this.entityForm.controls['senha'].setValue(data.senha);
          this.entityForm.controls['cpf'].setValue(data.cpf);
          this.entityForm.controls['telefone'].setValue(data.telefone);
          this.entityForm.controls['perfil'].setValue(data.perfil);
          this.entityForm.controls['ativo'].setValue(data.ativo);

//          this.entityForm.controls.senha.disable();
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

      const entity: IUsuario = {
        id: this.entityId,
        nome: this.entityForm.value.nome!,
        login: this.entityForm.value.login!,
        email: this.entityForm.value.email!,
        senha: this.entityForm.value.senha!,
        cpf: this.entityForm.value.cpf!,
        telefone: this.entityForm.value.telefone!,
        perfil: this.entityForm.value.perfil!,
        ativo: this.entityForm.value.ativo!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
       
        this.usuarioService.update(entity).subscribe(() => {
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

        this.usuarioService.add(entity).subscribe(() => {
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

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
