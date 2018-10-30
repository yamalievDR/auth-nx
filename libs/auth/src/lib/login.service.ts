import { Injectable } from '@angular/core';
import { AuthModule } from '@auth-nx/auth';
import { of } from 'rxjs';

export interface LoginData {
  login: string,
  password: string
}
@Injectable({
  providedIn: AuthModule
})
export class LoginService {

  constructor() { }

  login(data:LoginData) {
    return data.login === 'demo' ?  of(true): of(false);
  }
}
