import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeallistingPage } from './deallisting';

@NgModule({
  declarations: [
    DeallistingPage,
  ],
  imports: [
    IonicPageModule.forChild(DeallistingPage),
  ],
})
export class DeallistingPageModule {}
