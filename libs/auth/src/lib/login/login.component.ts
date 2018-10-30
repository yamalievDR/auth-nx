import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'auth-nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    login: new FormControl(),
    password: new FormControl()
  });

  constructor() { }

  ngOnInit() {
  }

  login(form: FormGroup) {
    const { value } = form;
    console.log(value)
  }

}
