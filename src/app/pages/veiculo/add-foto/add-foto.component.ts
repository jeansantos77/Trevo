import { Component, Inject, Input, inject } from '@angular/core';
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
import { MatDialogRef } from '@angular/material/dialog';
import { finalize, map } from 'rxjs/operators';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-foto',
  templateUrl: './add-foto.component.html',
  styleUrl: './add-foto.component.scss',
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
    MatCheckboxModule,
    MatProgressBarModule
  ]
})

export class AddFotoComponent {
  imageUrl: string = "assets/foto_carro.jpg";
  imageSize: string = '400px';

  @Input()
  requiredFileType: string | undefined;

  formName: string = "Foto do Veículo"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    nome: ['', Validators.required],
    descricao: null,
  });



  selectedFile: File | null = null;

  fileName = '';
  uploadProgress: number | null = 0;
  uploadSub: Subscription | null | undefined;

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<AddFotoComponent>,) { }

  onFileSelected(event: Event) {

    const inputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;

    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
console.log(this.selectedFile)
    //const file:File = event.target.files[0];

    if (this.selectedFile) {
      this.imageUrl = URL.createObjectURL(this.selectedFile);
      this.fileName = this.selectedFile.name;
      this.entityForm.controls['nome'].setValue(this.selectedFile.name);

      const formData = new FormData();

      formData.append("thumbnail", this.selectedFile);

      const upload$ = this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          finalize(() => this.reset())
        );

      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          if (event.total !== undefined) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        }
      })
    }
  }

  cancelUpload() {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
      this.reset();
    }
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

   cancel(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    if (this.entityForm.valid) {
      this.dialogRef.close(this.entityForm.value);
    }
  }

  

}
