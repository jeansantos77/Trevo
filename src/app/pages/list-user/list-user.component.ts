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
import { DeleteConfirmationComponent } from '../../shared/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../interfaces/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-list-user',
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
    RouterLink,
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})


export class ListUserComponent implements OnInit, AfterViewInit {
  _liveAnnouncer = inject(LiveAnnouncer);
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);
  userService = inject(UserService);
  router = inject(Router);

  formName: string = "Usuário";
  buttonTooltip: string = "Cria um novo " + this.formName;
  createPage: string = "/user-form";

  displayedColumns: string[] = ['id', 'name', 'login', 'email', 'profile', 'situation', 'action'];
  dataSource = new MatTableDataSource<IUser>();

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
    this.userService.getAll().subscribe(data => {
      this.dataSource.data = data;
    })
  }

  Edit(id: number) {
    this.router.navigateByUrl("/user-form/" + id);

    /*const dialogRef = this._dialog.open(UsuariosComponent, {
      width: '1300px',
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });*/

  }

  openDeleteConfirmation(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: '180px',
      width: '300px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(id).subscribe(() => {
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

  getProfile(profile: number) {
    let profileDescription = "Administrator";

    if (profile == 2) {
      profileDescription = "User";
    }
    else if (profile == 3) {
      profileDescription = "Viewer";
    }

    return profileDescription;
  }
}


