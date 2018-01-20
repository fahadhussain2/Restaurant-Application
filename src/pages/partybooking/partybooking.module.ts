import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartybookingPage } from './partybooking';

@NgModule({
  declarations: [
    PartybookingPage,
  ],
  imports: [
    IonicPageModule.forChild(PartybookingPage),
  ],
})
export class PartybookingPageModule {}
