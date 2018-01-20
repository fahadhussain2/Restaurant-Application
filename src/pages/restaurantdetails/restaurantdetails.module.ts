import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantdetailsPage } from './restaurantdetails';

@NgModule({
  declarations: [
    RestaurantdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantdetailsPage),
  ],
})
export class RestaurantdetailsPageModule {}
