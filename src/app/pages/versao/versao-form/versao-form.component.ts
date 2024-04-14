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
import { IVersao } from '../../../interfaces/versao';
import { VersaoService } from '../../../services/versao.service';
import { IMarca } from '../../../interfaces/marca';
import { IModelo } from '../../../interfaces/modelo';
import { MarcaService } from '../../../services/marca.service';
import { ModeloService } from '../../../services/modelo.service';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-versao-form',
  templateUrl: './versao-form.component.html',
  styleUrl: './versao-form.component.scss',
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
export class VersaoFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private versaoService = inject(VersaoService);
  private authService = inject(AuthService);
  private marcaService = inject(MarcaService);
  private modeloService = inject(ModeloService);

  formName: string = "Versão"
  listPage: string = "/list-versao"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    marcaId: [null, Validators.required],
    modeloId: [null, Validators.required],
    descricao: [null, Validators.required],
  });

  entityId!: number;

  marcas: IMarca[] = [];
  modelos: IModelo[] = [];
  modelosPorMarca: IModelo[] = [];

  rowData: any;

  ngOnInit() {

    forkJoin([
      this.marcaService.getAll().pipe(
        map(marcas => marcas.map(marca => ({ id: marca.id, descricao: marca.descricao })))
      ),
      this.modeloService.getAll().pipe(
        map(modelos => modelos.map(modelo => ({ id: modelo.id, descricao: modelo.descricao, marcaId: modelo.marcaId })))
      )
    ]).subscribe(([marcas, modelos]) => {
      // Após o carregamento de todas as marcas e modelos
      this.marcas = marcas;
      this.modelos = modelos;
    
      // Recupere os dados da linha serializados da rota
      this.route.params.subscribe(params => {
        const data = params['rowData'];
        // Desserialize os dados de volta para o objeto row
        this.rowData = JSON.parse(data);
    
        // Verifique se os dados da linha estão disponíveis e carregue os modelos por marca
        if (this.rowData) {
          this.carregarModelosPorMarca(this.rowData.marcaId);
    
          this.entityId = this.rowData.id;
          this.entityForm.controls['marcaId'].setValue(this.rowData.marcaId);
          this.entityForm.controls['modeloId'].setValue(this.rowData.modeloId);
          this.entityForm.controls['descricao'].setValue(this.rowData.descricao);
        }
      });
    });




    //this.entityId = this.route.snapshot.params['id'];
/*
    this.marcaService.getAll().pipe(
      map(marcas => marcas.map(marca => ({ id: marca.id, descricao: marca.descricao })))
    ).subscribe(marcas => {
      this.marcas = marcas;
    });

    this.modeloService.getAll().pipe(
      map(modelos => modelos.map(modelo => ({ id: modelo.id, descricao: modelo.descricao, marcaId: modelo.marcaId })))
    ).subscribe(modelos => {
      this.modelos = modelos;
    });

    // Recupere os dados da linha serializados da rota
    this.route.params.subscribe(params => {
      const data = params['rowData'];
      // Desserialize os dados de volta para o objeto row
      this.rowData = JSON.parse(data);
    });

    if (this.rowData) {
      console.log(this.modelos)
      this.carregarModelosPorMarca(this.rowData.marcaId)

      this.entityForm.controls['marcaId'].setValue(this.rowData.marcaId);
      this.entityForm.controls['modeloId'].setValue(this.rowData.modeloId);
      this.entityForm.controls['descricao'].setValue(this.rowData.descricao);
    }

    /* if (this.entityId) {
       this.versaoService.getById(this.entityId).subscribe((data: any) => {
 
         if (data != null) {
           this.entityForm.controls['modeloId'].setValue(data.modeloId);
           this.entityForm.controls['descricao'].setValue(data.descricao);
         }
       },
         (error: any) => {
           this.toastr.error(error.error)
         });
     }*/

  }

  Save(): void {

    let userLogged = this.authService.getUserLogged();

    if (this.entityForm.valid) {

      const entity: IVersao = {
        id: this.entityId,
        modeloId: this.entityForm.value.modeloId!,
        descricao: this.entityForm.value.descricao!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.versaoService.update(entity).subscribe(() => {
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

        this.versaoService.add(entity).subscribe(() => {
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

  carregarModelosPorMarca(id: number) {

    const modelosPorMarca = this.modelos.filter(modelo => modelo.marcaId === id);
    this.modelosPorMarca = modelosPorMarca;
    this.entityForm.controls['modeloId'].setValue(null);
  }

}
