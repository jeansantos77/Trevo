import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ILogin } from '../interfaces/login';
import { Observable, map } from 'rxjs';
import { IToken } from '../interfaces/token';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: ILogin):Observable<IToken> {
    return this.http.post<IToken>(this.apiUrl + 'auth/login', data)
    .pipe(
      map((res => {
        if(res.token !== null) {
          localStorage.setItem('token', res.token);
        }
        return res;
      }))
    )

  }

  isLoggedIn() : boolean {
    let token = this.getToken();

    if (!token) 
      return false;
    
    return !this.isTokenExpired();
  }

  private isTokenExpired(){
    let token = this.getToken();

    if (!token) 
      return true;
    
    let decoded = jwtDecode(token);
    
    let isTokenExpired = Date.now() >= decoded.exp! * 1000;
    
    if (isTokenExpired) 
      this.logout();

    return isTokenExpired;

  }

  getUserLogged(){
    let token = this.getToken();

    if (!token) 
      return '';

    let decoded: any = jwtDecode(token);

    return decoded.unique_name;
  }

  logout = (): void => {
    localStorage.removeItem('token');
  }

  getToken = (): string | null => localStorage.getItem('token') || '';

}
