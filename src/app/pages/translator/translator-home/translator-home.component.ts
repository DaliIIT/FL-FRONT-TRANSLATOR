import {Component, OnInit} from '@angular/core';
import {ActivitySocketService} from '@core/services/socket/activity-socket.service';
import {Router} from '@angular/router';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Component({
    selector: 'app-translator-home',
    templateUrl: './translator-home.component.html',
    styleUrls: ['./translator-home.component.scss'],
})
export class TranslatorHomeComponent implements OnInit {

    calls: any[] = [{name: 'Amine Mekki', duration: '40', date: '13.01.2021'},
        {name: 'Med Ali Jallouli', duration: '40', date: '13.01.2021'},
        {name: 'Foulen ben Foulen', duration: '40', date: '13.01.2021'}];
    clickSub: any;

    constructor(private activitySocketService: ActivitySocketService,
                private router: Router,
                private localNotifications: LocalNotifications) {
    }

    unsub() {
        this.clickSub.unsubscribe();
    }

    ngOnInit() {
        this.localNotifications.schedule({
            id: 1,
            title: 'My first notification',
            text: 'Hello Amine Mekki',
            sound: 'file://sound.mp3',
            foreground: true,
            data: {secret: 'username'}
        });

        this.clickSub = this.localNotifications.on('click').subscribe(data => {
            console.log(data);
            this.router.navigate(['/video-call'], {queryParams: {lang: 'Serbisch'}});
            this.unsub();
        });
    }

}
