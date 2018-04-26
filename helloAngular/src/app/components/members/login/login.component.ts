import { Component, OnInit, Inject } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ConstantsController, MyErrorStateMatcher } from '../../../core/constants';


interface Users {
  name: string;
  password: string;
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  floatLabel: string = 'never';

  name: string = 'machine';
  password: string = '123456';
  email: string = '1724554570@qq.com';

  constructor(
    @Inject('authService') private authService
  ) {
  }

  nameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  ngOnInit() {
  }

  onLoginBtn(users: any) {
    console.log(users);


  }

  onRegisterBtn(users: any) {
    console.log(users);

    this.authService.registerWithUser(users).then(resp => {
      console.log(resp);
    })


  }

}
