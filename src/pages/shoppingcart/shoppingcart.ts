import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DealsProvider } from '../../providers/deals/deals';

import { PaymentPage } from '../payment/payment'

import { SetupcountryProvider } from '../../providers/setupcountry/setupcountry';

import { AutoCompleteComponent } from 'ionic2-auto-complete';


@IonicPage()
@Component({
  selector: 'page-shoppingcart',
  templateUrl: 'shoppingcart.html',
})
export class ShoppingcartPage {

  shoppingCart = [];
  cartWithTotalAndSaving = [];
  subTotal: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public deals: DealsProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public setupCountryService: SetupcountryProvider) {
    deals.getCart().subscribe((shoppingCart) => {
      console.log('Shopping Cart ==> ', shoppingCart)
      if (shoppingCart) {
        this.shoppingCart = shoppingCart;
        for (var index in shoppingCart) {
          this.cartWithTotalAndSaving.push({
            deal: shoppingCart[index].deal,
            dealCart: shoppingCart[index].dealCart,
            dealOffer: shoppingCart[index].dealOffer,
            totalPrice: shoppingCart[index].dealOffer.DiscountedPrice * shoppingCart[index].dealCart.DealOfferQuantity,
            totalSaving: shoppingCart[index].dealOffer.Discount * shoppingCart[index].dealCart.DealOfferQuantity
          })
          this.subTotal += this.cartWithTotalAndSaving[index].totalPrice;
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingcartPage');
  }

  // ngOnInit(){
  //   const browser = this.iab.create('https://www.payumoney.com/sandbox/paybypayumoney/#/092ED4A173D2306B47A9AE1B099BFBAF','_self',{location:'no'}); 
  // }

  selectQuantity(index) {
    if (this.cartWithTotalAndSaving[index].dealCart.DealOfferQuantity >= 0) {
      this.cartWithTotalAndSaving[index].totalPrice = this.cartWithTotalAndSaving[index].dealOffer.DiscountedPrice * this.cartWithTotalAndSaving[index].dealCart.DealOfferQuantity;
      this.cartWithTotalAndSaving[index].totalSaving = this.cartWithTotalAndSaving[index].dealOffer.Discount * this.cartWithTotalAndSaving[index].dealCart.DealOfferQuantity;
      console.log('UPDATED ==>', this.cartWithTotalAndSaving)
      return true
    }
    else {
      this.presentToast('Please enter valid quantity')
      return false
    }
  }

  updateCart(index) {
    console.log('cart to be updated', this.cartWithTotalAndSaving[index].dealCart);
    this.deals.updateCart(this.cartWithTotalAndSaving[index].dealCart).subscribe((response) => {
      console.log('cart updated successfully', response)
      if (response.ok) {
        this.presentToast('deal offer has been updated successfully')
      }
    }, err => {
      console.log('error =>', err);
    })
  }

  deleteCart(id, index) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this offer?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deals.deleteCart(id).subscribe((response) => {
              console.log('cart is deleted successfully', response);
              this.shoppingCart.splice(index, 1);
              this.presentToast('deal offer has been deleted')
            }, err => {
              console.log('err ==>', err);
            });
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  increment(offer,index){
      this.cartWithTotalAndSaving[index].dealCart.DealOfferQuantity += 1;
      this.selectQuantity(index);
      this.subTotal += this.cartWithTotalAndSaving[index].dealOffer.DiscountedPrice;      
  }

  decrement(offer, index){
    if(this.cartWithTotalAndSaving[index].dealCart.DealOfferQuantity > 0){
      this.cartWithTotalAndSaving[index].dealCart.DealOfferQuantity -= 1;
      this.selectQuantity(index);
      this.subTotal -= this.cartWithTotalAndSaving[index].dealOffer.DiscountedPrice;
      
    }
  }

  goToPayment(){
    this.navCtrl.push(PaymentPage)
  }
}
