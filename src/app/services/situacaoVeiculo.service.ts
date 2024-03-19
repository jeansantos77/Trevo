import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ISituacaoVeiculo } from '../interfaces/situacaoVeiculo';

@Injectable({
  providedIn: 'root'
})
export class SituacaoVeiculoService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ISituacaoVeiculo[]>(this.apiUrl + 'api/situacaoVeiculo')
  }

  getById(id: number) {
    return this.http.get<ISituacaoVeiculo>(this.apiUrl + 'api/situacaoVeiculo/' + id)
  }

  add(entity: ISituacaoVeiculo) {
    return this.http.post(this.apiUrl + 'api/situacaoVeiculo', entity)

  }

  update(entity: ISituacaoVeiculo) {
    return this.http.put(this.apiUrl + 'api/situacaoVeiculo/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/situacaoVeiculo/' + id)
  }

}
