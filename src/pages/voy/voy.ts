import { VentePage } from './../vente/vente';
import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiService } from "../../providers/api/api-service";
import { Storage } from "@ionic/storage";
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-voy',
  templateUrl: 'voy.html',
})
export class VoyPage {
  service: any;
  line: any[] = [];
  voy: any;
  serv_etat: string = 'false';

  service_id: number = 0;
  line_id: number = 0;
  ligne_name: string = '';
  leaving_place: string = '';
  arrived_place: string = '';
  point_a: string = '';
  point_b: string = '';
  voy_count: number = 0;
  voy_tot: number = 0;
  rates: any;
  rate_id: number;
  rate_name: string;
  rotation_id: number;
  price: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController,
    private storage: Storage,
    private postPvdr: ApiService) {
    this.storage.get('service_storage').then((res) => {
      this.service = res;
      this.service_id = this.service.id;
      console.log(this.service);
    });

    this.storage.get('section_storage').then((res) => {
      this.rates = res;
      console.log(this.rates);
    });
    this.storage.get('line_storage').then((res) => {
      this.line = res;
      this.line_id = res.id;
      this.ligne_name = res.name;
      this.point_a = res.point_a;
      this.point_b = res.point_b;
      console.log(this.line);
    });
 
  }

  ionViewWillEnter() {
    this.storage.get('voy_count').then((res) => {
      this.voy_count = res + 1;
      this.voy_tot = res;
      console.log('Total rotations ' + this.voy_tot);
    });
    this.storage.get('serv_etat').then((res) => {
      this.serv_etat = res;
      if (this.serv_etat == null) {
        this.serv_etat = 'false';
      }
      console.log(this.serv_etat);
    });
  }

  async addVoy() {
    this.storage.set('voy_count', this.voy_count);
    console.log('Total rotations: ' + this.voy_count);
    this.navCtrl.push(VoyPage);
  }

  async addServe() {
    if (this.leaving_place == '') {
      const toast = await this.toastController.create({
        message: 'Le lieu de départ ne peut être vide.',
        duration: 2000
      });
      toast.present();
    } else {
      
      try {
        
        if (this.leaving_place == this.point_a) {
          this.arrived_place = this.point_b
        } else {
          this.arrived_place = this.point_a
          
        }
        return new Promise(resolve => {
          let body = {
            line_id: this.line_id,
            service_id: this.service_id,
            leaving_place: this.leaving_place,
            arrived_place: this.arrived_place,
          };
          console.log(body);
          this.postPvdr.postData(body, 'rotations').subscribe(async (res: any) => {
            console.log(res.data);
            if (res.data.etat == 'yes') {

              for (let index = 0; index < this.rates.length; index++) {
                const element = this.rates[index];
                let data = {
                  rate_id: element.id,
                  rate_name: element.name,
                  rotation_id: res.data.rotations.id,
                  price: element.price
                }
              }
              this.storage.set('rotations', 1);
              this.storage.set('voyage_storage', res.data.rotations)
              this.storage.set('serv_etat', 'true');
              this.navCtrl.push(VentePage);
              const toast = await this.toastController.create({
                message: 'Rotation validé',
                duration: 2000,
                position: 'top',
              });
              toast.present();
            } else {
              console.log(res.data);
              const toast = await this.toastController.create({
                message: res.data.etat,
                duration: 2000,
                position: 'top',
              });
            }
          });
        });
      } catch (error) {
        if (error) {
          this.addVoy();
        }
      }
    }
  }

  
  cancel() {
    this.storage.clear();
    this.navCtrl.push(LoginPage);
  }
}
