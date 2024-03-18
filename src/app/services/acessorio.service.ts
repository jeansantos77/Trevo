import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAcessorio } from '../interfaces/acessorio';

@Injectable({
  providedIn: 'root'
})
export class AcessorioService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IAcessorio[]>(this.apiUrl + 'api/acessorio')
  }

  getById(id: number) {
    return this.http.get<IAcessorio>(this.apiUrl + 'api/acessorio/' + id)
  }

  add(entity: IAcessorio) {
    return this.http.post(this.apiUrl + 'api/acessorio', entity)

  }

  update(entity: IAcessorio) {
    return this.http.put(this.apiUrl + 'api/acessorio/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/acessorio/' + id)
  }

}
