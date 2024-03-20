import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IFinanceira } from '../interfaces/financeira';

@Injectable({
  providedIn: 'root'
})
export class FinanceiraService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IFinanceira[]>(this.apiUrl + 'api/financeira')
  }

  getById(id: number) {
    return this.http.get<IFinanceira>(this.apiUrl + 'api/financeira/' + id)
  }

  add(entity: IFinanceira) {
    return this.http.post(this.apiUrl + 'api/financeira', entity)

  }

  update(entity: IFinanceira) {
    return this.http.put(this.apiUrl + 'api/financeira/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/financeira/' + id)
  }

}
