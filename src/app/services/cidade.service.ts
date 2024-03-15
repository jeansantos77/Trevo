import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICidade } from '../interfaces/cidade';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ICidade[]>(this.apiUrl + 'api/cidade')
  }

  getById(id: number) {
    return this.http.get<ICidade>(this.apiUrl + 'api/cidade/' + id)
  }

  add(entity: ICidade) {
    return this.http.post(this.apiUrl + 'api/cidade', entity)

  }

  update(entity: ICidade) {
    return this.http.put(this.apiUrl + 'api/cidade/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/cidade/' + id)
  }

}
