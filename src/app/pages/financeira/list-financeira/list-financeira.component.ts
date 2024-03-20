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
import { FinanceiraService } from '../../../services/financeira.service';
import { IFinanceira } from '../../../interfaces/financeira';

@Component({
  selector: 'app-list-financeira',
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
  templateUrl: './list-financeira.component.html',
  styleUrl: './list-financeira.component.scss'
})


export class ListFinanceiraComponent implements OnInit, AfterViewInit {
  _liveAnnouncer = inject(LiveAnnouncer);
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);
  financeiraService = inject(FinanceiraService);
  router = inject(Router);

  formName: string = "Financeira";
  buttonTooltip: string = "Cria um novo " + this.formName;
  entityPage: string = "/financeira-form";

  displayedColumns: string[] = ['id', 'nome', 'telefone', 'contato', 'ativo', 'action'];
  dataSource = new MatTableDataSource<IFinanceira>();

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
    this.financeiraService.getAll().subscribe(data => {
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
        this.financeiraService.delete(id).subscribe(() => {
          this.toastr.success(this.formName + ' excluída com sucesso!');
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


