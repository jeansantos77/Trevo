import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../../shared/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { VeiculoService } from '../../../services/veiculo.service';
import { IVeiculo } from '../../../interfaces/veiculo';

@Component({
  selector: 'app-list-veiculo',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatTooltipModule,
    RouterLink
  ],
  templateUrl: './list-veiculo.component.html',
  styleUrl: './list-veiculo.component.scss'
})


export class ListVeiculoComponent implements OnInit, AfterViewInit {
  _liveAnnouncer = inject(LiveAnnouncer);
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);
  veiculoService = inject(VeiculoService);
  router = inject(Router);

  formName: string = "Veículo";
  buttonTooltip: string = "Cria um novo " + this.formName;
  entityPage: string = "/veiculo-form";

  displayedColumns: string[] = ['placa', 'marca', 'modelo', 'versao', 'cor', 'anoModelo', 'action'];
  dataSource = new MatTableDataSource<IVeiculo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.firstPageLabel = 'Primeira';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.nextPageLabel = 'Próxima';
    this.paginator._intl.lastPageLabel = 'Última';

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadData() {
    this.veiculoService.getAll().subscribe(data => {
      this.dataSource.data = data;
    })
  }

  Edit(id: number) {
    this.router.navigateByUrl(`${this.entityPage}/${id}`);
  }

  openDeleteConfirmation(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: '180px',
      width: '300px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.veiculoService.delete(id).subscribe(() => {
          this.toastr.success(this.formName + ' excluído com sucesso!');
          this.loadData();
        },
        (error: any) => {
          this.toastr.error(error.error)
        });
      }
    });
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}


