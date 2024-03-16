import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IModelo } from '../interfaces/modelo';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IModelo[]>(this.apiUrl + 'api/modelo')
  }

  getById(id: number) {
    return this.http.get<IModelo>(this.apiUrl + 'api/modelo/' + id)
  }

  add(entity: IModelo) {
    return this.http.post(this.apiUrl + 'api/modelo', entity)

  }

  update(entity: IModelo) {
    return this.http.put(this.apiUrl + 'api/modelo/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/modelo/' + id)
  }

}
