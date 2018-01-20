import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EmailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmailProvider {

  constructor(public http: Http) {
    console.log('Hello EmailProvider Provider');
  }

  sendEmail(token) {


    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer '+token);    
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://www.tablesure.com/api/Account/GenerateConfirmEmailLink', options)
    .map(res => res.json())
  }

}
