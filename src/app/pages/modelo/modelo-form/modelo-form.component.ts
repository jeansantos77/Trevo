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
import { IMarca } from '../../../interfaces/marca';
import { ModeloService } from '../../../services/modelo.service';
import { IModelo } from '../../../interfaces/modelo';
import { MarcaService } from '../../../services/marca.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modelo-form',
  templateUrl: './modelo-form.component.html',
  styleUrl: './modelo-form.component.scss',
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
export class ModeloFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private modeloService = inject(ModeloService);
  private authService = inject(AuthService);
  private marcaService = inject(MarcaService);

  formName: string = "Modelo"
  listPage: string = "/list-modelo"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    descricao: [null, Validators.required],
    marcaId: [null, Validators.required]
  });

  entityId!: number;

  marcas: IMarca[] = [];

  ngOnInit() {

    this.marcaService.getAll().pipe(
      map(marcas => marcas.map(marca => ({id: marca.id, descricao: marca.descricao })))
    ).subscribe(data => {
      this.marcas = data;
    });

    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.modeloService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['descricao'].setValue(data.descricao);
          this.entityForm.controls['marcaId'].setValue(data.marcaId);
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

      const entity: IModelo = {
        id: this.entityId,
        descricao: this.entityForm.value.descricao!,
        marcaId: this.entityForm.value.marcaId!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.modeloService.update(entity).subscribe(() => {
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

        this.modeloService.add(entity).subscribe(() => {
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
