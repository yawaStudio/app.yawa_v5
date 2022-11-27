import { VentePage } from './../vente/vente';
import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { ApiService } from "../../providers/api/api-service";
import { Storage } from "@ionic/storage";
import { ClosePage } from '../close/close';

@IonicPage()
@Component({
  selector: 'page-rapport',
  templateUrl: 'rapport.html',
})
export class RapportPage {
  sync: any;
  receipt: any;
  ticket: string[] = [];
  netStatus: any;
  stat: any;
  inputData: any = {};
  voy: any;
  ligne: string = '';
  depart: string = 'true';
  arrive: string = 'false';
  service: string = '';
  retour: string = '';
  nbr_voy: string = '';
  lieu_dep: string = '';
  lieu_ret: string = '';
  id_voyage: string = '';
  id_sec: string = '';
  zone: string = 'Zone A';
  num: string = '1';
  rotation_count: number = 0;
  rotations: number = 0;
  tv: number = 0;
  tv_count: number = 0;

  //100
  nbr_v_tickt: number = 0;
  nbr_r_tickt: number = 1;
  //150
  nbr_v_tickt_150: number = 0;
  nbr_r_tickt_150: number = 1;
  //200
  nbr_r_tickt_200: number = 1;
  nbr_v_tickt_200: number = 0;
  //250
  nbr_r_tickt_250: number = 1;
  nbr_v_tickt_250: number = 0;
  //300
  nbr_r_tickt_300: number = 1;
  nbr_v_tickt_300: number = 0;
  //350
  nbr_r_tickt_350: number = 1;
  nbr_v_tickt_350: number = 0;
  nbr_rate: number = 0;
  //400
  nbr_r_tickt_400: number = 1;
  nbr_v_tickt_400: number = 0;
  //450
  nbr_r_tickt_450: number = 1;
  nbr_v_tickt_450: number = 0;
  //500
  nbr_r_tickt_500: number = 1;
  nbr_v_tickt_500: number = 0;

  nbr_ticket: string = '';
  tot: string = '';
  voyage: any[] = [];
  sec: any[] = [];
  printo: any[] = [];
  tickets: any[] = [];

  //ticket items
  compagny: string = '';
  section: string = '';
  id_ligne: string = '';
  id_service: string = '';
  pu: string = '';
  qut: string = '';
  t_tot: string = '';
  bus: string = '';
  id_user: string = '';
  connext: any;
  services: any;
  vente: any;
  today: any;
  date: any;
  todays: any;
  online: any;
  heure: any;
  pu_100: string = '';
  qut_100: string = '';
  tot_100: string = '';
  section_100: string = '';
  comp: any;
  compagny_name: string = '';
  sum_vente: string = "0";
  depense: any;
  sum_dep: string = "0";
  net: string = "0";
  name: string;
  anggota: any;
  rates: any;
  username: any;
  zones: any;
  latitude: any;
  longitude: any;
  since: any;
  a: string = '';
  b: string = '';
  seg: string = 'true';
  line: any[] = [];
  voy_count: number = 0;
  voy_tot: number = 0;
  duree: string = '0';
  device_number: any;
  vehicule_matricule: any;
  operator_name: any;
  companie_name: any;
  line_name: any;
  service_id: any;
  rotation_id: any;
  arrived_place: any;
  leaving_place: any;
  point_a: any;
  point_b: any;
  line_id: any;
  price: any;
  dep: any;
  rat: any;
  controls: any;
  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    private storage: Storage,
    private platform: Platform,
    private postPvdr: ApiService,
    public navParams: NavParams) {

  }
  ionViewWillEnter() {

    this.platform.ready().then(() => {
     
      this.storage.get('t_100_storage').then((res) => {
        this.nbr_r_tickt = res + 1;
        this.nbr_v_tickt = res;
        console.log('Tickets 100 vendus = ' + this.nbr_v_tickt);
      });
      this.storage.get('t_150_storage').then((res) => {
        this.nbr_r_tickt_150 = res + 1;
        this.nbr_v_tickt_150 = res;
        console.log('Tickets 150 vendus = ' + this.nbr_v_tickt_150);
      });
      this.storage.get('t_200_storage').then((res) => {
        this.nbr_r_tickt_200 = res + 1;
        this.nbr_v_tickt_200 = res;
        console.log('Tickets 200 vendus = ' + this.nbr_v_tickt_200);
      });


      this.storage.get('service_storage').then((res) => {
        this.service_id = res.id;
        this.device_number = res.device_number;
        this.vehicule_matricule = res.vehicule_matricule;
        this.operator_name = res.operator_name;
        this.companie_name = res.companie_name;
        console.log(res);
      });
      this.storage.get('section_storage').then((res) => {
        this.sec = res;
        console.log(res);
      });
      this.storage.get('tickets_storage').then((res) => {
        this.tickets = res;
        console.log(this.tickets);
      });
      this.storage.get('depense_storage').then((res) => {
        if (res) {
          this.dep = res.expenses;
          this.sum_dep = res.sum_dep;
        }
        console.log('Dépenses = ' + this.sum_dep);
        console.log(this.dep);
      });
      this.storage.get('controls_storage').then((res) => {
        if (res) {
          this.controls = res;
        }
        console.log('Controleurs = ' , this.sum_dep);
      });
      this.storage.get('voyage_storage').then((res) => {
        if (res == null) {
        } else {
          this.voy = res[0];
          this.leaving_place = this.voy.leaving_place;
          this.arrived_place = this.voy.arrived_place;
          this.rotation_id = this.voy.id;
        }
        console.log('ROTATION ', this.voy);
      });


      this.storage.get('rotations').then((res) => {
        this.rotation_count = res + 1;
        this.rotations = res;
        console.log('Total rotations ' + this.rotations);
      });
      this.storage.get('t_en_vu').then((res) => {
        this.tv_count = res + 1;
        this.tv = res;
        console.log('Total rotations ' + this.tv);
      });

      this.today = Date.now();

      this.storage.get('line_storage').then((res) => {
        this.line_name = res.name;
        this.point_a = res.point_a;
        this.point_b = res.point_b;
        this.line_id = res.id;
        console.log(res);
      });
    });
    console.log('seg = ' + this.seg);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RapportPage');
  }
  async back() {
    this.navCtrl.push(VentePage);
  }

  async close() {
    try {
      this.sendData()
    } catch (error) {
      const toast = this.toastController.create({
        message: 'Connexion perdue!',
        duration: 2000,
        position: 'top',
      });
      toast.present();
    }
    this.navCtrl.push(ClosePage);
  }

  async sendData() {
    return new Promise(resolve => {
      let body = {
        service_id: this.service_id,
        rotation_id: this.rotation_id,
        t_100: this.nbr_v_tickt,
        t_150: this.nbr_v_tickt_150,
        t_200: this.nbr_v_tickt_200,
        t_250: this.nbr_v_tickt_250,
        t_300: this.nbr_v_tickt_300,
      };
      console.log(body);
      this.postPvdr.seller(body, 'vente').subscribe(async (res: any) => {
        if (res.data.status == 'yes') {
          const toast = this.toastController.create({
            message: 'Service a été synchronisé avec succès!',
            duration: 2000,
            position: 'top',
          });
          toast.present();
        } else {
          const toast = this.toastController.create({
            message: 'Erreur de synchronisation!',
            duration: 2000,
            position: 'top',
          });
          toast.present();
        }
      });

    });
  }
}
