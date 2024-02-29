import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent {

constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>) {
}

onNoClick(): void {
  this.dialogRef.close(false);
}

onYesClick(): void {
  this.dialogRef.close(true);
}

}
