import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslatorTabsRoutingModule} from './translator-tabs-routing.module';
import {TranslatorTabsComponent} from './translator-tabs.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [TranslatorTabsComponent],
    imports: [
        CommonModule,
        TranslatorTabsRoutingModule,
        IonicModule
    ]
})
export class TranslatorTabsModule {
}
