import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslatorHomeRoutingModule} from './translator-home-routing.module';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslatorHomeComponent} from './translator-home.component';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';


@NgModule({
    declarations: [TranslatorHomeComponent],
    imports: [
        CommonModule,
        TranslatorHomeRoutingModule,
        IonicModule,
        ReactiveFormsModule
    ],
    providers: [LocalNotifications]
})
export class TranslatorHomeModule {
}
