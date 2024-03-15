import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUsuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl: string = environment.apiUrl;

  http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<IUsuario[]>(this.apiUrl + 'api/usuario')
  }

  getById(id: number) {
    return this.http.get<IUsuario>(this.apiUrl + 'api/usuario/' + id)
  }

  add(usuario: IUsuario) {
    return this.http.post(this.apiUrl + 'api/usuario', usuario)

  }

  update(usuario: IUsuario) {
    return this.http.put(this.apiUrl + 'api/usuario/' + usuario.id, usuario)
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'api/usuario/' + id)
  }

}
