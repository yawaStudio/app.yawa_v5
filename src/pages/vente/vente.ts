import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { ApiService } from "../../providers/api/api-service";
import { Storage } from "@ionic/storage";
import { VoyPage } from '../voy/voy';
import { PrinterProvider } from '../../providers/printer/printer';
import { ClosePage } from '../close/close';
import EscPosEncoder from 'esc-pos-encoder-ionic';
import { DeptailPage } from '../deptail/deptail';


@IonicPage()
@Component({
  selector: 'page-vente',
  templateUrl: 'vente.html',
})
export class VentePage {

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

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    private storage: Storage,
    private platform: Platform,
    private postPvdr: ApiService,
    private printer: PrinterProvider,
    private alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    public navParams: NavParams) {

  }

  ionViewWillEnter() {

    this.platform.ready().then(() => {
      // this.storage.get('t_100_storage').then((res) => {
      //   if (res) {
      //   this.nbr_r_tickt = res + 1;
      //   this.nbr_v_tickt = res;

      //   }
      //   console.log('Tickets 100 vendus = ' + this.nbr_v_tickt);
      // });
      // this.storage.get('t_150_storage').then((res) => {
      //   if (res) {
      //   this.nbr_r_tickt_150 = res + 1;
      //   this.nbr_v_tickt_150 = res;

      //   }
      //   console.log('Tickets 150 vendus = ' + this.nbr_v_tickt_150);
      // });
      // this.storage.get('t_200_storage').then((res) => {
      //   if (res) {
      //     this.nbr_r_tickt_200 = res + 1;
      //     this.nbr_v_tickt_200 = res;

      //   }
      //   console.log('Tickets 200 vendus = ' + this.nbr_v_tickt_200);
      // });

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
      this.storage.get('t_250_storage').then((res) => {
        this.nbr_r_tickt_250 = res + 1;
        this.nbr_v_tickt_250 = res;
        console.log('Tickets 250 vendus = ' + this.nbr_v_tickt_250);
      });
      this.storage.get('t_300_storage').then((res) => {
        this.nbr_r_tickt_300 = res + 1;
        this.nbr_v_tickt_300 = res;
        console.log('Tickets 300 vendus = ' + this.nbr_v_tickt_300);
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
      this.storage.get('voyage_storage').then((res) => {
        if (res == null) {
          this.navCtrl.push(VoyPage);
        } else {
          this.voy = res[0];
          this.leaving_place = this.voy.leaving_place;
          this.arrived_place = this.voy.arrived_place;
          this.rotation_id = this.voy.id;
        }
        console.log(res);
      });
      this.storage.get('voy_count').then((res) => {
        this.voy_count = res + 1;
        this.voy_tot = res;
        console.log('Total rotations ' + this.voy_tot);
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


  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.seg = 'false'
  }
  showToast(data) {
    let toast = this.toastController.create({
      duration: 2000,
      message: data,
      position: 'bottom',
    });
    toast.present();
  }
  async depenses() {
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
    this.navCtrl.push(DeptailPage);
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
  deldep(de_id) {
    return new Promise(resolve => {
      let body = {
        service_id: this.service_id,
        expense_id: de_id,
      };
      console.log(body);
      this.postPvdr.postData(body, 'expenses/delete').subscribe(async (res: any) => {
        console.log(res.data);
        this.storage.set('depense_storage', res.data.depense);
        this.navCtrl.push(VentePage);
        const toast = this.toastController.create({
          message: 'Dépense supprimé avec succès!',
          duration: 2000,
          position: 'top',
        });
        toast.present();
      });
    });
  }
  async newZone() {

    try {
      this.sendData();
      if (this.zone === 'Zone A') {
        this.zone = 'Zone B';
      } else {
        this.zone = 'Zone A';
      }
    } catch (error) {
      if (this.zone === 'Zone A') {
        this.zone = 'Zone B';
      } else {
        this.zone = 'Zone A';
      }
    }

  }


  async rotation() {
    try {
      this.sendData();
      if (this.leaving_place == this.point_a) {
        this.leaving_place = this.point_b
        this.arrived_place = this.point_a
      } else {
        this.leaving_place = this.point_a
        this.arrived_place = this.point_b

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
            this.storage.set('voyage_storage', res.data.rotations)
            this.storage.set('serv_etat', 'true');

            const toast = await this.toastController.create({
              message: 'Nouvel Itineraire',
              duration: 2000,
              position: 'top',
            });
            toast.present();
          } else {
            console.log(res.data);
          }
        });
      });
    } catch (error) {
      if (this.leaving_place == this.point_a) {
        this.leaving_place = this.point_b
        this.arrived_place = this.point_a
      } else {
        this.leaving_place = this.point_a
        this.arrived_place = this.point_b
        this.storage.set('voy_count', this.voy_count);
        console.log('Total rotations: ' + this.voy_count);

      }
    }
  }
  // Tickets
  async vticket(data, pu, nom, id) {
    console.log(pu)
    this.price = pu;
    this.qut = '1';
    this.tot = pu;
    this.section = nom;
    console.log('SECTION ' + this.section + ' = ' + this.price);
    this.today = new Date().toLocaleDateString();
    this.heure = new Date().toLocaleTimeString();

    //Just for test leaving
    // if (this.price == 100) {
    //   this.nbr_v_tickt = this.nbr_r_tickt++;
    //   console.log('Total Tickets 100 vendus = ' + this.nbr_v_tickt);
    //   console.log('Prix ' + this.section + ' = ' + this.price);
    //   this.storage.set('t_100_storage', this.nbr_v_tickt);
    //   try {
    //     this.sendData() 
    //   } catch (error) {
    //     const toast = this.toastController.create({
    //       message: 'Connexion perdue!',
    //       duration: 2000,
    //       position: 'top',
    //     });
    //     toast.present();
    //   }
    // } else if (this.price == 150) {
    //   this.nbr_v_tickt_150 = this.nbr_r_tickt_150++;
    //   console.log('Total Tickets 150 vendus = ' + this.nbr_v_tickt_150);
    //   console.log('Prix ' + this.section + ' = ' + this.price);
    //   this.storage.set('t_150_storage', this.nbr_v_tickt_150);
    //   try {
    //     this.sendData() 
    //   } catch (error) {
    //     const toast = this.toastController.create({
    //       message: 'Connexion perdue!',
    //       duration: 2000,
    //       position: 'top',
    //     });
    //     toast.present();
    //   }
    // } else if (this.price == 200) {
    //   this.nbr_v_tickt_200 = this.nbr_r_tickt_200++;
    //   console.log('Total Tickets 200 vendus = ' + this.nbr_v_tickt_200);
    //   console.log('Prix ' + this.section + ' = ' + this.price);
    //   this.storage.set('t_200_storage', this.nbr_v_tickt_200);
    //   try {
    //     this.sendData() 
    //   } catch (error) {
    //     const toast = this.toastController.create({
    //       message: 'Connexion perdue!',
    //       duration: 2000,
    //       position: 'top',
    //     });
    //     toast.present();
    //   }
    // } 

    //Printing
    data.text1 = '*********ITRANS*********';
    data.text2 = this.vehicule_matricule + ' ' + ' - ' + this.line_name;
    data.text3 = this.today + ' à ' + this.heure;
    data.text4 = this.price + ' CFA - ' + this.section;
    data.text5 = '*********ITRANS*********';
    const encoder = new EscPosEncoder();
    const result = encoder.initialize()
    result
      .codepage('cp936')
      .align('center')
      .text(data.text1)
      .qrcode('#YW' + this.service_id + ' ' + this.vehicule_matricule + ' ' + this.line_name + ' ' + this.leaving_place + ' -> ' + this.arrived_place + ' le ' + this.today + ' à ' + this.heure + ' ' + this.price + ' CFA')
      .text(data.text2)
      .newline()
      .text(data.text3)
      .newline()
      .text(data.text4)
      .bold()
      .newline()
      .text(data.text5)
      .newline()
      .newline()
      .newline()
    this.mountAlertBt(result.encode(), this.price, id);
  }


  mountAlertBt(data, pu, id) {
    this.receipt = data;
    this.price = pu;
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      buttons: [{
        text: 'Annuler',
        role: 'cancel',
      },
      {
        text: 'Valider',
        handler: (device) => {
          if (!device) {
            this.showToast('Valider!');
            return false;
          }
          this.print(device, this.receipt, this.price, id);
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
            this.mountAlertBt(this.receipt, this.price, id);
          });
      })
      .catch((error) => {
        console.log(error);
        this.showToast('Error activating bluetooth, please try again!');
        this.mountAlertBt(this.receipt, this.price, id);
      });
  }

  print(device, data, pu, id) {
    this.price = pu;
    let load = this.toastController.create({
      message: 'Veuillez patienter...',
      duration: 2000,
      position: 'top',
    });
    load.present();
    this.printer.connectBluetooth(device).subscribe(
      (status) => {
        console.log(status);
        this.printer
          .printData(data)
          .then((printStatus) => {
            console.log(printStatus);
            if (this.price == 100) {
              this.nbr_v_tickt = this.nbr_r_tickt++;
              this.storage.set('t_100_storage', this.nbr_v_tickt);
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
            } else if (this.price == 150) {
              this.nbr_v_tickt_150 = this.nbr_r_tickt_150++;
              this.storage.set('t_150_storage', this.nbr_v_tickt_150);
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
            } else if (this.price == 200) {
              this.nbr_v_tickt_200 = this.nbr_r_tickt_200++;
              this.storage.set('t_200_storage', this.nbr_v_tickt_200);
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
            }

            this.printer.disconnectBluetooth();
            const toast = this.toastController.create({
              message: 'Vendu',
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
