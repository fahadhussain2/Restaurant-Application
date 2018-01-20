import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfilesettingsPage } from '../../pages/profilesettings/profilesettings'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  currentUser={};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public auth: AuthProvider,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController) {

                auth.getCurrentUSer().subscribe((User)=>{
                  console.log('USER==>', User)
                  this.currentUser = User;
                })
  }

  update(){
    
      let profileModal = this.modalCtrl.create(ProfilesettingsPage, { currentUser: this.currentUser });
      profileModal.present();

      profileModal.onDidDismiss(data => {
        console.log(data);
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
