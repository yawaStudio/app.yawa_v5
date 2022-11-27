import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from 'ionic-angular';
import { VoyPage } from "../voy/voy";
import { ApiService } from "../../providers/api/api-service";
import { Storage } from "@ionic/storage";
import { VentePage } from '../vente/vente';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-login',
  templateUrl: 'service.html',
})
export class ServicePage implements OnInit {

  line_id: Number = 0;
  device_id: Number = 1;
  start_miles:string = '';
  anggota: any;
  id: string = '';
  //line select
  line: any[] = [];
  service: any;
  seller: string;
  driver: string;

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    private storage: Storage,
    private postPvdr: ApiService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {

    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.device_id = this.anggota.user.id;
      this.line = this.anggota.line;
      console.log(this.anggota);
    });
    this.storage.get('service_storage').then((res) => {
      this.service = res;
    });
    if (this.service) {
      this.navCtrl.push(VentePage);
    }
  }

  addServe() {
    if (this.line_id == 0) {
      const toast = this.toastController.create({
        message: 'Ligne ne peut être vide.',
        duration: 2000
      });
      toast.present();
    }  else if (this.seller == '') {
      const toast = this.toastController.create({
        message: 'Le receveur ne peut être vide.',
        duration: 2000
      });
      toast.present();

    } else if (this.driver == '') {
      const toast = this.toastController.create({
        message: 'Le Chauffeur ne peut être vide.',
        duration: 2000
      });
      toast.present();

    }else if (this.start_miles == '') {
      const toast = this.toastController.create({
        message: 'Le Kilométrage ne peut être vide.',
        duration: 2000
      });
      toast.present();

    } else {
      const loader = this.loadingCtrl.create({
        content: 'Veuillez patienter!',
      });
      loader.present();
      return new Promise(resolve => {
        let body = {
          line_id: this.line_id,
          start_miles: this.start_miles,
          seller: this.seller,
          driver: this.driver,
          device_id: this.device_id
        };
        console.log(body);
        this.postPvdr.postData(body, 'service').subscribe(async (res: any) => {
          var alertpesan = res.msg;
          console.log(res.data);
          if (res.data.etat == 'yes') {
            loader.dismiss();
            this.storage.set('service_storage', res.data.service);
            this.storage.set('line_storage', res.data.line);
            this.storage.set('section_storage', res.data.section);
            this.storage.set('controllers_storage', res.data.controllers);
            this.navCtrl.push(VoyPage, { stat_0: 0, stat_printer: 1 });
            const toast = await this.toastController.create({
              message: 'Service ouvert',
              duration: 2000
            });
            toast.present();
          } else {
            loader.dismiss();
            console.log(res);
            const toast = this.toastController.create({
              message: alertpesan,
              duration: 2000
            });
          }
        }, (err) => {
          loader.dismiss();
        });
      });
    }
  }
  cancel() {
    this.storage.clear();
    this.navCtrl.push(LoginPage);
  }
  ngOnDestroy() {
  }

}
