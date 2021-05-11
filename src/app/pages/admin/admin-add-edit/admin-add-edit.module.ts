import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminAddEditRoutingModule} from './admin-add-edit-routing.module';
import {AdminAddEditComponent} from './admin-add-edit.component';
import {ComponentsModule} from '@core/components/components.module';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [AdminAddEditComponent],
    imports: [
        CommonModule,
        AdminAddEditRoutingModule,
        ComponentsModule,
        IonicModule,
        ReactiveFormsModule
    ]
})
export class AdminAddEditModule {
}
