import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IVersao } from '../interfaces/versao';

@Injectable({
  providedIn: 'root'
})
export class VersaoService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IVersao[]>(this.apiUrl + 'api/versao')
  }

  getById(id: number) {
    return this.http.get<IVersao>(this.apiUrl + 'api/versao/' + id)
  }

  add(entity: IVersao) {
    return this.http.post(this.apiUrl + 'api/versao', entity)

  }

  update(entity: IVersao) {
    return this.http.put(this.apiUrl + 'api/versao/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/versao/' + id)
  }

}
