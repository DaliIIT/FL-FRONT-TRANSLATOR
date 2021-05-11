import {CallModalPageModule} from './pages/call-modal/call-modal.module';
import {NgSelectModule} from '@ng-select/ng-select';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {RxStompService} from '@stomp/ng2-stompjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InterceptorService} from '@core/interceptor/interceptor-service';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        NgSelectModule,
        FormsModule,
        AppRoutingModule,
        CallModalPageModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [
        NativeStorage,
        StatusBar,
        SplashScreen,
        RxStompService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }

    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
