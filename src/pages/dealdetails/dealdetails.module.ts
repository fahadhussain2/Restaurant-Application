import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealdetailsPage } from './dealdetails';

@NgModule({
  declarations: [
    DealdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DealdetailsPage),
  ],
})
export class DealdetailsPageModule {}
