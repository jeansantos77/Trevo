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
import { IEstado } from '../../../interfaces/estado';
import { EstadoService } from '../../../services/estado.service';
import { IPais } from '../../../interfaces/pais';
import { PaisService } from '../../../services/pais.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrl: './state-form.component.scss',
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
export class StateFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private estadoService = inject(EstadoService);
  private authService = inject(AuthService);
  private paisService = inject(PaisService);

  formName: string = "Estado"
  listPage: string = "/list-state"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    nome: [null, Validators.required],
    uf: [null, Validators.required],
    paisId: [null, Validators.required]
  });

  entityId!: number;

  paises: IPais[] = [];

  ngOnInit() {

    this.paisService.getAll().pipe(
      map(paises => paises.map(pais => ({id: pais.id, nome: pais.nome })))
    ).subscribe(data => {
      this.paises = data;
    });

    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.estadoService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['nome'].setValue(data.nome);
          this.entityForm.controls['uf'].setValue(data.uf);
          this.entityForm.controls['paisId'].setValue(data.paisId);
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

      const entity: IEstado = {
        id: this.entityId,
        nome: this.entityForm.value.nome!,
        uf: this.entityForm.value.uf!,
        paisId: this.entityForm.value.paisId!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.estadoService.update(entity).subscribe(() => {
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

        this.estadoService.add(entity).subscribe(() => {
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
