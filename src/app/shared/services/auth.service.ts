import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(userData: UserDetails): Observable<any> {
    return this._http.post(`${environment.baseURL}/login`, userData);
  }

  logout() {
    localStorage.clear()
  }
}
