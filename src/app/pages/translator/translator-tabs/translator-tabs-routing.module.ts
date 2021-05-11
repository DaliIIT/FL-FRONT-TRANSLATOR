import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TranslatorTabsComponent} from './translator-tabs.component';


const routes: Routes = [
    {
        path: '',
        component: TranslatorTabsComponent,
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('src/app/pages/translator/translator-home/translator-home.module').then((m) => m.TranslatorHomeModule)
            },
            {
                path: 'call',
                loadChildren: () =>
                    import('src/app/pages/translator/translator-call/translator-call.module').then((m) => m.TranslatorCallModule)
            },
            {
                path: 'profile',
                loadChildren: () =>
                    import('src/app/pages/translator/translator-profile/translator-profile.module').then((m) => m.TranslatorProfileModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TranslatorTabsRoutingModule {
}
