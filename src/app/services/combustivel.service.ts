import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICombustivel } from '../interfaces/combustivel';

@Injectable({
  providedIn: 'root'
})
export class CombustivelService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ICombustivel[]>(this.apiUrl + 'api/combustivel')
  }

  getById(id: number) {
    return this.http.get<ICombustivel>(this.apiUrl + 'api/combustivel/' + id)
  }

  add(entity: ICombustivel) {
    return this.http.post(this.apiUrl + 'api/combustivel', entity)

  }

  update(entity: ICombustivel) {
    return this.http.put(this.apiUrl + 'api/combustivel/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/marca/' + id)
  }

}
