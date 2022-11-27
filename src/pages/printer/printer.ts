import { VentePage } from './../vente/vente';
import {
  Component
} from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from 'ionic-angular';
import {
  PrinterProvider
} from '../../providers/printer/printer';
import { Storage } from "@ionic/storage";
//import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'page-printer',
  templateUrl: 'printer.html',
})

export class PrinterPage {
  receipt: any;
  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    //private barcodeScanner: BarcodeScanner
  ) { }

  showToast(data) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: data,
      position: 'bottom',
    });
    toast.present();
  }
  async goBack() {
    this.navCtrl.push(VentePage);
  }
  // qrCode() {
  //   const options: BarcodeScannerOptions = {
  //     preferFrontCamera: false,
  //     showFlipCameraButton: true,
  //     showTorchButton: true,
  //     torchOn: false,
  //     prompt: 'Place a barcode inside the scan area',
  //     resultDisplayDuration: 500,
  //     formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
  //     orientation: 'portrait',
  //   };

  //   this.barcodeScanner.scan(options).then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //     this.scannedData = barcodeData;
  //     const alert = this.alertCtrl.create({
  //       subTitle: 'QrCode  ',
  //       message: this.scannedData,
  //       buttons: ['OK']
  //     });
  //     alert.present();

  //   }).catch(err => {
  //     console.log('Error', err);
  //   });
  // }

}
