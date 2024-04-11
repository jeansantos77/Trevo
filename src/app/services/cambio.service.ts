import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICambio } from '../interfaces/cambio';

@Injectable({
  providedIn: 'root'
})
export class CambioService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ICambio[]>(this.apiUrl + 'api/cambio')
  }

  getById(id: number) {
    return this.http.get<ICambio>(this.apiUrl + 'api/cambio/' + id)
  }

  add(entity: ICambio) {
    return this.http.post(this.apiUrl + 'api/cambio', entity)

  }

  update(entity: ICambio) {
    return this.http.put(this.apiUrl + 'api/cambio/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/cambio/' + id)
  }

}
