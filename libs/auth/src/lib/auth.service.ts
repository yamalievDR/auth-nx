import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Authenticate, UserModel } from './models';

const mockUser = { name: 'Demo App', email: 'demo@app.io' };

@Injectable()
export class AuthService {
  constructor() {}

  login(data: Authenticate): Observable<UserModel> {
    if (data.username === 'invalidName') {
      return throwError('Invalid username or password');
    }

    return of(mockUser).pipe(delay(500));
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}
