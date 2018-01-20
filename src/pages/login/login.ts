import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { logincreds } from '../../models/interfaces/logincreds';

import { AuthProvider } from '../../providers/auth/auth'

import { RegisterPage } from '../register/register';
import { MenuPage } from '../menu/menu';

// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = {} as logincreds;
  userData = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    ) {
  }

  ionViewDidLoad() { }

  login() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'bubbles',
    });

    loading.present().then(() => {
      this.authService.loginUser(this.credentials).subscribe((response: any) => {
        // console.log('logged in', response)
        if (response) {
          loading.dismiss().then(() => {
            localStorage.setItem('userTokenObj', JSON.stringify(response));
            this.navCtrl.push(MenuPage)
          })
        }
      }, err => {
        loading.dismiss().then(() => {
          console.log('error', err)
          if(err._body){
            let errObj = JSON.parse(err._body);
            this.presentToast(errObj.Message).present()
          }
          // else{
          //   this.presentToast('Something went wrong').present();
          // }
        })
      });
    })

  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      cssClass: 'toaster'
    });

    return toast
  }

  // loginWithFB() {
  //   this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
  //     console.log('facebook logged in', response);
  //     this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
  //       this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] };
  //       console.log('Facebook info', profile);
  //     })
  //   })
  // }

}
