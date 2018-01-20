import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'

/**
 * Generated class for the ProfilesettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilesettings',
  templateUrl: 'profilesettings.html',
})
export class ProfilesettingsPage {

  currentUser:any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public auth: AuthProvider,
              private toastCtrl: ToastController) {

                console.log(navParams.get('currentUser'))
                this.currentUser = navParams.get('currentUser')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesettingsPage');
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  update(){
    console.log('Updated User', this.currentUser);
    let updatedUser = {
      "Id": this.currentUser.Id,
      "FirstName": this.currentUser.FirstName,
      "LastName": this.currentUser.LastName,
      "CountryId": this.currentUser.CountryId,
      "CountryName": this.currentUser.CountryName,
      "StateId": this.currentUser.StateId,
      "StateName": this.currentUser.StateName,
      "CityId": this.currentUser.CityId,
      "CityName": this.currentUser.CityName,
      "LocationId": this.currentUser.LocationId,
      "LocationName": this.currentUser.LocationName,
      "Pin": this.currentUser.Pin,
      "PhoneNumber2": "+91",
      "PhoneNumber": this.currentUser.PhoneNumber2,
      "Gender": this.currentUser.Gender,
      "Image": this.currentUser.Image
    }

    this.auth.updateProfile(updatedUser).subscribe((updatedUser)=>{
      console.log('user is updated successfully');
      this.presentToast('Settings have been updated successfully');
    },err =>{
      console.log('error ==>', err);
      this.presentToast('Something went wrong')
    })

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
