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
import { ITipoDespesa } from '../../../interfaces/tipoDespesa';
import { TipoDespesaService } from '../../../services/tipoDespesa.service';

@Component({
  selector: 'app-tipo-despesa-form',
  templateUrl: './tipo-despesa-form.component.html',
  styleUrl: './tipo-despesa-form.component.scss',
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
    MatIconModule
  ]
})
export class TipoDespesaFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private tipoDespesaService = inject(TipoDespesaService);
  private authService = inject(AuthService);

  formName: string = "Tipos de Despesa"
  listPage: string = "/list-tipo-despesa"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    descricao: [null, Validators.required],
  });

  entityId!: number;

  ngOnInit() {
    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.tipoDespesaService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['descricao'].setValue(data.descricao);
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

      const entity: ITipoDespesa = {
        id: this.entityId,
        descricao: this.entityForm.value.descricao!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.tipoDespesaService.update(entity).subscribe(() => {
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

        this.tipoDespesaService.add(entity).subscribe(() => {
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
