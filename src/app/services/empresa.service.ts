import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/user';
import { environment } from '../../environments/environment';
import { ICompany } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ICompany[]>(this.apiUrl + 'api/company')
  }

  getById(id: number) {
    return this.http.get<ICompany>(this.apiUrl + 'api/company/' + id)
  }

  add(entity: ICompany) {
    return this.http.post(this.apiUrl + 'api/company', entity)

  }

  update(entity: ICompany) {
    return this.http.put<ICompany[]>(this.apiUrl + 'api/company/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/company/' + id)
  }

}
