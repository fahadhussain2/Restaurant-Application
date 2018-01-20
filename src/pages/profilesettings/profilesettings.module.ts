import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilesettingsPage } from './profilesettings';

@NgModule({
  declarations: [
    ProfilesettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilesettingsPage),
  ],
})
export class ProfilesettingsPageModule {}
