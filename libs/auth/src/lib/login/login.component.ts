import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { authQuery } from '../+state';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../+state/auth.reducer';
import * as fromActions from '../+state/auth.actions';

@Component({
  selector: 'auth-nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  error$ = this.store.pipe(select(authQuery.getError));

  constructor(private store: Store<fromStore.AuthState>) {}

  login(form: FormGroup) {
    const { value } = form;
    this.store.dispatch(new fromActions.Login(value));
  }

  ngOnInit() {}
}
