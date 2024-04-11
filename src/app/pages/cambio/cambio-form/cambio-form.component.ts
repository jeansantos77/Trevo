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
import { ICambio } from '../../../interfaces/cambio';
import { CambioService } from '../../../services/cambio.service';

@Component({
  selector: 'app-cambio-form',
  templateUrl: './cambio-form.component.html',
  styleUrl: './cambio-form.component.scss',
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
export class CambioFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private CambioService = inject(CambioService);
  private authService = inject(AuthService);

  formName: string = "Câmbio"
  listPage: string = "/list-cambio"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    descricao: [null, Validators.required],
  });

  entityId!: number;

  ngOnInit() {
    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.CambioService.getById(this.entityId).subscribe((data: any) => {

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

      const entity: ICambio = {
        id: this.entityId,
        descricao: this.entityForm.value.descricao!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.CambioService.update(entity).subscribe(() => {
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

        this.CambioService.add(entity).subscribe(() => {
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
