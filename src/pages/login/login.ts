import { VentePage } from './../vente/vente';
import {
  Component
} from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from 'ionic-angular';
import { ServicePage } from "../service/service";
import { ApiService } from "../../providers/api/api-service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  username: string = "";
  password: string = "";
  netStatus: any;
  tkt: any;
  stat: number = 0;

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    private storage: Storage,
    private postPvdr: ApiService,
    private loadingCtrl: LoadingController
  ) {
  }

  async proseslogin() {
    if (this.username == '') {
      const toast = await this.toastController.create({
        message: 'Le numéro de l\'appareil ne peut être vide.',
        duration: 2000
      });
      toast.present();
    } else if (this.password == '') {
      const toast = await this.toastController.create({
        message: 'Le code secret ne peut être vide.',
        duration: 2000
      });
      toast.present();
    } else {
      const loader = await this.loadingCtrl.create({
        content: 'Veuillez patienter!',
        duration: 2000
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          username: this.username,
          password: this.password,
          //action: 'auth'
        }
        console.log(body);
        this.postPvdr.postData(body, 'login').subscribe(async (res: any) => {
          console.log(res);
          if (res.data.log == 'yes') {
            console.log(res);
            this.storage.set('sync_storage', this.stat);
            loader.dismiss();
            if (res.data.etat == 'yes') {
              this.storage.set('session_storage', res.data.user);
              this.storage.set('service_storage', res.data.service);
              this.storage.set('line_storage', res.data.line);
              this.storage.set('section_storage', res.data.section);
              this.storage.set('depense_storage', res.data.depense);
              this.storage.set('controls_storage', res.data.controles);
              this.storage.set('controllers_storage', res.data.controllers);
              console.log(res.data.tkt);
              for (let value of res.data.tkt) {
                console.log('t_' +value.price + '_storage = '+ Number(value.qut));
                if (value.price == 100) {
                  this.storage.set('t_100_storage', Number(value.qut));
                  //this.storage.set('nbr_v_tickt', Number(value.qut));
                } else if (value.price == 150) {
                  this.storage.set('t_150_storage', Number(value.qut));
                  //this.storage.set('nbr_v_tickt_150', Number(value.qut));
                } else if (value.price == 200) {
                  this.storage.set('t_200_storage', Number(value.qut));
                  //this.storage.set('nbr_v_tickt_200', Number(value.qut));
                } 
              }
              this.navCtrl.push(VentePage);
            } else {
              this.storage.set('session_storage', res.data);
              this.storage.set('controls_storage', res.data.controles);
              this.navCtrl.push(ServicePage);
            }
            const toast = await this.toastController.create({
              message: 'Bienvenu!',
              duration: 2000
            });
            toast.present();
          } else {
            loader.dismiss();
            const toast = await this.toastController.create({
              message: 'Oups! Identifiants incorrects ou appareil bloqué.',
              duration: 3000,
              position: 'top',
            });
            toast.present();
          }
          this.username = '';
          this.password = '';
        }, (err) => {
          loader.dismiss();
        });
      });
    }
  }
}
