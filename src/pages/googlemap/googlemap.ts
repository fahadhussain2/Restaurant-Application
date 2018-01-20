import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMapsEvent, GoogleMap, GoogleMapOptions, MarkerOptions, Marker } from '@ionic-native/google-maps';
declare var google: any

/**
 * Generated class for the GooglemapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-googlemap',
  templateUrl: 'googlemap.html',
})
export class GooglemapPage {

  dealInfo;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public googleMaps: GoogleMaps,
    public platform: Platform) {
    this.dealInfo = this.navParams.get('dealInfo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GooglemapPage');
    this.platform.ready().then(() => {
      this.loadMap();
    })
  }

  loadMap() {

    let latitude = parseFloat(this.dealInfo.DealRedemptionLocation[0].Latitude);
    let longitude = parseFloat(this.dealInfo.DealRedemptionLocation[0].Longitude);
    console.log('location', latitude, longitude);
    if (latitude & longitude) {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: latitude,
            lng: longitude
          },
          zoom: 18,
          tilt: 30
        }
      };

      let element = document.getElementById('map');
      let map: GoogleMap = GoogleMaps.create(element, mapOptions)

      map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {

          map.addMarker({
            title: this.dealInfo.DealRedemptionLocation[0].FormattedAddress,
            icon: 'red',
            animation: 'DROP',
            position: {
              lat: latitude,
              lng: longitude
            }
          })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  console.log('Marker Clicked')
                });
            });

        });
    }

  }

}
