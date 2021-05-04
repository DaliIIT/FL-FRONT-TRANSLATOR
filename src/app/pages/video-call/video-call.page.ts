import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CallService} from 'src/app/pages/video-call/call.service';
import {filter, map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

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
                private route: ActivatedRoute) {
        this.isCallStarted$ = this.callService.isCallStarted$;
        this.peerId = this.callService.initPeer();
    }

    ngOnInit(): void {

        this.callService.localStream$
            .pipe(filter(res => !!res))
            .subscribe(stream => this.localVideo.nativeElement.srcObject = stream);
        this.callService.remoteStream$
            .pipe(filter(res => !!res))
            .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream);
        this.route.queryParams.pipe(
            // filter(params => !!params.peerId),
            map(params => params.peerId),
            switchMap(peerId => peerId ? of(this.callService.establishMediaCall(peerId)) : of(this.callService.enableCallAnswer()))
        ).subscribe(_ => {
        });
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
