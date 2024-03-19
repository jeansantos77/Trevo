import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IVendedor } from '../interfaces/vendedor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IVendedor[]>(this.apiUrl + 'api/vendedor')
  }

  getById(id: number) {
    return this.http.get<IVendedor>(this.apiUrl + 'api/vendedor/' + id)
  }

  add(usuario: IVendedor) {
    return this.http.post(this.apiUrl + 'api/vendedor', usuario)

  }

  update(usuario: IVendedor) {
    return this.http.put(this.apiUrl + 'api/vendedor/' + usuario.id, usuario)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/vendedor/' + id)
  }

}
