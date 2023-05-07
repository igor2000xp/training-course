import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  userEmail$ = new BehaviorSubject<string>(this.userEmail);

  isAuth$ = new BehaviorSubject<boolean>(!!this.authToken);

  private get authToken() {
    return localStorage.getItem('authToken');
  }

  private get userEmail() {
    const storedEmail = localStorage.getItem('email');
    return storedEmail ? storedEmail : '';
  }

  login(email: string, password: string) {
    const token = email + password;
    this.userEmail$.next(email);

    localStorage.setItem('authToken', token);
    localStorage.setItem('email', email);
    this.isAuth$.next(true);
    this.router.navigate(['/']);
  }

  logOut() {
    localStorage.clear();
    this.userEmail$.next('');
    this.isAuth$.next(false);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') ? true : false;
  }
}
