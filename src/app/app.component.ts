import { VentePage } from './../pages/vente/vente';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  session: any;
  service: any;
  voyage: any;
  //rootPage:any = TabsPage;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.storage.get('session_storage').then((res) => {
      if (res == null) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = VentePage;
      }
    });
  }
}

