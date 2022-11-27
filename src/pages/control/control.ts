import { Component, } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController, LoadingController, Platform, ViewController, AlertController } from 'ionic-angular';
import { ApiService } from "../../providers/api/api-service";
import { Storage } from "@ionic/storage";
import { Network } from '@ionic-native/network';
import { PrinterProvider } from '../../providers/printer/printer';
import { VentePage } from '../vente/vente';

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage {
  receipt: any;
  inputData: any = {};
  queryText = '';
  segment = 'all';
  service: any;
  service_id: any;
  controler_code: any;
  observation: any = 'RAS';
  ticket_count: number = 0;
  ticket_fr:number = 0;
  rotation_count: number = 0;
  rotations: number = 0;
  tv: number = 0;
  tv_count: number = 0;
  controllers: any;

  constructor(public navCtrl: NavController, 
    public toastController: ToastController,
    private storage: Storage,
    private postPvdr: ApiService,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    public navParams: NavParams) {
  }
  ionViewWillEnter() { 
    this.platform.ready().then(() => {
      this.storage.get('service_storage').then((res) => {
        this.service_id = res.id;
        console.log(res);
      });
      this.storage.get('controllers_storage').then((res) => {
        this.controllers = res;
        console.log(res);
      });
      
    });
  }
  ionViewDidLoad() {
    this.storage.get('rotations').then((res) => {
      this.rotation_count = res + 1;
      this.rotations = res;
      console.log('Total rotations ' + this.rotations);
    });

    this.storage.get('t_en_vu').then((res) => {
      this.tv_count = res + 1;
      if (res == null) {
        this.tv = 1;
      } else {
        this.tv = res;
      }
      console.log('Total tk', this.tv);
    });
  }
  async controle() {
    if (this.controler_code == '') {
      const toast = await this.toastController.create({
        message: 'Le code du contrôleur ne peut être vide.',
        duration: 2000
      });
      toast.present();
    } else {
      
      return new Promise(resolve => {
        let body = {
          service_id: this.service_id,
          controler_code: this.controler_code,
          ticket_vu: this.tv,
          ticket_fr: this.ticket_fr,
          observation: this.observation,
          rotation: this.rotations,
        };
        console.log(body);
        this.postPvdr.postData(body, 'controle').subscribe(async (res: any) => {
          console.log(res.data);
          if (res.data.status == 'yes') {

            this.storage.set('controls_storage', res.data.controles)
            this.navCtrl.push(VentePage);
            const toast = await this.toastController.create({
              message: 'Contrôle validé',
              duration: 2000,
              position: 'top',
            });
            toast.present();
          } else {
            console.log(res.data);
            const toast = await this.toastController.create({
              message: res.data.status,
              duration: 2000,
              position: 'top',
            });
            toast.present();
          }
        });
      });
     
    }
  }
  async close() {
    this.navCtrl.push(VentePage);
  }
}
