import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICategoriaDespesa } from '../interfaces/categoriaDespesa';

@Injectable({
  providedIn: 'root'
})
export class CategoriaDespesaService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ICategoriaDespesa[]>(this.apiUrl + 'api/categoriaDespesa')
  }

  getById(id: number) {
    return this.http.get<ICategoriaDespesa>(this.apiUrl + 'api/categoriaDespesa/' + id)
  }

  add(entity: ICategoriaDespesa) {
    return this.http.post(this.apiUrl + 'api/categoriaDespesa', entity)

  }

  update(entity: ICategoriaDespesa) {
    return this.http.put(this.apiUrl + 'api/categoriaDespesa/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/categoriaDespesa/' + id)
  }

}
