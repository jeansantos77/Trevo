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
import { ClienteService } from '../../../services/cliente.service';
import { ICliente } from '../../../interfaces/cliente';
import { NgxMaskDirective } from 'ngx-mask';
import { CidadeService } from '../../../services/cidade.service';
import { map } from 'rxjs/operators';
import { ICidade } from '../../../interfaces/cidade';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IModeloDesejado } from '../../../interfaces/modeloDesejado';
import { DeleteConfirmationComponent } from '../../../shared/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { IFormaPagto } from '../../../interfaces/formaPagto';
import { FormaPagtoService } from '../../../services/formaPagto.service';
import { AddModeloComponent } from './add-modelo/add-modelo.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
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
    MatTooltipModule
  ]
})
export class ClienteFormComponent {

  constructor(private dateAdapter: DateAdapter<Date>, private datePipe: DatePipe) {
    this.dateAdapter.setLocale('pt-BR');
  }

  dataSource = new MatTableDataSource<IModeloDesejado>();
  displayedColumns: string[] = ['marca', 'modelo', 'cor', 'versao', 'action'];

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private clienteService = inject(ClienteService);
  private authService = inject(AuthService);
  private cidadeService = inject(CidadeService);
  private formaPagtoService = inject(FormaPagtoService);

  formName: string = "Cliente"
  listPage: string = "/list-cliente"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    nome: [null, Validators.required],
    nascimento: ['', Validators.required],
    email: [null, [Validators.required, Validators.email]],
    telefone: [null, Validators.required],
    cpf: [null, Validators.required],
    cep: [null, Validators.required],
    logradouro: [null, Validators.required],
    numero: [null, Validators.required],
    complemento: null,
    bairro: [null, Validators.required],
    cidadeId: [null, Validators.required],
    formaPagamentoId: [null, Validators.required],
    obs: null,
    modelosDesejados: [[]]
  });

  entityId!: number;

  cities: ICidade[] = [];
  formas: IFormaPagto[] = [];

  ngOnInit() {

    this.cidadeService.getAll().pipe(
      map(cities => cities.map(city => ({ id: city.id, nome: city.nome })))
    ).subscribe(cities => {
      this.cities = cities;
    });

    this.formaPagtoService.getAll().pipe(
      map(formas => formas.map(forma => ({ id: forma.id, descricao: forma.descricao })))
    ).subscribe(formas => {
      this.formas = formas;
    });

    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.clienteService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['nome'].setValue(data.nome);
          this.entityForm.controls['nascimento'].setValue(this.formatDate(data.nascimento));
          this.entityForm.controls['email'].setValue(data.email);
          this.entityForm.controls['telefone'].setValue(data.telefone);
          this.entityForm.controls['cpf'].setValue(data.cpf);
          this.entityForm.controls['cep'].setValue(data.cep);
          this.entityForm.controls['logradouro'].setValue(data.logradouro);
          this.entityForm.controls['numero'].setValue(data.numero);
          this.entityForm.controls['complemento'].setValue(data.complemento);
          this.entityForm.controls['bairro'].setValue(data.bairro);
          this.entityForm.controls['cidadeId'].setValue(data.cidadeId);
          this.entityForm.controls['formaPagamentoId'].setValue(data.formaPagamentoId);
          this.entityForm.controls['obs'].setValue(data.obs);

          this.entityForm.patchValue({
            modelosDesejados: data.modelosDesejados
          });

          this.dataSource.data = data.modelosDesejados;

        }
      },
        (error: any) => {
          this.toastr.error(error.error)
        });
    }

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  Save(): void {

    let userLogged = this.authService.getUserLogged();

    if (this.entityForm.valid) {

      const entity: ICliente = {
        id: this.entityId,
        nome: this.entityForm.value.nome!,
        nascimento: new Date(this.entityForm.value.nascimento!),
        email: this.entityForm.value.email!,
        telefone: this.entityForm.value.telefone!,
        cpf: this.entityForm.value.cpf!,
        cep: this.entityForm.value.cep!,
        logradouro: this.entityForm.value.logradouro!,
        numero: this.entityForm.value.numero!,
        complemento: this.entityForm.value.complemento!,
        bairro: this.entityForm.value.bairro!,
        cidadeId: this.entityForm.value.cidadeId!,
        formaPagamentoId: this.entityForm.value.formaPagamentoId!,
        modelosDesejados: this.dataSource.data,
        obs: this.entityForm.value.obs!,
        atualizadoPor: userLogged,
        atualizadoEm: new Date()
      }

      if (this.entityId > 0) {
        this.clienteService.update(entity).subscribe(() => {
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

        this.clienteService.add(entity).subscribe(() => {
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

  addModel() { 
    const dialogRef = this.dialog.open(AddModeloComponent, {
      height: '590px',
      width: '500px',
      data: { modelos: this.dataSource.data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription();
      }
    });

  }

  dialog = inject(MatDialog);
  openDeleteConfirmation(row: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: '180px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.indexOf(row);

        if (index > -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }

}
