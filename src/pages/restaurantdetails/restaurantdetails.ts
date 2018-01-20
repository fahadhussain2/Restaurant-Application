import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';


/**
 * Generated class for the RestaurantdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurantdetails',
  templateUrl: 'restaurantdetails.html',
})
export class RestaurantdetailsPage {

  @ViewChild(Slides) slides: Slides;

  restaurantDetails;
  ImageUrls = [];
  cuisines = [];
  features = [];
  menuItem:any = {} ;
  selectedSegment = 'Details'

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.restaurantDetails = this.navParams.get('restaurantDetails');
    console.log('details', this.restaurantDetails);
    if (this.restaurantDetails) {
      if (this.restaurantDetails.RestaurantResource) {
        this.restaurantDetails.RestaurantResource.forEach(restaurantResource => {
          this.ImageUrls.push(restaurantResource.Url);
        });
      }
      if (this.restaurantDetails.RestaurantCuisines) {
        this.restaurantDetails.RestaurantCuisines.forEach(restaurantCuisine => {
          this.cuisines.push(restaurantCuisine.CuisineName);
        });
      }
      if (this.restaurantDetails.RestaurantFeatures) {
        this.restaurantDetails.RestaurantFeatures.forEach(restaurantFeature => {
          this.features.push(restaurantFeature.FeatureName);
        });
      }
      if (this.restaurantDetails.RestaurantMenuResourceVM) {
        //to be continued from here
        this.restaurantDetails.RestaurantMenuResourceVM.forEach(menu => {
          this.menuItem.RestaurantMenu =  menu.RestaurantMenu;
          this.menuItem.RestaurantMenuResource = menu.RestaurantMenuResource;
        });

      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantdetailsPage');
  }

  // goToSlide() {
  //   this.slides.slideTo(2, 500);
  // }

  ISOToAMPM(TimeStamp) {
    let date = new Date(TimeStamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amorpm;

    if (hours == 0) {
      amorpm = "am"
    }
    else if (hours == 12) {
      amorpm = "pm"
    }
    else if (hours > 12) {
      amorpm = "pm";
      hours -= 12
    }
    else {
      amorpm = "am"
    }

    hours < 10 ? hours = 0 + hours : hours;
    minutes < 10 ? minutes = 0 + minutes : minutes;

    var formatedDate = hours + ":" + minutes + amorpm;
    // console.log(minutes,TimeStamp,formatedDate)
    return formatedDate;

  }

}
