import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICor } from '../interfaces/cor';

@Injectable({
  providedIn: 'root'
})
export class CorService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ICor[]>(this.apiUrl + 'api/cor')
  }

  getById(id: number) {
    return this.http.get<ICor>(this.apiUrl + 'api/cor/' + id)
  }

  add(entity: ICor) {
    return this.http.post(this.apiUrl + 'api/cor', entity)

  }

  update(entity: ICor) {
    return this.http.put(this.apiUrl + 'api/cor/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/cor/' + id)
  }

}
