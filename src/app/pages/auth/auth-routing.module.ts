import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signin'
    },
    {
        path: 'signin',
        loadChildren: () =>
            import('src/app/pages/auth/signin/signin.module').then((m) => m.SigninPageModule),
    },
    {
        path: 'signup',
        loadChildren: () =>
            import('src/app/pages/auth/signup/signup.module').then((m) => m.SignupPageModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
