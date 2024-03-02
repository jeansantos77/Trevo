import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer} from '@angular/cdk/a11y';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../shared/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../interfaces/IUser';
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
  _liveAnnouncer= inject(LiveAnnouncer);
  _dialog= inject( MatDialog);
  _toastr = inject(ToastrService);
  _userService = inject(UserService);
  _router = inject(Router);

  formName: string = "Usuário";
  buttonTooltip: string = "Cria um novo " + this.formName;
  createPage: string = "/user-form";

  _userList : IUser [] = [];

  displayedColumns: string[] = ['id', 'name', 'login', 'email', 'profile', 'situation', 'action'];
  dataSource = new MatTableDataSource<IUser>(this._userList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    /*this._userService.getAll().subscribe(data => {
      this._userList = data;  
    })*/

    this._userList = this._userService.getAll()

  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<IUser>(this._userList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.firstPageLabel = 'Primeira';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.nextPageLabel = 'Próxima';
    this.paginator._intl.lastPageLabel = 'Última';

  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  Edit(id: number) {
    this._router.navigateByUrl("/user-form/" + id);
    
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
    const dialogRef = this._dialog.open(DeleteConfirmationComponent, {
      height: '180px',
      width: '300px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this._userService.delete(id).subscribe(() => {
          this._toastr.success(this.formName + ' excluído com sucesso!');
          this._userList = this._userList.filter(x => x.id != id);
          this.dataSource = new MatTableDataSource<IUser>(this._userList);
        //})

        
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

  getProfile(profile : number) {
    let profileDescription = "Administrator";

    if (profile == 2)
    {
      profileDescription = "User";
    }
    else if (profile == 3)
    {
      profileDescription = "Viewer";
    }

    return profileDescription;
    
  }

}


