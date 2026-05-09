import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../config/api';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private http = inject(HttpClient)

  register(userData: any) {
    return this.http.post<User>(API.REGISTER, userData)
  }

  login(userData: any) {
    return this.http.post<User>(API.LOGIN, userData)
  }

}
