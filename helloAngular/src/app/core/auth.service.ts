import { Injectable, PLATFORM_INITIALIZER } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { ConstantsController } from './constants';

@Injectable()
export class AuthService extends ConstantsController {


  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http
  ) {
    super();
  }

  // 参数属性
  private isType(o: any) {
    return ({}).toString.call(o);
  }

  // 用户登录查询
  loginWithUser(user: any) {
    if (this.isType(user) != '[object Object]') {
      return null;
    }
    if (user.name) {
      return { name: user.name, address: 'name' };
    }
  }


  // 用户注册
  registerWithUser(user: any) {
    if (this.isType(user) != '[object Object]') {
      return null;
    }

    this.http.post(`${this.APISERVER}/register`, user.users, { headers: this.headers }).toPromise().then(res => {
      let toJson = res.json();
      console.log(toJson);
    }).catch(this.handleError);


  }

  // Error
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
