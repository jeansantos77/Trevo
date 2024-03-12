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
import { IUser } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { ICompany } from '../../interfaces/company';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
  standalone: true,
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
    MatIconModule
  ]
})
export class CompanyFormComponent {

  private toastr = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private companyService = inject(CompanyService);
  private authService = inject(AuthService);

  formName: string = "Empresa"
  listPage: string = "/list-company"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, Validators.required],
    cnpj: [null, Validators.required],
    externalId: [0, Validators.required],
    cep: [null, Validators.required],
    street: [null, Validators.required],
    number: [null, Validators.required],
    district: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    active: true

  });

  situations = [
    { description: 'Ativo', value: true },
    { description: 'Inativo', value: false }
  ];

  states = [
    { description: 'Rio Grande do Sul', value: 'RS' },
    { description: 'Santa Catarina', value: 'SC' }
  ];


  defaultSituation = true

  entityId!: number;

  ngOnInit() {
    this.entityId = this.route.snapshot.params['id'];

    if (this.entityId) {
      this.companyService.getById(this.entityId).subscribe((data: any) => {

        if (data != null) {
          this.entityForm.controls['name'].setValue(data.name);
          this.entityForm.controls['email'].setValue(data.email);
          this.entityForm.controls['phone'].setValue(data.phone);
          this.entityForm.controls['cnpj'].setValue(data.cnpj);
          this.entityForm.controls['externalId'].setValue(data.externalId);
          this.entityForm.controls['cep'].setValue(data.cep);
          this.entityForm.controls['street'].setValue(data.street);
          this.entityForm.controls['number'].setValue(data.number);
          this.entityForm.controls['district'].setValue(data.district);
          this.entityForm.controls['city'].setValue(data.city);
          this.entityForm.controls['state'].setValue(data.state);
          this.entityForm.controls['active'].setValue(data.active);
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

      const entity: ICompany = {
        id: this.entityId,
        name: this.entityForm.value.name!,
        email: this.entityForm.value.email!,
        phone: this.entityForm.value.phone!,
        cnpj: this.entityForm.value.cnpj!,
        externalId: this.entityForm.value.externalId!,
        cep: this.entityForm.value.cep!,
        street: this.entityForm.value.street!,
        number: this.entityForm.value.number!,
        district: this.entityForm.value.district!,
        city: this.entityForm.value.city!,
        state: this.entityForm.value.state!,
        active: this.entityForm.value.active!,
        updatedBy: userLogged,
        updatedAt: new Date()
      }

      if (this.entityId > 0) {
        this.companyService.update(entity).subscribe(() => {
          this.toastr.success(this.formName + ' alterada com sucesso!');
          this.redirectList();
        },
          (error: any) => {
            this.toastr.error(error.error || error.message)
          });
      }
      else {
        entity.createdBy = userLogged;
        entity.createdAt = new Date();

        this.companyService.add(entity).subscribe(() => {
          this.toastr.success(this.formName + ' salva com sucesso!');
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

}
