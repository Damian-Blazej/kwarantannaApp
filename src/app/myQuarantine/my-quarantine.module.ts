import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyQuarantinePage } from './my-quarantine.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MyQuarantinePageRoutingModule } from './my-quarantine-routing.module';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MyQuarantinePageRoutingModule
  ],
  declarations: [MyQuarantinePage]
})
export class MyQuarantinePageModule {
}
