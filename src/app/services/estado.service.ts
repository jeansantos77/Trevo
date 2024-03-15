import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IEstado } from '../interfaces/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IEstado[]>(this.apiUrl + 'api/estado')
  }

  getById(id: number) {
    return this.http.get<IEstado>(this.apiUrl + 'api/estado/' + id)
  }

  add(entity: IEstado) {
    return this.http.post(this.apiUrl + 'api/estado', entity)

  }

  update(entity: IEstado) {
    return this.http.put(this.apiUrl + 'api/estado/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/estado/' + id)
  }

}
