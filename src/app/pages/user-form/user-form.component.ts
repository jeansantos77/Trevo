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
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
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
export class UserFormComponent {

  private _toastr = inject(ToastrService)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _userService = inject(UserService);

  formName: string = "Usuário"
  listPage: string = "/list-user"
  requiredMessage: string = "Campo obrigatório"

  private fb = inject(FormBuilder);
  entityForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    login: [null, Validators.required],
    password: [null, Validators.required],
    profile: [1, Validators.required],
    situation: 1



    
    
    /*state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]*/
  });

  profiles = [
    {name: 'Administrator', value: 1},
    {name: 'User', value: 2},
    {name: 'Viewer', value: 3}
  ];

  defaultProfile= 1;

  situations = [
    {description: 'Ativo', value: 1},
    {description: 'Inativo', value: 0}
  ];

  defaultSituation = 1

  entityId! : number;

  ngOnInit() {
    this.entityId = this._route.snapshot.params['id'];
    
    if (this.entityId)
    {
      /*this._userService.getById(id).subscribe(data => {
        this.entityForm.patchValue(data);
      })*/


         //this.entityForm.controls.email.disable();


    }
    
  }

  Save(): void {

    if (this.entityForm.valid)
    {

      const entity: IUser = {
        id: this.entityId,
        name : this.entityForm.value.name!,
        login: this.entityForm.value.login!,
        email : this.entityForm.value.email!,
        password: this.entityForm.value.password!,
        profile: this.entityForm.value.profile!,
        situation: this.entityForm.value.situation!,
        updatedBy: "usuário que alterou",
        updatedAt: new Date()
      }

      if (this.entityId > 0)
      {


        //this._userService.update(entity).subscribe(() => {

          this._toastr.success(this.formName + ' alterado com sucesso!');
        //})

      }
      else
      {
        entity.createdBy = "usuário que criou";
        entity.createdAt = new Date();

        //this._userService.add(entity).subscribe(() => {

        //  this._toastr.success(this.formName + ' salvo com sucesso!');
          this._router.navigateByUrl("/list-user");
        //})
      }

      this._router.navigateByUrl("/list-user"); 
  
      
    }


  }

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
