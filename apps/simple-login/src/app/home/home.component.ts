import { Component, OnInit } from '@angular/core';
import { AuthState, Logout } from '@auth-nx/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'auth-nx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}

  ngOnInit() {}

  logOut() {
    this.store.dispatch(new Logout());
  }
}
