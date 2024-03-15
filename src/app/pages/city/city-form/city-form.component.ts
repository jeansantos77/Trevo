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
import { CidadeService } from '../../../services/cidade.service';
import { ICidade } from '../../../interfaces/cidade';
import { EstadoService } from '../../../services/estado.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrl: './city-form.component.scss',
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
export class CityFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private cidadeService = inject(CidadeService);
  private authService = inject(AuthService);
  private estadoService = inject(EstadoService);

  formName: string = "Cidade"
  listPage: string = "/list-city"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    nome: [null, Validators.required],
    estadoId: [null, Validators.required]
  });

  entityId!: number;

  estados: IEstado[] = [];

  ngOnInit() {

    this.estadoService.getAll().pipe(
      map(estados => estados.map(estado => ({id: estado.id, nome: estado.nome })))
    ).subscribe(data => {
      this.estados = data;
    });

    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.cidadeService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['nome'].setValue(data.nome);
          this.entityForm.controls['estadoId'].setValue(data.estadoId);
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

      const entity: ICidade = {
        id: this.entityId,
        nome: this.entityForm.value.nome!,
        estadoId: this.entityForm.value.estadoId!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.cidadeService.update(entity).subscribe(() => {
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

        this.cidadeService.add(entity).subscribe(() => {
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
