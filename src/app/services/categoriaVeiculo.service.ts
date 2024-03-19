import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICategoriaVeiculo } from '../interfaces/categoriaVeiculo';

@Injectable({
  providedIn: 'root'
})
export class CategoriaVeiculoService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ICategoriaVeiculo[]>(this.apiUrl + 'api/categoriaVeiculo')
  }

  getById(id: number) {
    return this.http.get<ICategoriaVeiculo>(this.apiUrl + 'api/categoriaVeiculo/' + id)
  }

  add(entity: ICategoriaVeiculo) {
    return this.http.post(this.apiUrl + 'api/categoriaVeiculo', entity)

  }

  update(entity: ICategoriaVeiculo) {
    return this.http.put(this.apiUrl + 'api/categoriaVeiculo/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/categoriaVeiculo/' + id)
  }

}
