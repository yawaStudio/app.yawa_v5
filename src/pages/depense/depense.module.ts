import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepensePage } from './depense';

@NgModule({
  declarations: [
    DepensePage,
  ],
  imports: [
    IonicPageModule.forChild(DepensePage),
  ],
})
export class DepensePageModule {}
