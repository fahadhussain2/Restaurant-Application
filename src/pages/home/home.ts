import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DeallistingPage } from '../../pages/deallisting/deallisting';
import { GroupreservationPage } from '../../pages/groupreservation/groupreservation';
import { TablereservationPage } from '../../pages/tablereservation/tablereservation';
import { PartybookingPage } from '../../pages/partybooking/partybooking';
import { DealdetailsPage } from '../../pages/dealdetails/dealdetails';
import { ShoppingcartPage } from '../../pages/shoppingcart/shoppingcart'

import { DealsProvider } from '../../providers/deals/deals'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1 = DeallistingPage;
  tab2 = GroupreservationPage;
  tab3 = TablereservationPage;
  tab4 = PartybookingPage;

  constructor(public navCtrl: NavController,
              public deals: DealsProvider) {

                deals.getCart().subscribe((myCart)=>{
                  deals.myCartItems = myCart.length;
                })
  }

  logout(){
    localStorage.removeItem('userTokenObj');
    this.navCtrl.setRoot(LoginPage)
  }

  myCart(){
    this.navCtrl.push(ShoppingcartPage)
  }

}
