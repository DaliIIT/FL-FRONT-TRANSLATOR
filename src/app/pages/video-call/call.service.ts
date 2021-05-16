import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
// import * as Peer from 'peerjs';
import Peer from 'peerjs';
import {NgxPermissionsService} from 'ngx-permissions';
import {environment} from 'src/environments/environment';


@Injectable()
export class CallService {
    perm = ['ADMIN', 'MEDIA', 'VIDEO_CAPTURE', 'AUDIO_CAPTURE'];

    private peer: Peer;
    private mediaCall: Peer.MediaConnection;

    private localStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
    public localStream$ = this.localStreamBs.asObservable();
    private remoteStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
    public remoteStream$ = this.remoteStreamBs.asObservable();

    private isCallStartedBs = new Subject<boolean>();
    public isCallStarted$ = this.isCallStartedBs.asObservable();

    constructor(
        private permissionsService: NgxPermissionsService,
    ) {
    }

    public initPeer(id = uuidv4()): string {
        if (!this.peer || this.peer.disconnected) {
            const peerJsOptions: Peer.PeerJSOption = {
                debug: 3,
                config: {
                    iceServers: [
                        ...environment.iceServers
                    ]
                }
            };
            try {
                this.peer = new Peer(id, peerJsOptions);
                return id;
            } catch (error) {
                console.error(error);
            }
        }
    }

    public async establishMediaCall(remotePeerId: string) {
        try {
            await this.permissionsService.hasPermission(this.perm);
            const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});

            const connection = this.peer.connect(remotePeerId);
            connection.on('error', err => {
                console.error(err);
                // this.snackBar.open(err, 'Close');
            });
            this.mediaCall = this.peer.call(remotePeerId, stream);
            if (!this.mediaCall) {
                const errorMessage = 'Unable to connect to remote peer';
                // this.snackBar.open(errorMessage, 'Close');
                throw new Error(errorMessage);
            }
            this.localStreamBs.next(stream);
            this.isCallStartedBs.next(true);

            this.mediaCall.on('stream',
                (remoteStream) => {
                    this.remoteStreamBs.next(remoteStream);
                });

            this.mediaCall.on('error', err => {
                alert(err.toString());
                console.error(err);
                this.isCallStartedBs.next(false);
            });

            this.mediaCall.on('close', () => this.onCallClose());
        } catch (ex) {
            console.error(ex);
            alert(ex.toString());
            this.isCallStartedBs.next(false);
        }
    }

    public async enableCallAnswer() {
        try {
            // await Camera.requestPermissions(['camera' , 'photos']);
            // await this.permissionsService.hasPermission(this.perm);
            const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            this.localStreamBs.next(stream);
            this.peer.on('call', async (call) => {

                this.mediaCall = call;
                this.isCallStartedBs.next(true);

                this.mediaCall.answer(stream);
                this.mediaCall.on('stream', (remoteStream) => {
                    this.remoteStreamBs.next(remoteStream);
                });
                this.mediaCall.on('error', err => {
                    // this.snackBar.open(err, 'Close');
                    this.isCallStartedBs.next(false);
                    console.error(err);
                });
                this.mediaCall.on('close', () => this.onCallClose());
            });
        } catch (ex) {
            console.error(ex);
            // this.snackBar.open(ex, 'Close');
            this.isCallStartedBs.next(false);
        }
    }

    private onCallClose() {
        this.remoteStreamBs && this.remoteStreamBs.value.getTracks().forEach(track => {
            track.stop();
        });
        this.localStreamBs && this.localStreamBs.value.getTracks().forEach(track => {
            track.stop();
        });
        // this.snackBar.open('Call Ended', 'Close');
    }

    public closeMediaCall() {
        this.mediaCall && this.mediaCall.close();
        if (!this.mediaCall) {
            this.onCallClose();
        }
        this.isCallStartedBs.next(false);
    }

    public destroyPeer() {
        this.mediaCall && this.mediaCall.close();
        this.peer && this.peer.disconnect();
        this.peer && this.peer.destroy();
    }

}
