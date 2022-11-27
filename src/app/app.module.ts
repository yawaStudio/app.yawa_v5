import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { VoyPage } from '../pages/voy/voy';
import { ServicePage } from '../pages/service/service';
import { PrinterPage } from '../pages/printer/printer';
import { PrinterProvider } from './../providers/printer/printer';
import { ApiService } from './../providers/api/api-service';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { VentePage } from '../pages/vente/vente';
import { ClosePage } from '../pages/close/close';
import { Network } from "@ionic-native/network";
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { DeptailPage } from "../pages/deptail/deptail";
import { SMS } from "@ionic-native/sms";
import { Geolocation } from "@ionic-native/geolocation";
import { ControlPage } from '../pages/control/control';
import { RapportPage } from '../pages/rapport/rapport';
import { DepensePage } from '../pages/depense/depense';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    VoyPage,
    ServicePage,
    PrinterPage,
    VentePage,
    ClosePage,
    DeptailPage,
    ControlPage,
    RapportPage,
    DepensePage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    VoyPage,
    ServicePage,
    PrinterPage,
    VentePage,
    ClosePage,
    DeptailPage,
    ControlPage,
    RapportPage,
    DepensePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BluetoothSerial,
    ApiService,
    Network,
    SQLite,
    PrinterProvider,
    DatabaseProvider,
    Geolocation,
    SMS
  ]
})
export class AppModule { }