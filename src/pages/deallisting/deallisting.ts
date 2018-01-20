import { Component, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DealsProvider } from '../../providers/deals/deals';
import { DecimalPipe } from '@angular/common';
import { DealdetailsPage } from '../../pages/dealdetails/dealdetails'
// import { FilterbycategoryPipe } from '../../pipes/filterbycategory/filterbycategory'

/**
 * Generated class for the DeallistingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-deallisting',
  templateUrl: 'deallisting.html',
})
export class DeallistingPage {

  selectedSegment: string = "ALL";
  originalDeals = [];
  dealList = [];
  categories = [];
  featuredDeals = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public deals: DealsProvider) {
    this.deals.dealsList().subscribe((deals) => {
      console.log('All Dealssss', deals);
      if (deals) {
        deals.dealOfferVM.forEach(deal => {
          if (deal.deal && deal.dealOffer) {
            this.dealList.push(deal);
            this.originalDeals.push(deal);
          }
        });
        deals.categories.forEach(category => {
          if (category) {  
            this.categories.push({
              Name: category.Name,
              Count: category.Count,
              isOutline: true
            });
          }
        });

        deals.dealOfferVM.forEach(deal => {
          if (deal.deal.Featured) {
            this.featuredDeals.push(deal);
          }
        });
      }

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeallistingPage');
  }


  // selectCategory() {
  //   let alert = this.alertCtrl.create();
  //   alert.setTitle('Select Category');

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'All',
  //     value: 'All',
  //     checked: true
  //   });
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Buffet',
  //     value: 'Buffet',
  //     checked: false
  //   });
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Drink',
  //     value: 'Drink',
  //     checked: false
  //   })
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Extra Value Deal',
  //     value: 'Extra Value Deal',
  //     checked: false
  //   })
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Food',
  //     value: 'Food',
  //     checked: false
  //   })
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Gift Card',
  //     value: 'Gift Card',
  //     checked: false
  //   })
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Take out',
  //     value: 'Take out',
  //     checked: false
  //   })

  //   alert.addButton('Cancel');
  //   alert.addButton({
  //     text: 'OK',
  //     handler: category => {
  //       this.filterByCategory(category);
  //     }
  //   });
  //   alert.present();
  // }

  filterByCategory(category, index) {
    console.log('CATEGORY==>',category)
    // if (category == 'All') {
    //   console.log('cateogry', category)
    //   return this.dealList = this.originalDeals;
    // }

      this.dealList = this.originalDeals.filter((deal) => {
        return deal.deal.DealCategoryName == category
      })
      this.categories.forEach((category, newIndex)=>{
        if(newIndex == index){
          this.categories[newIndex].isOutline = false
        }
        else{
          this.categories[newIndex].isOutline = true
        }
      })

  }

  viewDeal(deal, index) { 
    console.log('view deal', deal, index);
    this.deals.navCtrl.push(DealdetailsPage, {
      deal: deal
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.dealList = this.originalDeals;
      this.categories.forEach(category=>{
        category.isOutline = true;
      })
      refresher.complete();
    }, 2000);
  }
}
