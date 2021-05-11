import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tabs'
    },
    {
        path: 'tabs',
        loadChildren: () =>
            import('src/app/pages/translator/translator-tabs/translator-tabs.module').then((m) => m.TranslatorTabsModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TranslatorRoutingModule {
}
