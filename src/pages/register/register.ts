import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { EmailconfirmationPage } from '../../pages/emailconfirmation/emailconfirmation'

import { registercreds } from '../../models/interfaces/registercreds';

import { AuthProvider } from '../../providers/auth/auth';
import { SetupcountryProvider } from '../../providers/setupcountry/setupcountry';
import { EmailProvider } from '../../providers/email/email'

import { AutoCompleteComponent } from 'ionic2-auto-complete'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('searchbar')
  searchbar: AutoCompleteComponent;

  newUser: registercreds = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    FirstName: '',
    PhoneNumber2: null,
    CountryName: '',
    isCustomer: true
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public setupCountryService: SetupcountryProvider,
    public modalCtrl: ModalController,
    public emailService: EmailProvider) {
  }

  ionViewDidLoad() { }

  signup() {
    let FirstName = this.newUser.Email.split('@')[0];
    this.newUser.FirstName = FirstName;

    const loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'bubbles',
    });

    let credentials = {
      email: this.newUser.Email,
      password: this.newUser.Password
    }

    loading.present().then(() => {
      this.authService.registerUser(this.newUser).subscribe(response => {
        loading.dismiss().then(() => {
          this.presentToast('User Registration Successfull').present();
          let credentials = {
            email: this.newUser.Email,
            password: this.newUser.Password
          }
          this.authService.loginUser(credentials).subscribe((response) => {
            console.log('TOKEN ==>', response);
            let token = response.access_token;
            this.emailService.sendEmail(token).subscribe((emailSent) => {
              console.log('Email has been sent successfully');
              let profileModal = this.modalCtrl.create(EmailconfirmationPage, { Email: this.newUser.Email });
              profileModal.present();
            }, err => {
              console.log('Error in sending an email', err)
            })
          })


        });
        // loading.onDidDismiss(() => {
        //   this.navCtrl.popToRoot();
        // })
        // setTimeout(() => {
        //   this.navCtrl.popToRoot();
        // }, 3000);
      }, err => {
        loading.dismiss().then(() => {
          let errObj = JSON.parse(err._body);
          if (errObj.ModelState['model.Password']) {
            let errMsg = errObj.ModelState['model.Password'][0];
            this.presentToast(errMsg).present();
          }
          else {
            if (errObj.ModelState[''].length == 2) {
              let errMsg = errObj.ModelState[''][1];
              this.presentToast(errMsg).present();
            }
            else {
              let errMsg = errObj.ModelState[''][0];
              this.presentToast(errMsg).present();
            }

          }
        });
      })
    });

    // this.authService.loginUser(credentials).subscribe((response) => {
    //   console.log('TOKEN ==>', response);
    //   let token = response.access_token;
    //   this.emailService.sendEmail(token).subscribe((emailSent) => {
    //     console.log('Email has been sent successfully');
    //     let profileModal = this.modalCtrl.create(EmailconfirmationPage, { Email: this.newUser.Email });
    //     profileModal.present();
    //   }, err => {
    //     console.log('Error in sending an email', err)
    //   })
    // })

  }

  enableSignup() {
    return this.newUser.Email.trim() != '' && this.newUser.PhoneNumber2 != null && (this.newUser.Password.trim() != '' && this.newUser.ConfirmPassword.trim() != '') &&
      (this.newUser.Password == this.newUser.ConfirmPassword);
  }

  goBack() {
    this.navCtrl.push(LoginPage);
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

}
