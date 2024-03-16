import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IMarca } from '../interfaces/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IMarca[]>(this.apiUrl + 'api/marca')
  }

  getById(id: number) {
    return this.http.get<IMarca>(this.apiUrl + 'api/marca/' + id)
  }

  add(entity: IMarca) {
    return this.http.post(this.apiUrl + 'api/marca', entity)

  }

  update(entity: IMarca) {
    return this.http.put(this.apiUrl + 'api/marca/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/marca/' + id)
  }

}
