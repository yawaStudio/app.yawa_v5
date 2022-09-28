import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyPage } from './voy';

@NgModule({
  declarations: [
    VoyPage,
  ],
  imports: [
    IonicPageModule.forChild(VoyPage),
  ],
})
export class VoyPageModule {}
