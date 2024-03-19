import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IFormaPagto } from '../interfaces/formaPagto';

@Injectable({
  providedIn: 'root'
})
export class FormaPagtoService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IFormaPagto[]>(this.apiUrl + 'api/formaPagamento')
  }

  getById(id: number) {
    return this.http.get<IFormaPagto>(this.apiUrl + 'api/formaPagamento/' + id)
  }

  add(entity: IFormaPagto) {
    return this.http.post(this.apiUrl + 'api/formaPagamento', entity)

  }

  update(entity: IFormaPagto) {
    return this.http.put(this.apiUrl + 'api/formaPagamento/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/formaPagamento/' + id)
  }

}
