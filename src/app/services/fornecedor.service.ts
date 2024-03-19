import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IFornecedor } from '../interfaces/fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IFornecedor[]>(this.apiUrl + 'api/fornecedor')
  }

  getById(id: number) {
    return this.http.get<IFornecedor>(this.apiUrl + 'api/fornecedor/' + id)
  }

  add(entity: IFornecedor) {
    return this.http.post(this.apiUrl + 'api/fornecedor', entity)

  }

  update(entity: IFornecedor) {
    return this.http.put(this.apiUrl + 'api/fornecedor/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/fornecedor/' + id)
  }

}
