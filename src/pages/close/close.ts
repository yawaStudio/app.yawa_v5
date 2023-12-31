import { Component, } from '@angular/core';
import {
  IonicPage, NavController, ToastController,
  LoadingController, Platform, ViewController, AlertController
} from 'ionic-angular';
import { ApiService } from "../../providers/api/api-service";
import { Storage } from "@ionic/storage";
import { LoginPage } from '../login/login';
import { PrinterProvider } from '../../providers/printer/printer';
import EscPosEncoder from 'esc-pos-encoder-ionic';
import { VentePage } from '../vente/vente';

@IonicPage()
@Component({
  selector: 'page-close',
  templateUrl: 'close.html',
})
export class ClosePage {
  //session
  username: string;
  user_id: string;
  serv_id: string;
  name: string;
  driver: string;
  kilo_deb: string = '';
  kilo_fin: string = '';
  compagny: string;
  anggota: any;
  service: any;
  role: string;
  id_service: string;
  ligne: any = [];
  count_tkt: any = [];
  printo: any[] = [];
  today: any;
  tot_tikt: number = 0;
  fin: any;
  last: any;
  debut: any;
  date_serve: any;
  bus: string = '';
  deps: any;
  vente: any;
  ferme: any;
  sum_vente: number = 0;
  depense: any;
  sum_dep: number = 0;
  net: number = 0;
  tikt_100: number = 0;
  tikt_150: number = 0;
  rest: number = 0;
  carb: string = "0";
  depa: string = "0";
  rat: string = "0";
  prim: string = "0";
  garde: string = "0";
  lave: string = "0";
  div: string = "0";
  nom_rub: string = "0";
  nbr_v_tickt: number = 0;
  nbr_v_tickt_150: number = 0;
  nbr_v_tickt_200: number = 0;
  nbr_v_tickt_250: number = 0;
  nbr_v_tickt_300: number = 0;
  nbr_v_tickt_350: number = 0;
  nbr_v_tickt_400: number = 0;
  nbr_v_tickt_450: number = 0;
  nbr_v_tickt_500: number = 0;
  //printer
  receipt: any;
  inputData: any = {};
  bluetoothList: any = [];
  selectedPrinter: any;
  netStatus: any;
  dep: any;
  mont: any;
  rub: any;
  regu: any;
  compagny_name: string = '';
  op_number: string = '';
  op_name: string = '';
  heure: string;
  sta: any;
  service_id: any;
  controls: any;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    private storage: Storage,
    private postPvdr: ApiService,
    private platform: Platform,
    private printer: PrinterProvider,
    private alertCtrl: AlertController,
    public viewCtrl: ViewController,
  ) {
    this.storage.get('t_100_storage').then((res) => {
      this.nbr_v_tickt = res;
      console.log('Tickets 100 vendus = ' + this.nbr_v_tickt);
    });
    this.storage.get('t_150_storage').then((res) => {
      this.nbr_v_tickt_150 = res;
      console.log('Tickets 150 vendus = ' + this.nbr_v_tickt_150);
    });
    this.storage.get('t_200_storage').then((res) => {
      this.nbr_v_tickt_200 = res;
      console.log('Tickets 200 vendus = ' + this.nbr_v_tickt_200);
    });


    this.storage.get('printer').then((res) => {
      this.printo = res;
    });
    this.today = new Date().toLocaleDateString();
    this.heure = new Date().toLocaleTimeString();

  }

  showToast(data) {
    let toast = this.toastController.create({
      duration: 2000,
      message: data,
      position: 'bottom',
    });
    toast.present();
  }
  ionViewWillEnter() {

    this.platform.ready().then(() => {
      this.today = Date.now();
      this.storage.get('service_storage').then((res) => {
        this.service_id = res.id;
        console.log(res);
      });
      this.storage.get('depense_storage').then((res) => {
        if (res) {
          this.dep = res.expenses;
          this.sum_dep = res.sum_dep;
        }
        console.log('Dépenses = ' + this.sum_dep);
        console.log(this.dep);
      });
      console.log(this.sum_dep);

    });
    this.storage.get('controls_storage').then((res) => {
      if (res) {
        this.controls = res;
      }
      console.log('Controleurs = ', this.sum_dep);
    });

  }

  async close(data) {
    if (this.kilo_fin == '') {
      const toast = await this.toastController.create({
        message: 'Le Kilométrage de fin ne peut être vide.',
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
          service_id: this.service_id,
          end_miles: this.kilo_fin
        }
        console.log(body);
        this.postPvdr.postData(body, 'close').subscribe(async (res: any) => {
          if (res.data.etat == 'yes') {
            console.log(res.data);
            loader.dismiss();
            //this.storage.clear();
            //this.printer.disconnectBluetooth();
            //this.navCtrl.push(LoginPage);
            //Printing
            // u can remove this when generate the receipt using another method
            data.text1 = '*********ITRANS*********';
            data.text2 = '--- INFOS OPERATEUR ---';
            data.text3 = 'ZN: ' + res.data.service.zone_name;
            data.text4 = 'CP: ' + res.data.service.companie_name;
            data.text5 = 'OP: ' + res.data.service.operator_name;
            data.text6 = 'BUS: ' + res.data.service.vehicule_matricule;
            data.text7 = 'POS: ' + res.data.service.device_number;
            data.text8 = '--- INFOS SERVICE ---';
            data.text9 = 'DATE: ' + res.data.service.service_date;
            data.text10 = 'RECEVEUR(SE): ' + res.data.service.seller;
            data.text11 = 'CHAUFFEUR: ' + res.data.service.driver;
            data.text12 = 'LIGNE: ' + res.data.service.line_name;
            data.text13 = 'DEBUT: ' + res.data.service.start_time;
            data.text14 = 'FIN: ' + res.data.service.end_time;
            data.text15 = 'KM DEPART: ' + res.data.service.start_miles + 'km';
            data.text16 = 'KM FIN: ' + res.data.service.end_miles + 'km';
            data.text17 = 'ROTATIONS: ' + res.data.rotation;
            data.text18 = 'CONTROLES: ' + res.data.controles.count;
            data.text19 = ' =====================';

            data.text20 = ' ---RECETTES--- ';
            for (let value of res.data.vente.tickets) {
              if (value.price == 100) {
                data.text21 = 'TICKETS ' + value.price + ' | ' + value.qut + ' | ' + value.sum + ' CFA ';
              }
              if (value.price == 150) {
                data.text22 = 'TICKETS ' + value.price + ' | ' + value.qut + ' | ' + value.sum + ' CFA ';
              }
              if (value.price == 200) {
                data.text23 = 'TICKETS ' + value.price + ' | ' + value.qut + ' | ' + value.sum + ' CFA ';
              }
            }
            data.text24 = 'TOT RECETTES | ' + res.data.service.tickets_count + ' | ' + res.data.vente.sum_tic + ' CFA';
            data.text25 = ' ===================== ';
            data.text26 = ' ---DEPENSES--- ';
            for (let value of res.data.depense.expenses) {
              if (value.name == 'Carburant') {
                data.text27 = 'Carburant | ' + value.sum + ' CFA ';
              }
              if (value.name === 'Regulateur') {
                data.text28 = 'Régulateur | ' + value.sum + ' CFA ';
              }
              if (value.name === 'Ration') {
                data.text29 = value.name + ' | ' + value.sum + ' CFA ';
              }
              if (value.name === 'Depannage') {
                data.text30 = 'Dépannage | ' + value.sum + ' CFA ';
              }
              if (value.name === 'Operateur') {
                data.text31 = 'Opérateur | ' + value.sum + ' CFA ';
              }
              if (value.name === 'Divers') {
                data.text32 = 'Divers | ' + value.sum + ' CFA ';
              } else {
                data.text32 = 'Divers | 0 CFA ';
              }
            }
            data.text33 = 'TOTAL | ' + res.data.depense.sum_dep + ' CFA';
            data.text34 = ' ===================== ';
            data.text35 = ' ---NET A VERSER--- ';
            data.text36 = 'TOTAL VENTES: ' + res.data.vente.sum_tic + ' CFA';
            data.text37 = 'TOTAL DEPENSES: ' + res.data.depense.sum_dep + ' CFA';
            data.text38 = 'NET A VERSER: ' + res.data.service.service_balance + ' CFA';
            data.text39 = '*********ITRANS*********';
            const encoder = new EscPosEncoder();
            const result = encoder.initialize();

            result
              .codepage('cp936')
              .align('left')
              .text(data.text1)
              .newline()
              .text(data.text2)
              .newline()
              .text(data.text3)
              .newline()
              .text(data.text4)
              .newline()
              .text(data.text5)
              .newline()
              .text(data.text6)
              .newline()
              .text(data.text7)
              .newline()
              .text(data.text8)
              .newline()
              .text(data.text9)
              .newline()
              .text(data.text10)
              .newline()
              .text(data.text11)
              .newline()
              .text(data.text12)
              .newline()
              .text(data.text13)
              .newline()
              .text(data.text14)
              .newline()
              .text(data.text15)
              .newline()
              .text(data.text16)
              .newline()
              .text(data.text17)
              .newline()
              .text(data.text18)
              .newline()
              .text(data.text19)
              .newline()
              .text(data.text20)
              .newline()
              .text(data.text21)
              .newline()
              .text(data.text22)
              .newline()
              .text(data.text23)
              .newline()
              .text(data.text24)
              .newline()
              .text(data.text25)
              .newline()
              .text(data.text26)
              .newline()
              .text(data.text27)
              .newline()
              .text(data.text28)
              .newline()
              .text(data.text29)
              .newline()
              .text(data.text30)
              .newline()
              .text(data.text31)
              .newline()
              .text(data.text32)
              .newline()
              .text(data.text33)
              .newline()
              .text(data.text34)
              .newline()
              .text(data.text35)
              .newline()
              .text(data.text36)
              .newline()
              .text(data.text37)
              .newline()
              .text(data.text38)
              .newline()
              .text(data.text39)
              .newline()
              .newline()
              .newline()
              .newline()
              .newline()
              .newline()
              .newline()
              .newline()
            this.mountAlertBt(result.encode());

          } else {
            loader.dismiss();
            const toast = await this.toastController.create({
              message: res.data.etat,
              duration: 2000
            });
            toast.present();
          }
        }, (err) => {
          loader.dismiss();
          this.navCtrl.push(LoginPage);
          const toast = this.toastController.create({
            message: 'Erreur ',
            duration: 2000,
            position: 'top',
          });
          toast.present();
        });

      });
    }
  }
  print(device, data) {
    console.log('Device mac: ', device);
    console.log('Data: ', JSON.stringify(data));
    console.log('Printer ' + this.printo);
    let load = this.toastController.create({
      message: 'Veuillez patienter...',
    });
    load.present();
    this.printer.connectBluetooth(device).subscribe(
      (status) => {
        console.log(status);
        this.printer
          .printData(data)
          .then((printStatus) => {
            console.log(printStatus);
            this.storage.clear();
            this.printer.disconnectBluetooth();

            this.navCtrl.push(LoginPage);
            const toast = this.toastController.create({
              message: 'Service fermé avec succès!',
              duration: 2000,
              position: 'top',
            });
            toast.present();
            load.dismiss();

          })
          .catch((error) => {
            console.log(error);
            let alert = this.alertCtrl.create({
              title: 'Une erreur s\'est produite lors de l\'impression, veuillez réessayer!',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  load.dismiss();
                  this.printer.disconnectBluetooth();
                },
              },],
            });
            alert.present();
          });
      },
      (error) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Une erreur s\'est produite lors de la connexion à l\'imprimante, veuillez réessayer!',
          buttons: [{
            text: 'Ok',
            handler: () => {
              load.dismiss();
              this.printer.disconnectBluetooth();
            },
          },],
        });
        alert.present();
      },
    );
  }
  mountAlertBt(data) {
    this.receipt = data;
    let alert = this.alertCtrl.create({
      title: 'Select your printer',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Select printer',
        handler: (device) => {
          if (!device) {
            this.showToast('Select a printer!');
            return false;
          }
          console.log(device);
          this.storage.set('printer', device);
          this.print(device, this.receipt);
        },
      },
      ],
    });
    this.printer
      .enableBluetooth()
      .then(() => {
        this.printer
          .searchBluetooth()
          .then((devices) => {
            devices.forEach((device) => {
              console.log('Devices: ', JSON.stringify(device));
              alert.addInput({
                name: 'printer',
                value: device.address,
                label: device.name,
                type: 'radio',
              });
            });
            alert.present();
          })
          .catch((error) => {
            console.log(error);
            this.showToast(
              'There was an error connecting the printer, please try again!',
            );
            this.mountAlertBt(this.receipt);
          });
      })
      .catch((error) => {
        console.log(error);
        this.showToast('Error activating bluetooth, please try again!');
        this.mountAlertBt(this.receipt);
      });
  }
  async cancel() {
    this.navCtrl.push(VentePage);
  }


}
