import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPais } from '../interfaces/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IPais[]>(this.apiUrl + 'api/pais')
  }

  getById(id: number) {
    return this.http.get<IPais>(this.apiUrl + 'api/pais/' + id)
  }

  add(entity: IPais) {
    return this.http.post(this.apiUrl + 'api/pais', entity)

  }

  update(entity: IPais) {
    return this.http.put(this.apiUrl + 'api/pais/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/pais/' + id)
  }

}
