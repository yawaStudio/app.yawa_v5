import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { ApiService } from "../../providers/api/api-service";
import { Storage } from "@ionic/storage";
import { Network } from '@ionic-native/network';
import { VentePage } from '../vente/vente';



@IonicPage()
@Component({
  selector: 'page-deptail',
  templateUrl: 'deptail.html',
})
export class DeptailPage {

  rub: string = '';
  mont: string = '';
  id_apikey: string = '';
  compagny: string = '';
  id_ligne: string = '';
  id_service: string = '';
  bus: string = '';
  id_user: string = '';
  service: any;
  deps: any;
  netStatus: any;
  dep: any[] = [];
  rubrique: any;
  vente: any;
  sum_vente: string = "0";
  tot_tikt: string = '';
  sum_dep: string = "0";
  net: string = "0";
  tikt_100: string = "0";
  tikt_150: string = "0";
  service_id: any;
  device_number: any;
  vehicule_matricule: any;
  operator_name: any;
  companie_name: any;
  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    private storage: Storage,
    private postPvdr: ApiService,
    private network: Network,
    private loadingCtrl: LoadingController) {
    this.storage.get('rub_storage').then((res) => {
      this.rubrique = res;
      console.log(res);
    });
  }

  ionViewWillEnter() {
    this.storage.get('service_storage').then((res) => {
      this.service_id = res.id;
      console.log(res);
    });
    this.storage.get('depense_storage').then((res) => {
      if (res == null) {
        this.dep = [];
      } else {
        this.dep = res.expenses;
        this.sum_dep = res.sum_dep;
      }
    });

  }

  async depense() {
    if (this.rub == '') {
      const toast = await this.toastController.create({
        message: 'La rubrique ne peut être vide.',
        duration: 2000
      });
      toast.present();
    } else if (this.mont == '') {
      const toast = await this.toastController.create({
        message: 'Le montant ne peut être vide.',
        duration: 2000
      });
      toast.present();
    } else {
      const loader = await this.loadingCtrl.create({
        content: 'Veuillez patienter!',
      });
      loader.present();
      return new Promise(resolve => {
        let body = {
          name: this.rub,
          sum: this.mont,
          service_id: this.service_id,
        }
        this.postPvdr.postData(body, 'expenses').subscribe(async (res: any) => {
          var alertpesan = res.msg;
          if (res.data.etat == 'yes') {
            console.log(res);
            this.storage.set('depense_storage', res.data.depense);
            loader.dismiss();
            const toast = await this.toastController.create({
              message: 'Valider!',
              duration: 2000,
              position: 'top',
            });
            toast.present();
            this.navCtrl.push(VentePage);
          } else {
            loader.dismiss();
            const toast = await this.toastController.create({
              message: alertpesan,
              duration: 2000,
              position: 'top',
            });
            toast.present();
          }
          this.rub = '';
          this.mont = '';
        }, (err) => {
          loader.dismiss();
        });
      });
    }
  }

  async close() {
    this.navCtrl.push(VentePage);
  }
}
