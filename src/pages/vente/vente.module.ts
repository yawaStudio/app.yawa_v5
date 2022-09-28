import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VentePage } from './vente';

@NgModule({
  declarations: [
    VentePage,
  ],
  imports: [
    IonicPageModule.forChild(VentePage),
  ],
})
export class VentePageModule {}
