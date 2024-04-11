import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IVeiculo } from '../interfaces/veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IVeiculo[]>(this.apiUrl + 'api/veiculo')
  }

  getById(id: number) {
    return this.http.get<IVeiculo>(this.apiUrl + 'api/veiculo/' + id)
  }

  add(entity: IVeiculo) {
    return this.http.post(this.apiUrl + 'api/veiculo', entity)

  }

  update(entity: IVeiculo) {
    return this.http.put(this.apiUrl + 'api/veiculo/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/veiculo/' + id)
  }

}
