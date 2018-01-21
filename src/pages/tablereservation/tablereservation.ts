import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { TablebookingProvider } from '../../providers/tablebooking/tablebooking';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMap, GoogleMaps, GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps';
import { RestaurantdetailsPage } from '../../pages/restaurantdetails/restaurantdetails';
import { DealsProvider } from '../../providers/deals/deals'

/**
 * Generated class for the TablereservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tablereservation',
  templateUrl: 'tablereservation.html',
})
export class TablereservationPage {

  allTypes = [];
  cities = [];
  restaurantTypes = [];
  restaurantFeatures = [];
  restaurantCuisines = [];
  restaurants = [];
  restaurantOffers = [];
  featuredRestaurants = [];
  nearByRestaurants = [];
  currentPage = 1;
  showMoreButtonFlag: Boolean = true;
  filterValues = {
    types: [],
    cuisines: [],
    features: [],
    selectedCity: ''
  }
  page = 1;
  position: Object;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public tableBooking: TablebookingProvider,
    public toastCtrl: ToastController,
    public geolocation: Geolocation,
    public googleMap: GoogleMaps,
    public platform: Platform,
    public deal: DealsProvider) {
    tableBooking.getAllTypes().subscribe((allTypes) => {
      console.log('Types', allTypes);
      this.allTypes = allTypes;
      this.cities = allTypes.cities;
      this.restaurantTypes = allTypes.restaurantTypes;
      this.restaurantFeatures = allTypes.restaurantFeatures;
      this.restaurantCuisines = allTypes.restaurantCuisines
    }, err => {
      console.log('Error', err);
    })

    tableBooking.getFeaturedRestaurants(this.page, this.filterValues).subscribe((allRestaurants) => {
      if (allRestaurants) {
        allRestaurants.forEach(restaurant => {
          if (restaurant.Restaurant.Featured) {
            this.featuredRestaurants.push(restaurant.Restaurant)
          }
        });
      }
    }, err => {
      console.log('Error', err)
    })

    tableBooking.getAllRestaurants(this.currentPage, this.filterValues).subscribe((allRestaurants) => {
      console.log('All Restaurants', allRestaurants);
      allRestaurants.forEach(restaurant => {
        this.restaurants.push(restaurant.Restaurant)
        this.restaurantOffers.push(restaurant.RestaurantOffer);
      });
    }, err => {
      console.log('Error', err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablereservationPage');
    this.platform.ready().then(() => {
      this.getCurrentLocation();
    })
  }

  showMore() {
    this.currentPage++;
    this.tableBooking.getAllRestaurants(this.currentPage, this.filterValues).subscribe((allRestaurants) => {
      if (allRestaurants) {
        allRestaurants.forEach(restaurant => {
          this.restaurants.push(restaurant.Restaurant)
          this.restaurantOffers.push(restaurant.RestaurantOffer)
        });
      }
      else {
        this.showMoreButtonFlag = false;
      }
    })
  }

  applyFilter() {
    this.currentPage = 1;
    this.tableBooking.getAllRestaurants(this.currentPage, this.filterValues).subscribe((allRestaurants) => {
      if (allRestaurants) {
        this.restaurants = [];
        this.restaurantOffers = [];
        console.log('agaya', allRestaurants)
        allRestaurants.forEach(restaurant => {
          this.restaurants.push(restaurant.Restaurant)
          this.restaurantOffers.push(restaurant.RestaurantOffer)
        });
      }
      else {
        this.showToastWithCloseButton();
        // this.showMoreButtonFlag = false;
        this.restaurants = [];
        this.restaurantOffers = [];
      }
    })
  }

  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'No restaurant found for current location you have selected',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('my location obj', resp);
      let lat = resp.coords.latitude;
      let lng = resp.coords.longitude;
      this.tableBooking.getNearByRestaurants(this.filterValues).subscribe((allRestaurants) => {
        console.log('yuppeee!!!', allRestaurants)
        allRestaurants.forEach(restaurant => {
          let distance = parseFloat(this.tableBooking.getDistance(lat, lng, restaurant.Restaurant.Latitude, restaurant.Restaurant.Longitude, 'K').toFixed(2));
          if (distance < 1) {
            this.nearByRestaurants.push(restaurant.Restaurant);
          }
          console.log('dist', distance);
        });
      }, err => {
        console.log('error agaya ==>', err)
      })
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  viewRestaurant(restaurant) {
    // console.log('Restaurant clicked', restaurant);
    this.tableBooking.getRestaurantDetails(restaurant.Id).subscribe((restaurantDetails) => {
      if (restaurantDetails) {
        this.deal.navCtrl.push(RestaurantdetailsPage, {
          restaurantDetails: restaurantDetails
        })
      }
    }, err => {
      throw err
    })
  }

}
