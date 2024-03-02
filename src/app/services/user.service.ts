import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:7162";
  http = inject(HttpClient)
  constructor() { }

  getAll() {
    //return this.http.get<IUser[]>(this.apiUrl + '/api/users')

    const ELEMENT_DATA: IUser[] = [
      { id: 1, name: 'User 1', login: 'user', email: 'user@lta.com.br', password: '1234', profile: 1, situation: 1 },
      { id: 2, name: 'Teste', login: 'user', email: 'user@lta.com.br', password: '1234', profile: 2, situation: 1 },
      { id: 3, name: 'Sicrano', login: 'user', email: 'user@lta.com.br', password: '1234', profile: 3, situation: 1 },
      { id: 4, name: 'Fulano', login: 'user', email: 'user@lta.com.br', password: '1234', profile: 1, situation: 1 },
      { id: 5, name: 'Sei lá', login: 'user', email: 'user@lta.com.br', password: '1234', profile: 1, situation: 1 },
      { id: 6, name: 'Não sei', login: 'user', email: 'user@lta.com.br', password: '1234', profile: 3, situation: 1 },
    ];

    return ELEMENT_DATA;
  }

  getById(id: number) {
    //return this.http.get<IUser[]>(this.apiUrl + '/api/user/' + id)

    const ELEMENT_DATA: IUser[] = [
      { id: 3, name: 'Sicrano', login: 'user', email: 'user@lta.com.br', password: '1234', profile: 1, situation: 1 },
    ];


    return ELEMENT_DATA;

  }

  add(user: IUser) {
    //return this.http.post(this.apiUrl + '/api/user', user)

  }

  update(user: IUser) {
    //return this.http.put<IUser[]>(this.apiUrl + '/api/user', user)

    const ELEMENT_DATA: IUser[] = [
      { id: 3, name: 'Sicrano', login: 'user', email: 'user@lta.com.br', password: '1234', profile: 1, situation: 1 },
    ];


    return ELEMENT_DATA;

  }

  delete(id: number) {
    //return this.http.delete(this.apiUrl + '/api/user/' + id)

  }

}
