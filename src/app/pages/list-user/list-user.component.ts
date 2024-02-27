import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
import { RouterLink } from '@angular/router';

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


export class ListUserComponent implements AfterViewInit {

  createPage: string = "/user-form"

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  openEditForm(data: any) {
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

    console.log('Valor de algumaVariavel:');
  }

  deleteEmployee(id: number) {
    /*this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });*/

    console.log('Valor de algumaVariavel: delete');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'x Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 12, name: 'x Helium', weight: 4.0026, symbol: 'He'},
  {position: 13, name: 'x Lithium', weight: 6.941, symbol: 'Li'},
  {position: 14, name: 'y Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 15, name: 'y Boron', weight: 10.811, symbol: 'B'},
  {position: 16, name: 'y Carbon', weight: 12.0107, symbol: 'C'},
  {position: 17, name: 'y Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 18, name: 'y Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 19, name: 'y Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 20, name: 'y Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 21, name: 'a Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 22, name: 'a Helium', weight: 4.0026, symbol: 'He'},
  {position: 23, name: 'a Lithium', weight: 6.941, symbol: 'Li'},
  {position: 24, name: 'a Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 25, name: 'a Boron', weight: 10.811, symbol: 'B'},
  {position: 26, name: 'a Carbon', weight: 12.0107, symbol: 'C'},
  {position: 27, name: 'a Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 28, name: 'a Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 29, name: 'a Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 30, name: 'a Neon', weight: 20.1797, symbol: 'Ne'},

];