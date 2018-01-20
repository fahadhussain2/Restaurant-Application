import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DealsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DealsProvider {

  navCtrl;
  myCartItems:number;

  constructor(public http: Http) {
    console.log('Hello DealsProvider Provider');
    this.getCart().subscribe((myCart)=>{
      this.myCartItems = myCart.length;
    })
  }

  dealsList() {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://www.tablesure.com/api/DealListVM?city=Bengaluru&location=&category=&orderBy=&IsOrderByAsc=false&currentPage=1&pageSize=40', options)
      .map((res) => res.json())
  }

  getDealDetails(dealId) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://www.tablesure.com/api/DealLandingVM?dealId=' + dealId, options)
      .map((res) => res.json())
  }

  addToCart(dealObj) {
    let userObj = JSON.parse(localStorage.getItem("userTokenObj"));
    let token: String = userObj.access_token;
    let tokenType: String = userObj.token_type;
    let headers = new Headers();
    headers.append('Authorization', `${tokenType} ` + token);
    let options = new RequestOptions({ headers: headers });
    for (var index in dealObj) {
      return this.http.post('http://www.tablesure.com/api/DealCart', dealObj[index], options)
    }
  }

  getCart() {
    let userObj = JSON.parse(localStorage.getItem("userTokenObj"));
    let token: String = userObj.access_token;
    let tokenType: String = userObj.token_type;
    let headers = new Headers();
    headers.append('Authorization', `${tokenType} ` + token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://www.tablesure.com/api/DealCart', options)
      .map((res) => res.json())
  }

  updateCart(cartObj){
    let cart = cartObj;
    console.log('CART ==>', cart)
    let userObj = JSON.parse(localStorage.getItem("userTokenObj"));
    let token: String = userObj.access_token;
    let tokenType: String = userObj.token_type;
    let headers = new Headers();
    headers.append('Authorization', `${tokenType} ` + token);
    let options = new RequestOptions({ headers: headers });
    return this.http.put('http://www.tablesure.com/api/DealCart',cart, options)
  }

  deleteCart(id){
    let userObj = JSON.parse(localStorage.getItem("userTokenObj"));
    let token: String = userObj.access_token;
    let tokenType: String = userObj.token_type;
    let headers = new Headers();
    headers.append('Authorization', `${tokenType} ` + token);
    let options = new RequestOptions({ headers: headers });
    return this.http.delete('http://www.tablesure.com/api/DealCart/'+id, options)
  }

}
