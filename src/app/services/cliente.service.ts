import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICliente } from '../interfaces/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ICliente[]>(this.apiUrl + 'api/cliente')
  }

  getById(id: number) {
    return this.http.get<ICliente>(this.apiUrl + 'api/cliente/' + id)
  }

  add(entity: ICliente) {
    return this.http.post(this.apiUrl + 'api/cliente', entity)

  }

  update(entity: ICliente) {
    return this.http.put(this.apiUrl + 'api/cliente/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/cliente/' + id)
  }
}
