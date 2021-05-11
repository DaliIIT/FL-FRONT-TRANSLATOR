import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslatorHomeRoutingModule} from './translator-home-routing.module';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslatorHomeComponent} from './translator-home.component';


@NgModule({
    declarations: [TranslatorHomeComponent],
    imports: [
        CommonModule,
        TranslatorHomeRoutingModule,
        IonicModule,
        ReactiveFormsModule
    ]
})
export class TranslatorHomeModule {
}
