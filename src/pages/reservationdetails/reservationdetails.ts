import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TermsandconditionsPage } from '../../pages/termsandconditions/termsandconditions';

import { AuthProvider } from '../../providers/auth/auth';
import { TablebookingProvider } from '../../providers/tablebooking/tablebooking'
import { registerModeConfigs } from 'ionic-angular/config/mode-registry';

/**
 * Generated class for the ReservationdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservationdetails',
  templateUrl: 'reservationdetails.html',
})
export class ReservationdetailsPage {

  noOfPersons;
  discount;
  time;
  selectedSegment = 'Time Wise Offers';
  minDate: string = new Date().toISOString();
  color = 'danger';
  currentUser: any = {};
  restaurantOffer = {
    restaurantId: '',
    selectedDate: new Date().toISOString(),
    noOfPersons: '1'
  }
  username;
  email;
  phoneNumber;
  phoneNumber2;
  selectedOffer;
  timeWiseOffers = [];
  tableWiseOffers = [];
  currentLocalTime = new Date(Number(new Date())).toLocaleTimeString().replace(/:\d{2}\s/, ' ');

  // currentLocalDate = new Date(Number(new Date())).toLocaleDateString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public tableBooking: TablebookingProvider) {
    this.restaurantOffer.restaurantId = this.navParams.get('restaurantObj').Restaurant.Id;
    // console.log('fff', this.currentLocalDate, this.currentLocalTime)
    this.auth.getCurrentUSer().subscribe(user => {
      console.log('current user ==>', user)
      this.currentUser = user;
      this.username = `${user.FirstName} ${user.LastName}`;
      this.email = user.Email;
      this.phoneNumber = user.PhoneNumber;
      this.phoneNumber2 = user.PhoneNumber2
    }, err => {
      throw err
    })

    this.tableBooking.getRestaurantOffers(this.restaurantOffer).subscribe(offers => {
      tableBooking.loader = false;
      console.log('offers', offers);
      if (offers) {
        if (offers.timewiseOffers) {
          var timewiseTimeArr = [];
          offers.timewiseOffers.forEach(timeWiseOffer => {
            timewiseTimeArr.push(this.ISOToAMPM(timeWiseOffer))
          })
          timewiseTimeArr.filter(offerTime => {
            Date.parse(`01/01/2011 ${offerTime.formattedTime}`) > Date.parse(`01/01/2011 ${this.currentLocalTime}`) ? this.timeWiseOffers.push(offerTime) : 'No time wise offer available'
          })
        }

        if (offers.tablewiseOffers) {
          var tablewisetimeArr = [];
          offers.tablewiseOffers.forEach(tablewiseOffer => {
            tablewisetimeArr.push(this.ISOToAMPM(tablewiseOffer))
          })
          tablewisetimeArr.filter(offerTime => {
            Date.parse(`01/01/2011 ${offerTime.formattedTime}`) > Date.parse(`01/01/2011 ${this.currentLocalTime}`) ? this.tableWiseOffers.push(offerTime) : 'No time wise offer available'
          })
        }

      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationdetailsPage');
  }

  ShowTermsandConditions() {
    this.navCtrl.push(TermsandconditionsPage);
  }

  getOffers() {
    this.tableWiseOffers = [];
    this.timeWiseOffers = [];
    this.discount = '';
    this.tableBooking.loader = true;
    this.tableBooking.getRestaurantOffers(this.restaurantOffer).subscribe(offers => {
      this.tableBooking.loader = false;
      console.log('OFFERS ==>', offers)
      if (offers) {
        if (offers.timewiseOffers) {
          let selectedDate = this.restaurantOffer.selectedDate.split('T')[0];
          let currentDate = new Date().toISOString().split('T')[0];
          if (selectedDate == currentDate) {
            let timeArr = [];
            this.timeWiseOffers = [];
            offers.timewiseOffers.forEach(timeWiseOffer => {
              timeArr.push(this.ISOToAMPM(timeWiseOffer))
            })
            timeArr.filter(offerTime => {
              if (Date.parse(`01/01/2011 ${offerTime.formattedTime}`) > Date.parse(`01/01/2011 ${this.currentLocalTime}`)) {
                this.timeWiseOffers.push(offerTime)
              }
            })
          }
          else {
            this.timeWiseOffers = [];
            offers.timewiseOffers.forEach(timeWiseOffer => {
              console.log('eee', this.ISOToAMPM(timeWiseOffer))
              this.timeWiseOffers.push(this.ISOToAMPM(timeWiseOffer));
            });
          }

        }
        else {
          this.timeWiseOffers = [];
        }

        if (offers.tablewiseOffers) {
          let selectedDate = this.restaurantOffer.selectedDate.split('T')[0];
          let currentDate = new Date().toISOString().split('T')[0];
          if (selectedDate == currentDate) {
            let timeArr = [];
            this.tableWiseOffers = [];
            offers.tablewiseOffers.forEach(tableWiseOffer => {
              console.log('yyyy', tableWiseOffer)
              timeArr.push(this.ISOToAMPM(tableWiseOffer))
            })
            timeArr.filter(offerTime => {
              if (Date.parse(`01/01/2011 ${offerTime.formattedTime}`) > Date.parse(`01/01/2011 ${this.currentLocalTime}`)) {
                this.tableWiseOffers.push(offerTime)
              }
            })
          }
          else {
            this.tableWiseOffers = [];
            offers.tablewiseOffers.forEach(tableWiseOffer => {
              console.log('eee', this.ISOToAMPM(tableWiseOffer))
              this.tableWiseOffers.push(this.ISOToAMPM(tableWiseOffer));
            });
          }
        }
        else {
          this.tableWiseOffers = [];
        }

      }

    })
  }

  ISOToAMPM(offer) {
    let timeWiseOffer = {
      id: offer.Id,
      offerAmount: offer.OfferAmount,
      voucherCode: offer.voucherCode,
      formattedTime: '',
      isOutline: true
    }
    let date = new Date(offer.FromTime);
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

    var formattedTime = hours + ":" + minutes + ' ' + amorpm;
    timeWiseOffer.formattedTime = formattedTime
    return timeWiseOffer;

  }

  sortTime(timeWiseOffer) {
    return timeWiseOffer.sort(function (a, b) {
      return Date.parse('1970/01/01 ' + a.formattedTime) - Date.parse('1970/01/01 ' + b.formattedTime);
    });
  }

  offerSelected(timeWiseOffer, index) {
    this.timeWiseOffers.forEach((offer, newIndex) => {
      if (newIndex == index) {
        var checkTime = Date.parse(`01/01/2011 ${timeWiseOffer.formattedTime}`) > Date.parse(`01/01/2011 ${this.currentLocalTime}`) ? true : false;
        if (checkTime) {
          this.timeWiseOffers[newIndex].isOutline = false;
          this.discount = timeWiseOffer.offerAmount;
          this.time = timeWiseOffer.formattedTime;
          this.selectedOffer = timeWiseOffer;

        }
        else {
          let selectedDate = this.restaurantOffer.selectedDate.split('T')[0];
          let currentDate = new Date().toISOString().split('T')[0];
          if (selectedDate == currentDate) {
            this.timeWiseOffers.splice(index, 1);
          }
          else {
            this.timeWiseOffers[newIndex].isOutline = false;
            this.discount = timeWiseOffer.offerAmount;
            this.time = timeWiseOffer.formattedTime;
          }
        }
      }
      else {
        this.timeWiseOffers[newIndex].isOutline = true;
      }
    })

  }

  offerSelected2(tableWiseOffer, index) {
    this.tableWiseOffers.forEach((offer, newIndex) => {
      if (newIndex == index) {
        var checkTime = Date.parse(`01/01/2011 ${tableWiseOffer.formattedTime}`) > Date.parse(`01/01/2011 ${this.currentLocalTime}`) ? true : false;
        if (checkTime) {
          this.tableWiseOffers[newIndex].isOutline = false;
          this.discount = tableWiseOffer.offerAmount;
          this.time = tableWiseOffer.formattedTime;
          this.selectedOffer = tableWiseOffer
        }
        else {
          let selectedDate = this.restaurantOffer.selectedDate.split('T')[0];
          let currentDate = new Date().toISOString().split('T')[0];
          if (selectedDate == currentDate) {
            this.tableWiseOffers.splice(index, 1);
          }
          else {
            this.tableWiseOffers[newIndex].isOutline = false;
            this.discount = tableWiseOffer.offerAmount;
            this.time = tableWiseOffer.formattedTime;
          }
        }
      }
      else {
        this.tableWiseOffers[newIndex].isOutline = true;
      }
    })

  }

  reserveMe() {
    let reservationPayload = {
      BookingDate: this.restaurantOffer.selectedDate,
      UserId: this.currentUser.Id,
      OfferId: this.selectedOffer.id,
      RestaurantId: this.restaurantOffer.restaurantId,
      CustomerName: this.username,
      CustomerEmail: this.email,
      CustomerCountryCode: this.phoneNumber,
      CustomerContactNo: this.phoneNumber2,
      NumberOfPerson: this.restaurantOffer.noOfPersons,
    }

    // this.tableBooking.reserveMe(reservationPayload).subscribe(registrationNo => {
      // console.log('success', registrationNo);
      this.tableBooking.getBookingSummary('registrationNo').subscribe(bookingSumamry => {
        console.log('booking summary ==>', bookingSumamry);
      }, err => {
        throw err
      })
    // }, err => {
    //   throw err
    // })
  }


}
