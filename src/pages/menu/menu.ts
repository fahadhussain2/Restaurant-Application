import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginPage } from '../login/login';
import { DeallistingPage } from '../../pages/deallisting/deallisting';
import { ShoppingcartPage } from '../../pages/shoppingcart/shoppingcart';
import { ProfilePage } from '../../pages/profile/profile'

import { DealsProvider } from '../../providers/deals/deals'

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage: any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public deals: DealsProvider) {
    if(localStorage.getItem("userTokenObj")){
      this.rootPage = HomePage;
      this.deals.navCtrl = navCtrl;
    }
    // this.deals.getCart().subscribe((myCart)=>{
    //   this.myCartLength = myCart.length;
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  logout(){
    localStorage.removeItem('userTokenObj');
    this.navCtrl.setRoot(LoginPage);
  }

  openPage(page){
    // console.log('home')
    // this.navCtrl.push(HomePage)
    if(page == 'My Cart'){
      this.navCtrl.push(ShoppingcartPage)
    }
    if(page == 'My Profile'){
      this.navCtrl.push(ProfilePage)
    }
  }

}
