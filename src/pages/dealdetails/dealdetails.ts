import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DealsProvider } from '../../providers/deals/deals';
import { DatePipe } from '@angular/common';
// import { GoogleMaps, GoogleMapsEvent, GoogleMap, GoogleMapOptions, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { GooglemapPage } from '../../pages/googlemap/googlemap';
import { TermsandconditionsPage } from '../../pages/termsandconditions/termsandconditions';
import { ShoppingcartPage } from '../../pages/shoppingcart/shoppingcart'

/**
 * Generated class for the DealdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dealdetails',
  templateUrl: 'dealdetails.html',
})
export class DealdetailsPage {

  // @ViewChild('map') mapElement;

  // map: GoogleMap;
  dealInfo;
  dealOffer = [];
  thingsToRemember = [];
  conditions = [];
  selectedSegment = 'Details';
  termsandconditions: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public deals: DealsProvider,
    private toastCtrl: ToastController) {
    console.log('deal', this.navParams.get('deal'));
    let deal = this.navParams.get('deal');
    let dealId = deal.deal.Id;
    this.deals.getDealDetails(dealId).subscribe((dealInfo) => {
      console.log('deal object', dealInfo);
      this.dealInfo = dealInfo
      // this.loadMap();
      this.thingsToRemember = dealInfo.Deal.ThingsToRemember.split(';');
      this.conditions = dealInfo.Deal.HowToUseOffers.split(';')
      dealInfo.DealOffer.forEach(element => {
        this.dealOffer.push({
          DealOffer: element,
          noOfItems: 0
        });
      });
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashbordPage');
  }

  increment(offer, index) {
    console.log('index', index, offer)
    // this.selectedOffer[index].name = offer.Name;
    this.dealOffer[index].noOfItems++;
  }

  decrement(offer, index) {
    console.log('index', index)
    // this.selectedOffer[index].name = offer.Name;
    this.dealOffer[index].noOfItems--;
  }

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
    return formatedDate;

  }

  // loadMap() {

  //   let latitude = parseFloat(this.dealInfo.DealRedemptionLocation[0].Latitude);
  //   let longitude = parseFloat(this.dealInfo.DealRedemptionLocation[0].Longitude);


  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //       target: {
  //         lat: latitude,
  //         lng: longitude
  //       },
  //       zoom: 18,
  //       tilt: 30
  //     }
  //   };

  //   console.log('Load Map called');

  //   let element = document.getElementById('map');
  //   let map: GoogleMap = GoogleMaps.create(element, mapOptions)

  //   map.one(GoogleMapsEvent.MAP_READY)
  //     .then(() => {
  //       console.log('Map is ready!');

  //         map.addMarker({
  //           title: this.dealInfo.DealRedemptionLocation[0].FormattedAddress,
  //           icon: 'blue',
  //           animation: 'DROP',
  //           position: {
  //             lat: latitude,
  //             lng: longitude
  //           }
  //         })
  //           .then(marker => {
  //             marker.on(GoogleMapsEvent.MARKER_CLICK)
  //               .subscribe(() => {
  //                 alert('clicked');
  //               });
  //           });

  //     });
  // }

  goToGoogleMap() {
    this.navCtrl.push(GooglemapPage, {
      dealInfo: this.dealInfo
    });
  }

  ShowTermsandConditions() {
    console.log('terms and conditions')
    this.navCtrl.push(TermsandconditionsPage)
  }

  addToCart() {    
    if (this.termsandconditions) {
      console.log('DEAL OFFER ==>', this.dealOffer)
      let cartItem = [];
      for (var index in this.dealOffer) {
        if (this.dealOffer[index].noOfItems > 0) {
          cartItem.push({
            dealId: this.dealOffer[index].DealOffer.DealId,
            dealOfferId: this.dealOffer[index].DealOffer.Id,
            DealOfferQuantity: this.dealOffer[index].noOfItems
          })
        }
      }
      if (cartItem.length === 0) {
        this.presentToast('Please select an offer')
      }
      else {
        this.deals.addToCart(cartItem).subscribe((res) => {
          console.log('added to cart ==>', res)
          this.deals.myCartItems ++;
          this.navCtrl.push(ShoppingcartPage);
        }, err => {
          console.log('Error ==>', err);
        })
      }

    }
    else {
      this.presentToast('Please agree the terms and conditions')
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}







// AIzaSyDfJtWhdtfNGBzw1mpTPTj6pc-eY0-qAGA     --Android google map key