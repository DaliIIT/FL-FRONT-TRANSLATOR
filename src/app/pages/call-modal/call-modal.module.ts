import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallModalPageRoutingModule } from './call-modal-routing.module';

import { CallModalPage } from './call-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallModalPageRoutingModule
  ],
  declarations: [CallModalPage]
})
export class CallModalPageModule {}
