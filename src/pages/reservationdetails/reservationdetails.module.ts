import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationdetailsPage } from './reservationdetails';

@NgModule({
  declarations: [
    ReservationdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationdetailsPage),
  ],
})
export class ReservationdetailsPageModule {}
