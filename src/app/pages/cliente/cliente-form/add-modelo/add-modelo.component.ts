import { Component, Inject, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IModeloDesejado } from '../../../../interfaces/modeloDesejado';
import { MarcaService } from '../../../../services/marca.service';
import { CorService } from '../../../../services/cor.service';
import { map } from 'rxjs/operators';
import { IMarca } from '../../../../interfaces/marca';
import { ICor } from '../../../../interfaces/cor';
import { IModelo } from '../../../../interfaces/modelo';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModeloService } from '../../../../services/modelo.service';
import { IVersao } from '../../../../interfaces/versao';
import { VersaoService } from '../../../../services/versao.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-modelo',
  templateUrl: './add-modelo.component.html',
  styleUrl: './add-modelo.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMaskDirective,
    MatTooltipModule,
    MatCheckboxModule
  ]
})
export class AddModeloComponent {
  entityForm: FormGroup;
  formName: string = "Modelo Desejado"
  requiredMessage: string = "Campo obrigatório"

  private marcaService = inject(MarcaService);
  private modeloService = inject(ModeloService);
  private versaoService = inject(VersaoService);
  private corService = inject(CorService);
  private toastr = inject(ToastrService)

  entityId!: number;

  marcas: IMarca[] = [];
  cores: ICor[] = [];

  modelos: IModelo[] = [];
  modelosPorMarca: IModelo[] = [];
  modelosDesejados: IModeloDesejado[] = [];

  versoes: IVersao[] = [];
  versoesPorModelo: IVersao[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddModeloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.modelosDesejados = data.modelos;

    this.entityForm = this.fb.group({
      marcaId: [null, Validators.required],
      modeloId: [null, Validators.required],
      versaoId: null,
      corId: [null, Validators.required],
      marca: null,
      modelo: null,
      cor: null,
      versao: null
    });

  }
  ngOnInit() {

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

    this.versaoService.getAll().pipe(
      map(versoes => versoes.map(versao => ({ id: versao.id, descricao: versao.descricao, modeloId: versao.modeloId })))
    ).subscribe(versoes => {
      this.versoes = versoes;
    });

    this.corService.getAll().pipe(
      map(cores => cores.map(cor => ({ id: cor.id, descricao: cor.descricao })))
    ).subscribe(cores => {
      this.cores = cores;
    });

  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    if (this.entityForm.valid) {

      const modeloId = this.entityForm.controls['modeloId'].value;
      const versaoId = this.entityForm.controls['versaoId'].value;
      const corId = this.entityForm.controls['corId'].value;

      if (this.modelosDesejados.some(item => item.modeloId === modeloId && item.versaoId === versaoId && item.corId === corId)) {
        this.toastr.error("Modelo dejado já existe para essa cor.")
        return;
      }

      const selectedVersao:string | undefined = this.versoes.find(v => v.id === versaoId)?.descricao;

      if (selectedVersao) {
        this.entityForm.controls['versao'].setValue(selectedVersao);
      }

      const selectedCor:string | undefined = this.cores.find(cor => cor.id === corId)?.descricao;
      this.entityForm.controls['cor'].setValue(selectedCor);

      this.dialogRef.close(this.entityForm.value);
    }

  }

  carregarModelosPorMarca(event: any) {
    const marcaId = event.value;
    this.entityForm.controls['marca'].setValue(event.source.triggerValue);
    const modelosPorMarca = this.modelos.filter(modelo => modelo.marcaId === marcaId);
    this.modelosPorMarca = modelosPorMarca;
  }

  carregarVersoesPorModelo(event: any) {
    const modeloId = event.value;
    this.entityForm.controls['modelo'].setValue(event.source.triggerValue);
    const versoesPorModelo = this.versoes.filter(versao => versao.modeloId === modeloId);
    this.versoesPorModelo = versoesPorModelo;
  }

  

}
