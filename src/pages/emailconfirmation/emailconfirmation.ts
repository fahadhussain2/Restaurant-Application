import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login'

/**
 * Generated class for the EmailconfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emailconfirmation',
  templateUrl: 'emailconfirmation.html',
})
export class EmailconfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailconfirmationPage');
  }

  backToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
