import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

/*
  Generated class for the TablebookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TablebookingProvider {

  loader: boolean = true;

  constructor(public http: Http) {
    console.log('Hello TablebookingProvider Provider');
  }

  getAllTypes() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://www.tablesure.com/api/RestaurantListVM/GetSetupFilter?country=India', options)
      .map(res => res.json())
  }

  getAllRestaurants(currentPage, filterValues) {
    let body = {
      countryName: "",
      stateName: "",
      locationNames: [],
      filteredCuisines: filterValues.cuisines,
      filteredFeatures: filterValues.features,
      filteredRestaurantTypes: filterValues.types,
      pageSize: 6,
      currentPage: currentPage
    }
    let city = !filterValues.selectedCity ? 'Bengaluru' : filterValues.selectedCity;
    // console.log('check city', city);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://www.tablesure.com/api/RestaurantListVM/GetCustom?city=' + city + '&query=', body, options)
      .map(res => res.json())
  }

  getFeaturedRestaurants(currentPage, filterValues) {
    let body = {
      countryName: "",
      stateName: "",
      locationNames: [],
      filteredCuisines: filterValues.cuisines,
      filteredFeatures: filterValues.features,
      filteredRestaurantTypes: filterValues.types,
      pageSize: 60,
      currentPage: currentPage
    }
    let city = !filterValues.selectedCity ? 'Bengaluru' : filterValues.selectedCity;
    console.log('check city', city);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://www.tablesure.com/api/RestaurantListVM/GetCustom?city=' + city + '&query=', body, options)
      .map(res => res.json())
  }

  getNearByRestaurants(filterValues) {
    let body = {
      countryName: "",
      stateName: "",
      locationNames: [],
      filteredCuisines: filterValues.cuisines,
      filteredFeatures: filterValues.features,
      filteredRestaurantTypes: filterValues.types,
      pageSize: 100,
      currentPage: 1
    }
    let city = !filterValues.selectedCity ? 'Bengaluru' : filterValues.selectedCity;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://www.tablesure.com/api/RestaurantListVM/GetCustom?city=' + city + '&query=', body, options)
      .map(res => res.json())
  }

  getDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
  }

  getRestaurantDetails(restaurantId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://www.tablesure.com/api/RestaurantLandingVM?restaurantId=' + restaurantId, options)
      .map(res => res.json())
  }

  getRestaurantOffers(restaurantOffer) {
    console.log(restaurantOffer);
    let restaurantId = restaurantOffer.restaurantId;
    let noOfPersons = restaurantOffer.noOfPersons;
    let selectedDate = restaurantOffer.selectedDate;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://www.tablesure.com/api/RestaurantLandingVM/GetRestaurantOffers?restaurantId=' + restaurantId + '&selectedDate=' + selectedDate + '&noOfPerson=' + noOfPersons, options)
      .map(res => res.json())
  }

  reserveMe(payload){
    console.log('payload ==>', payload);
    let userObj = JSON.parse(localStorage.getItem("userTokenObj"));
    let token: String = userObj.access_token;
    let tokenType: String = userObj.token_type;
    let body = payload;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${tokenType} ` + token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://www.tablesure.com/api/RestaurantTableBooking?timezoneOffset=-3000', body, options)
      .map(res => res.json())
  }

  getBookingSummary(registratioNo){
    let userObj = JSON.parse(localStorage.getItem("userTokenObj"));
    let token: String = userObj.access_token;
    let tokenType: String = userObj.token_type;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${tokenType} ` + token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://www.tablesure.com/api/RestaurantBookingSummaryVM?bookingId='+registratioNo, options)
      .map(res => res.json())
  }

  makePayment(paymentObj){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://pguat.paytm.com/oltp-web/processTransaction?orderid='+paymentObj.ORDER_ID, options)
  }


}
