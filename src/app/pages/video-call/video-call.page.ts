import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CallService} from 'src/app/pages/video-call/call.service';
import {filter, map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ApiCallService} from '@core/services/api/api-call.service';
import {MenuController} from '@ionic/angular';
import {UserService} from '@core/services/api/user.service';

@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.page.html',
    styleUrls: ['./video-call.page.scss'],
})
export class VideoCallPage implements OnInit, OnDestroy {
    public isCallStarted$: Observable<boolean>;
    private peerId: string;

    @ViewChild('localVideo', {static: false}) localVideo: ElementRef<HTMLVideoElement>;
    @ViewChild('remoteVideo', {static: false}) remoteVideo: ElementRef<HTMLVideoElement>;

    constructor(private callService: CallService,
                private apiCallService: ApiCallService,
                private menu: MenuController,
                private userService: UserService,
                private route: ActivatedRoute) {
        this.isCallStarted$ = this.callService.isCallStarted$;
        this.menu.enable(false);
    }

    ngOnInit(): void {

        this.peerId = this.callService.initPeer();

        // ask for translator
        this.route.queryParams.pipe(
            filter(params => !!params.lang),
            switchMap(params => this.apiCallService.askForTranslator(params.lang, this.peerId)),
            switchMap(_ => this.callService.enableCallAnswer())
        ).subscribe(_ => {
            console.log('fdsfds');
        });

        // join user
        this.route.queryParams.pipe(
            filter(params => !!params.user),
            switchMap(params => this.apiCallService.joinCall(this.peerId, params.user)),
            switchMap( peerId => this.callService.establishMediaCall(peerId))
        ).subscribe(_ => {
            console.log('fdsfds');
        });

        this.callService.localStream$
            .pipe(filter(res => !!res))
            .subscribe(stream => this.localVideo.nativeElement.srcObject = stream);

        this.callService.remoteStream$
            .pipe(filter(res => !!res))
            .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream);

        // this.route.queryParams.pipe(
        //     // filter(params => !!params.peerId),
        //     map(params => params.peerId),
        //     switchMap(peerId => peerId ? of(this.callService.establishMediaCall(peerId)) : of(this.callService.enableCallAnswer()))
        // ).subscribe(_ => {
        // });
    }


    public showModal(joinCall: boolean): void {

        // let dialogData: DialogData = joinCall ? ({peerId: null, joinCall: true}) : ({
        //     peerId: this.peerId,
        //     joinCall: false
        // });
        // const dialogRef = this.dialog.open(CallInfoDialogComponents, {
        //     width: '250px',
        //     data: dialogData
        // });
        //
        // dialogRef.afterClosed()
        //     .pipe(
        //         switchMap(peerId =>
        //             joinCall ? of(this.callService.establishMediaCall(peerId)) : of(this.callService.enableCallAnswer())
        //         ),
        //     )
        //     .subscribe(_ => {
        //     });
    }

    public endCall() {
        this.callService.closeMediaCall();
    }

    ngOnDestroy(): void {
        this.callService.destroyPeer();
    }

}
