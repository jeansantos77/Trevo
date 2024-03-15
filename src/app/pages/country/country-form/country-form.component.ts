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
import { IPais } from '../../../interfaces/pais';
import { PaisService } from '../../../services/pais.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.scss',
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
export class CountryFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private paisService = inject(PaisService);
  private authService = inject(AuthService);

  formName: string = "País"
  listPage: string = "/list-country"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    nome: [null, Validators.required],
  });

  entityId!: number;

  ngOnInit() {
    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.paisService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['nome'].setValue(data.nome);
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

      const entity: IPais = {
        id: this.entityId,
        nome: this.entityForm.value.nome!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.paisService.update(entity).subscribe(() => {
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

        this.paisService.add(entity).subscribe(() => {
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
