import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivitySocketService} from '@core/services/socket/activity-socket.service';
import {Router} from '@angular/router';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {filter, map, takeWhile} from 'rxjs/operators';
import {User} from '@core/models/User';

@Component({
    selector: 'app-translator-home',
    templateUrl: './translator-home.component.html',
    styleUrls: ['./translator-home.component.scss'],
})
export class TranslatorHomeComponent implements OnInit, OnDestroy {
    private _isAlive = true;

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

        this.activitySocketService.getObservable()
            .pipe(
                takeWhile(() => this._isAlive),
                filter(value => value.message && value.message.event === 'ask'),
                map(value => value.message.value)
            )
            .subscribe((user: User) => {
                this.localNotifications.schedule({
                    id: 1,
                    title: 'TRANSLATLLY',
                    text: `${user.fullName} is requesting on demand translation`,
                    sound: 'file://sound.mp3',
                    foreground: true,
                    data: {username: user.username}
                });
            });


        this.clickSub = this.localNotifications.on('click').subscribe(data => {
            console.log(data);
            this.router.navigate(['/video-call'], {queryParams: {user: data.username}});
            this.unsub();
        });

    }

    ngOnDestroy(): void {
        this._isAlive = false;
    }

}
