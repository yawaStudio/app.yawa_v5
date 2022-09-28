import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosePage } from './close';

@NgModule({
  declarations: [
    ClosePage,
  ],
  imports: [
    IonicPageModule.forChild(ClosePage),
  ],
})
export class ClosePageModule {}
