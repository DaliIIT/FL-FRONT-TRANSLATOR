import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminHomeRoutingModule} from './admin-home-routing.module';
import {IonicModule} from '@ionic/angular';
import {AdminHomeComponent} from './admin-home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {ComponentsModule} from '@core/components/components.module';


@NgModule({
    declarations: [AdminHomeComponent],
    imports: [
        CommonModule,
        AdminHomeRoutingModule,
        IonicModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        ComponentsModule
    ],
    providers: [LocalNotifications]
})
export class AdminHomeModule {
}
