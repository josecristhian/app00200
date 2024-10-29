import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class AppService  {

  APPCODE = 'app00100';

  constructor () {}

  getAppCode() {
    return this.APPCODE;
  }

}
