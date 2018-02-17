import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { TablereservationPage } from '../../pages/tablereservation/tablereservation'

/**
 * Generated class for the ReservationsummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservationsummary',
  templateUrl: 'reservationsummary.html',
})
export class ReservationsummaryPage {

  bookingSummary;
  date = '2018-01-21T19:24:09Z'

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('summary'))
    this.bookingSummary = this.navParams.get('summary');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationsummaryPage');
  }

  // goToTableReservation(){
  //   // console.log(this.navCtrl.getByIndex(1))
  //   this.navCtrl.popTo(this.navCtrl.getByIndex(2))
  // }

}
