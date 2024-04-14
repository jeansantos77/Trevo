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
import { NgxMaskDirective } from 'ngx-mask';
import { map } from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IModeloDesejado } from '../../../interfaces/modeloDesejado';
import { DeleteConfirmationComponent } from '../../../shared/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MarcaService } from '../../../services/marca.service';
import { ModeloService } from '../../../services/modelo.service';
import { CorService } from '../../../services/cor.service';
import { IMarca } from '../../../interfaces/marca';
import { ICor } from '../../../interfaces/cor';
import { IModelo } from '../../../interfaces/modelo';
import { IVersao } from '../../../interfaces/versao';
import { ICombustivel } from '../../../interfaces/combustivel';
import { ICambio } from '../../../interfaces/cambio';
import { ISituacaoVeiculo } from '../../../interfaces/situacaoVeiculo';
import { VersaoService } from '../../../services/versao.service';
import { CombustivelService } from '../../../services/combustivel.service';
import { CambioService } from '../../../services/cambio.service';
import { SituacaoVeiculoService } from '../../../services/situacaoVeiculo.service';
import { IVeiculo } from '../../../interfaces/veiculo';
import { VeiculoService } from '../../../services/veiculo.service';
import { ICategoriaVeiculo } from '../../../interfaces/categoriaVeiculo';
import { CategoriaVeiculoService } from '../../../services/categoriaVeiculo.service';
import { NgxCurrencyDirective } from "ngx-currency";
import { AddFotoComponent } from '../add-foto/add-foto.component';
import { IFotoVeiculo } from '../../../interfaces/fotoVeiculo';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  styleUrl: './veiculo-form.component.scss',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
    NgxMaskDirective,
    MatDatepickerModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    NgxCurrencyDirective
  ]
})
export class VeiculoFormComponent {

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pt-BR');
  }

  dataSourceFoto = new MatTableDataSource<IFotoVeiculo>();
  displayedColumnsFoto: string[] = ['imagem', 'caminho', 'nome', 'descricao', 'action'];

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private veiculoService = inject(VeiculoService);
  private authService = inject(AuthService);
  private marcaService = inject(MarcaService);
  private modeloService = inject(ModeloService);
  private corService = inject(CorService);
  private versaoService = inject(VersaoService);
  private combustivelService = inject(CombustivelService);
  private cambioService = inject(CambioService);
  private situacaoVeiculoService = inject(SituacaoVeiculoService);
  private categoriaVeiculoService = inject(CategoriaVeiculoService);

  formName: string = "Veículo"
  listPage: string = "/list-veiculo"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    placa: [null, Validators.required],
    renavam: [null, Validators.required],
    anoFabricacao: [2020, Validators.required],
    anoModelo: [2020, Validators.required],
    portas: [4, Validators.required],
    numeroMotor: null,
    chassi: null,
    categoriaVeiculoId: [null, Validators.required],
    marcaId: [null, Validators.required],
    modeloId: [null, Validators.required],
    versaoId: [null, Validators.required],
    corId: [null, Validators.required],
    combustivelId: [null, Validators.required],
    cambioId: [null, Validators.required],
    situacaoVeiculoId: [null, Validators.required],
    valorVenda: 0,
    valorMinimoVenda: 0,
    codigoFipe: null,
    valorFipeEntrada: 0,
    valorFipeAtual: 0,
    obs: null,
  });

  entityId!: number;

  marcas: IMarca[] = [];
  cores: ICor[] = [];
  coresSelecionadas: ICor[] = [];

  modelos: IModelo[] = [];
  modelosPorMarca: IModelo[] = [];
  versoes: IVersao[] = [];
  combustiveis: ICombustivel[] = [];
  cambios: ICambio[] = [];
  situacoes: ISituacaoVeiculo[] = [];
  categorias: ICategoriaVeiculo[] = [];

  ngOnInit() {

    this.categoriaVeiculoService.getAll().pipe(
      map(categorias => categorias.map(categoria => ({ id: categoria.id, descricao: categoria.descricao })))
    ).subscribe(categorias => {
      this.categorias = categorias;
    });

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

    this.corService.getAll().pipe(
      map(cores => cores.map(cor => ({ id: cor.id, descricao: cor.descricao })))
    ).subscribe(cores => {
      this.cores = cores;
    });

    this.versaoService.getAll().pipe(
      map(versoes => versoes.map(versao => ({ id: versao.id, descricao: versao.descricao })))
    ).subscribe(versoes => {
      this.versoes = versoes;
    });

    this.combustivelService.getAll().pipe(
      map(combustiveis => combustiveis.map(combustivel => ({ id: combustivel.id, descricao: combustivel.descricao })))
    ).subscribe(combustiveis => {
      this.combustiveis = combustiveis;
    });

    this.cambioService.getAll().pipe(
      map(cambios => cambios.map(cambio => ({ id: cambio.id, descricao: cambio.descricao })))
    ).subscribe(cambios => {
      this.cambios = cambios;
    });

    this.situacaoVeiculoService.getAll().pipe(
      map(situacoes => situacoes.map(situacao => ({ id: situacao.id, descricao: situacao.descricao })))
    ).subscribe(situacoes => {
      this.situacoes = situacoes;
    });

    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.veiculoService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['placa'].setValue(data.placa);
          this.entityForm.controls['renavam'].setValue(data.renavam);
          this.entityForm.controls['anoFabricacao'].setValue(data.anoFabricacao);
          this.entityForm.controls['anoModelo'].setValue(data.anoModelo);
          this.entityForm.controls['portas'].setValue(data.portas);
          this.entityForm.controls['numeroMotor'].setValue(data.numeroMotor);
          this.entityForm.controls['chassi'].setValue(data.chassi);
          this.entityForm.controls['categoriaVeiculoId'].setValue(data.categoriaVeiculoId);
          this.entityForm.controls['modeloId'].setValue(data.modeloId);
          this.entityForm.controls['corId'].setValue(data.corId);
          this.entityForm.controls['versaoId'].setValue(data.versaoId);
          this.entityForm.controls['combustivelId'].setValue(data.combustivelId);
          this.entityForm.controls['cambioId'].setValue(data.cambioId);
          this.entityForm.controls['situacaoVeiculoId'].setValue(data.situacaoVeiculoId);
          this.entityForm.controls['valorVenda'].setValue(data.valorVenda);
          this.entityForm.controls['valorMinimoVenda'].setValue(data.valorMinimoVenda);
          this.entityForm.controls['codigoFipe'].setValue(data.codigoFipe);
          this.entityForm.controls['valorFipeEntrada'].setValue(data.valorFipeEntrada);
          this.entityForm.controls['valorFipeAtual'].setValue(data.valorFipeAtual);
          this.entityForm.controls['obs'].setValue(data.obs);

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

      const entity: IVeiculo = {
        id: this.entityId,
        placa: this.entityForm.value.placa!,
        renavam: this.entityForm.value.renavam!,
        anoFabricacao: this.entityForm.value.anoFabricacao!,
        anoModelo: this.entityForm.value.anoModelo!,
        portas: this.entityForm.value.portas!,
        numeroMotor: this.entityForm.value.numeroMotor!,
        chassi: this.entityForm.value.chassi!,
        categoriaVeiculoId: this.entityForm.value.categoriaVeiculoId!,
        modeloId: this.entityForm.value.modeloId!,
        corId: this.entityForm.value.corId!,
        versaoId: this.entityForm.value.versaoId!,
        combustivelId: this.entityForm.value.combustivelId!,
        cambioId: this.entityForm.value.cambioId!,
        situacaoVeiculoId: this.entityForm.value.situacaoVeiculoId!,
        valorVenda: this.entityForm.value.valorVenda!,
        valorMinimoVenda: this.entityForm.value.valorMinimoVenda!,
        codigoFipe: this.entityForm.value.codigoFipe!,
        valorFipeEntrada: this.entityForm.value.valorFipeEntrada!,
        valorFipeAtual: this.entityForm.value.valorFipeAtual!,
        obs: this.entityForm.value.obs!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.veiculoService.update(entity).subscribe(() => {
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

        this.veiculoService.add(entity).subscribe(() => {
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

  addFoto() {
    const dialogRef = this.dialog.open(AddFotoComponent, {
      height: '728px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.dataSourceFoto.data.push(result);
        this.dataSourceFoto._updateChangeSubscription();
      }
    });

  }

  dialog = inject(MatDialog);

  RemoveFoto(row: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: '180px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSourceFoto.data.indexOf(row);

        if (index > -1) {
          this.dataSourceFoto.data.splice(index, 1);
          this.dataSourceFoto._updateChangeSubscription();
        }
      }
    });
  }

  carregarModelosPorMarca(event: any) {
    const marcaId = event.value;
    const modelosPorMarca = this.modelos.filter(modelo => modelo.marcaId === marcaId);
    this.modelosPorMarca = modelosPorMarca;
  }
}
