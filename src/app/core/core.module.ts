import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from 'src/app/core/components/components.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ComponentsModule
    ],
    exports: [ComponentsModule]
})
export class CoreModule {
}
