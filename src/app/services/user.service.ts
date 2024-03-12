import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IUser[]>(this.apiUrl + 'api/user')
  }

  getById(id: number) {
    return this.http.get<IUser>(this.apiUrl + 'api/user/' + id)
  }

  add(user: IUser) {
    return this.http.post(this.apiUrl + 'api/user', user)

  }

  update(user: IUser) {
    return this.http.put<IUser[]>(this.apiUrl + 'api/user/' + user.id, user)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/user/' + id)
  }

}
