import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { PasswordValidator } from '../../utils/passwordValidator.util';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup | null = null;

  userEmail!: FormControl;

  userPassword!: FormControl;

  _isAuth!: boolean;

  isAuthSubscription!: Subscription;

  constructor(private route: Router, private auth: AuthService) {}

  ngOnInit() {
    this.userEmail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.userPassword = new FormControl('', [
      Validators.required,
      PasswordValidator(),
    ]);

    this.form = new FormGroup({
      userEmail: this.userEmail,
      userPassword: this.userPassword,
    });

    this.isAuthSubscription = this.auth.isAuth$.subscribe(isAuth => {
      this._isAuth = isAuth;
    });
  }

  public onSubmit(): void {
    if (!this._isAuth) {
      this.auth.login(this.userEmail.value, this.userPassword.value);
    }
  }

  ngOnDestroy(): void {
    this.isAuthSubscription.unsubscribe();
  }
}
