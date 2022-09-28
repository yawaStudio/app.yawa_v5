import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptailPage } from './deptail';

@NgModule({
  declarations: [
    DeptailPage,
  ],
  imports: [
    IonicPageModule.forChild(DeptailPage),
  ],
})
export class DeptailPageModule {}
