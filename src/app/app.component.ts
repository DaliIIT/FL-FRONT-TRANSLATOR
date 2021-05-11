import {Router} from '@angular/router';
import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';

import {IonRouterOutlet, MenuController, NavController, Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ActivitySocketService} from '@core/services/socket/activity-socket.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
    public appPages = [
        {
            title: 'Home',
            url: '/home',
        },
        {
            title: 'Payment',
            url: '/paymentlist',
        },
        {
            title: 'Cancel Appointment',
            url: '/cancel-appointment',
        },
        {
            title: 'Appointment',
            url: '/history',
        },
        {
            title: 'Chat',
            url: '/chat-list',
        },
        {
            title: 'Review',
            url: '/review',
        },
        {
            title: 'Notification',
            url: '/notification',
        },
        {
            title: 'Setting',
            url: '/setting',
        },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menu: MenuController,
        private nav: NavController,
        private toastController: ToastController,
        private router: Router,
        private activitySocketService: ActivitySocketService
    ) {
        this.initializeApp();
        this.backButtonEvent();
        // this.nav.navigateRoot("/home");
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        // this.nav.navigateRoot('/auth/signin');
        this.activitySocketService.getObservable().subscribe(value => console.log(value));
        // const path = window.location.pathname.split('folder/')[1];
        // if (path !== undefined) {
        //     this.selectedIndex = this.appPages.findIndex(
        //         (page) => page.title.toLowerCase() === path.toLowerCase()
        //     );
        // }
    }

    closeMenu() {
        this.menu.close();
    }

    logout() {
        this.menu.close();
        this.nav.navigateRoot('/auth/signin');
    }

    editProfile() {
    }

    backButtonEvent() {
        this.platform.backButton.subscribe(async () => {
            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                if (outlet && outlet.canGoBack()) {
                    outlet.pop();
                } else if (
                    this.router.url === '/home' ||
                    this.router.url === '/auth/signin'
                ) {
                    if (
                        new Date().getTime() - this.lastTimeBackPress <
                        this.timePeriodToExit
                    ) {
                        navigator['app'].exitApp();
                    } else {
                        this.showToast();
                        this.lastTimeBackPress = new Date().getTime();
                    }
                }
            });
        });
    }

    async showToast() {
        const toast = await this.toastController.create({
            message: 'press back again to exit App.',
            duration: 2000,
        });
        toast.present();
    }
}
