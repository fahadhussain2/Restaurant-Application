import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DealdetailsPage } from '../pages/dealdetails/dealdetails';
import { DeallistingPage } from '../pages/deallisting/deallisting';
import { TablereservationPage } from '../pages/tablereservation/tablereservation';
import { PartybookingPage } from '../pages/partybooking/partybooking';
import { GroupreservationPage } from '../pages/groupreservation/groupreservation';
import { EmailconfirmationPage } from '../pages/emailconfirmation/emailconfirmation';
import { GooglemapPage } from '../pages/googlemap/googlemap';
import { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';
import { ShoppingcartPage } from '../pages/shoppingcart/shoppingcart';
import { ProfilePage } from '../pages/profile/profile';
import { ProfilesettingsPage } from '../pages/profilesettings/profilesettings';
import { RestaurantdetailsPage } from '../pages/restaurantdetails/restaurantdetails'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
// import { Facebook} from '@ionic-native/facebook'
import { DealsProvider } from '../providers/deals/deals';
import { SetupcountryProvider } from '../providers/setupcountry/setupcountry';
import { EmailProvider } from '../providers/email/email';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';  
import { IonicImageViewerModule} from 'ionic-img-viewer'

import { AutoCompleteModule } from 'ionic2-auto-complete';
import { GoogleMaps, GoogleMap, Spherical } from '@ionic-native/google-maps';
import { TablebookingProvider } from '../providers/tablebooking/tablebooking';


// import { PipesModule } from '../pipes/pipes.module';
// import { FilterbycategoryPipe } from '../pipes/filterbycategory/filterbycategory'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    MenuPage,
    DashboardPage,
    DealdetailsPage,
    DeallistingPage,
    TablereservationPage,
    PartybookingPage,
    GroupreservationPage,
    EmailconfirmationPage,
    GooglemapPage,
    TermsandconditionsPage,
    ShoppingcartPage,
    ProfilePage,
    ProfilesettingsPage ,
    RestaurantdetailsPage   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    HttpModule,
    AutoCompleteModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    MenuPage,
    DashboardPage,
    DealdetailsPage,
    DeallistingPage,
    TablereservationPage,
    PartybookingPage,
    GroupreservationPage,
    EmailconfirmationPage,
    GooglemapPage,
    TermsandconditionsPage,
    ShoppingcartPage,
    ProfilePage,
    ProfilesettingsPage,
    RestaurantdetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    // Facebook,
    DealsProvider,
    SetupcountryProvider,
    EmailProvider,
    GoogleMaps,
    TablebookingProvider,
    Geolocation,
    InAppBrowser
  ]
})
export class AppModule {}
