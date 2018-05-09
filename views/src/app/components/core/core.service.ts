import { Injectable } from '@angular/core';

@Injectable()
export default class CoreService {

  SERVER = '//127.0.0.1';

  constructor() {
    console.log(location.host);
    if (location.host) {
    }
  }

}
