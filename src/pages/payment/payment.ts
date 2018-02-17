import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import CryptoJS from 'crypto-js';

import { TablebookingProvider } from '../../providers/tablebooking/tablebooking'

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {


  website: string = 'WEB_STAGING';
  Merchant_key = '520L2T4ezyXXN4uF';
  channel_id = 'WEB';
  industry_type = 'Retail';
  text: string

  private payment: FormGroup;

  constructor(private formBuilder: FormBuilder, private tableBook: TablebookingProvider) {
    this.payment = this.formBuilder.group({
      card: ['', Validators.required],
      cvv: ['', Validators.required],
      expiry: ['', Validators.required],
    });
  }

  ionViewDidLoad() {

    var data = '42101213123123|123|072018'
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log('decrypted data ==>', decryptedData);
    console.log('ionViewDidLoad PaymentPage');
  }

  makePayment() {
    let data = '42101213123123|123|072018'
    let transactionParams = {
      REQUEST_TYPE: 'SEAMLESS',
      MID: 'Jagann40854458553994',
      ORDER_ID: (Date.now().toString(36) + Math.random().toString(36).substr(2, 16)).toUpperCase(),
      CUST_ID: (Date.now().toString(36) + Math.random().toString(36).substr(2, 16)).toUpperCase(),
      TXN_AMOUNT: 100,
      CHANNEL_ID: 'WEB',
      INDUSTRY_TYPE_ID: 'Retail',
      WEBSITE: 'WEB_STAGING',
      PAYMENT_DETAILS: CryptoJS.AES.encrypt(data, '430MBEtjM1Sy!3l7Zxt0FWVQ1hpbgN_w'),
      AUTH_MODE: '3D',
      PAYMENT_TYPE_ID: 'CC',
      MOBILE_NO: '112233445566',
      EMAIL: 'fahad@gmail.com'
    }
    console.log('payment obj', transactionParams);
    this.tableBook.makePayment(transactionParams).subscribe(res => {
      console.log('success', res)
      this.text = (<any>res)._body
    }, err => {
      console.log('error', err)
    });
  }

  checksum(data) {
    let index;
    let checksum = 0x12345678;

    for (index = 0; index < data.length; index++) {
      checksum += (string.charCodeAt(index) * (index + 1));
    }

    return checksum;
  }

}
