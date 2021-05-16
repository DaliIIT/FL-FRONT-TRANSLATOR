import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {CallService} from 'src/app/pages/video-call/call.service';
import {filter, map, switchMap, takeWhile, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallService} from '@core/services/api/api-call.service';
import {MenuController} from '@ionic/angular';
import {UserService} from '@core/services/api/user.service';
import {ActivitySocketService} from '@core/services/socket/activity-socket.service';

@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.page.html',
    styleUrls: ['./video-call.page.scss'],
})
export class VideoCallPage implements OnInit, OnDestroy {
    private _isAlive = true;
    isMuted = false;
    public isCallStarted$: Observable<boolean>;
    private peerId: string;

    @ViewChild('localVideo', {static: false}) localVideo: ElementRef<HTMLVideoElement>;
    @ViewChild('remoteVideo', {static: false}) remoteVideo: ElementRef<HTMLVideoElement>;
    private roomId: string;

    constructor(private callService: CallService,
                private apiCallService: ApiCallService,
                private menu: MenuController,
                private userService: UserService,
                private route: ActivatedRoute,
                private activitySocket: ActivitySocketService,
                private router: Router
    ) {
        this.isCallStarted$ = this.callService.isCallStarted$;
        this.menu.enable(false);
    }

    ngOnInit(): void {

        this.activitySocket.getObservable().pipe(
            takeWhile(() => this._isAlive),
            filter(value => value.message && value.message.event === 'call-disconnect')
        ).subscribe(value => {
            this.endCall();
        });

        this.peerId = this.callService.initPeer();

        // ask for translator
        this.route.queryParams.pipe(
            takeWhile(() => this._isAlive),
            filter(params => !!params.lang),
            switchMap(params => this.apiCallService.askForTranslator(params.lang, this.peerId)),
            tap(roomId => this.roomId = roomId && roomId.value),
            switchMap(_ => this.callService.enableCallAnswer())
        ).subscribe(_ => {
        });

        // join user
        this.route.queryParams.pipe(
            takeWhile(() => this._isAlive),
            filter(params => !!params.user),
            switchMap(params => this.apiCallService.joinCall(this.peerId, params.user)),
            tap(room => this.roomId = room.roomId),
            map(room => room.clientPeerId),
            switchMap(peerId => this.callService.establishMediaCall(peerId))
        ).subscribe(_ => {
        });

        this.callService.localStream$
            .pipe(
                takeWhile(() => this._isAlive),
                filter(res => !!res),
                tap(res => res.getAudioTracks()[0].enabled = !this.isMuted)
            )
            .subscribe(stream => this.localVideo.nativeElement.srcObject = stream);

        this.callService.remoteStream$
            .pipe(
                takeWhile(() => this._isAlive),
                filter(res => !!res)
            )
            .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream);


        // this.route.queryParams.pipe(
        //     // filter(params => !!params.peerId),
        //     map(params => params.peerId),
        //     switchMap(peerId => peerId ? of(this.callService.establishMediaCall(peerId)) : of(this.callService.enableCallAnswer()))
        // ).subscribe(_ => {
        // });
    }


    onMute() {
        this.isMuted = !this.isMuted;
    }

    public endCall() {
        try {
            this.callService.closeMediaCall();
        } finally {
            this.apiCallService.leaveRoom(this.roomId).subscribe(_ => this.router.navigate(['/']));
        }
    }

    ngOnDestroy(): void {
        this._isAlive = false;
        this.callService.destroyPeer();
    }

}
