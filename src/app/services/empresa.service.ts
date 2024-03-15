import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IEmpresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IEmpresa[]>(this.apiUrl + 'api/empresa')
  }

  getById(id: number) {
    return this.http.get<IEmpresa>(this.apiUrl + 'api/empresa/' + id)
  }

  add(entity: IEmpresa) {
    return this.http.post(this.apiUrl + 'api/empresa', entity)

  }

  update(entity: IEmpresa) {
    return this.http.put(this.apiUrl + 'api/empresa/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/empresa/' + id)
  }

}
