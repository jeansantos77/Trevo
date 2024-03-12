import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/user';
import { environment } from '../../environments/environment';
import { IState } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IState[]>(this.apiUrl + 'api/state')
  }

  getById(id: number) {
    return this.http.get<IState>(this.apiUrl + 'api/state/' + id)
  }

  add(entity: IState) {
    return this.http.post(this.apiUrl + 'api/state', entity)

  }

  update(entity: IState) {
    return this.http.put<IUser[]>(this.apiUrl + 'api/state/' + entity.id, entity)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/state/' + id)
  }

}
