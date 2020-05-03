import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from 'src/app/models/token';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersApiUri = 'https://localhost:44383/api/authentication';

  constructor(
    private http: HttpClient
  ) { }

  registerUser(userName: string, email: string, phoneNumber: string, password: string) {
    const url = this.usersApiUri;
    return this.http.post(url, { userId:0, email, login: userName,  phoneNumber, password}, { observe: 'response' });
  }

  getUserName(): string {
    return localStorage.getItem('userName');
  }

  getToken(): Token {
    if (this.checkTokenExpired()) {
      return null;
    }

    const token = localStorage.getItem('token');
    const expiration = new Date(localStorage.getItem('expiration'));
    const userName = localStorage.getItem('userName');
    return { token, expiration, userName };
  }

  checkTokenExpired(): boolean {
    const expiration = localStorage.getItem('expiration');
    if (expiration == null || new Date(expiration) < new Date()) {
      this.deleteToken();
      return true;
    }

    return false;
  }

  getNewToken(email: string, password: string, callback: (token: Token) => void): void {
    const url = `${this.usersApiUri}/token`;
    this.http.post<Token>(url, { email, password }).subscribe(tok => {
        this.saveToken(tok);
        callback(tok);
      }, err => callback(null));
  }

  saveToken(token: Token): void {
    localStorage.setItem('token', `Bearer ${token.token}`);
    localStorage.setItem('expiration', token.expiration.toString());
    localStorage.setItem('userName', token.userName);
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userName');
  }

  updateUser(user: User, token: Token): Observable<User>{
    const url = `${this.usersApiUri}`;
    const headers = new HttpHeaders({ Authorization: token.token });
    return this.http.put<User>(url, user, { headers });
  }
}