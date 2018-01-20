import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http) {}

  registerUser(userObj) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    let options = new RequestOptions({ headers: headers });
    let body = new URLSearchParams();
    body.set('Email', userObj.Email);
    body.set('Password', userObj.Password);
    body.set('ConfirmPassword', userObj.ConfirmPassword);
    body.set('PhoneNumber2', userObj.PhoneNumber2);
    body.set('CountryName', userObj.CountryName);
    return this.http.post('https://tablesure.com/api/account/register?userType=Customer', body.toString(), options)
  }

  loginUser(userObj) {
    let loginCredentials = {
      UserName: userObj.email,
      Password: userObj.password
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let body = new URLSearchParams();
    body.set('UserName', loginCredentials.UserName);
    body.set('Password', loginCredentials.Password);
    return this.http.post('https://tablesure.com/api/login/AppUserLogin', body.toString(), options)
    .map((res)=> res.json() )
  }

  getCurrentUSer(){
    let userObj = JSON.parse(localStorage.getItem("userTokenObj"));
    let token: String = userObj.access_token;
    let tokenType: String = userObj.token_type;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${tokenType} ` + token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://tablesure.com/api/AspNetUser/GetCurrentUser', options)
    .map((res)=> res.json() )
  }

  updateProfile(updatedUser){
    console.log('WOOOO ==>', updatedUser);
    let userObj = JSON.parse(localStorage.getItem("userTokenObj"));
    let token: String = userObj.access_token;
    let tokenType: String = userObj.token_type;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${tokenType} ` + token);
    let options = new RequestOptions({ headers: headers });
    return this.http.put('https://tablesure.com/api/AspNetUser/GetCurrentUser/userProfile',updatedUser, options);
  }

}
