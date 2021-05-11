import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DoctorHomeRoutingModule} from './doctor-home-routing.module';
import {DoctorHomeComponent} from './doctor-home.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [DoctorHomeComponent],
    imports: [
        CommonModule,
        DoctorHomeRoutingModule,
        IonicModule
    ]
})
export class DoctorHomeModule {
}
