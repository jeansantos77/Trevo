import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ITipoDespesa } from '../interfaces/tipoDespesa';

@Injectable({
  providedIn: 'root'
})
export class TipoDespesaService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ITipoDespesa[]>(this.apiUrl + 'api/tipoDespesa')
  }

  getById(id: number) {
    return this.http.get<ITipoDespesa>(this.apiUrl + 'api/tipoDespesa/' + id)
  }

  add(entity: ITipoDespesa) {
    return this.http.post(this.apiUrl + 'api/tipoDespesa', entity)

  }

  update(entity: ITipoDespesa) {
    return this.http.put(this.apiUrl + 'api/tipoDespesa/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/tipoDespesa/' + id)
  }

}
