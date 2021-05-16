import {BehaviorSubject, Observable, Observer} from 'rxjs';
import {WebSocketOptions} from '@core/services/socket/WebSocketOptions';
import {SocketResponse} from '@core/services/socket/SocketResponse';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {StompConfig} from '@stomp/stompjs';
import {AuthService} from '@core/services/auth/auth-service.service';

type Message<T> = { type: 'Success' | 'ERROR', message: T };
type SubscriberResponse<T> = { observer: Observer<(x) => Message<T>> };

export abstract class AbstractWebSocketService {
    private obsStompConnection: Observable<any>;
    private subscribers: Array<any> = [];
    private subscriberIndex = 0;
    private status = new BehaviorSubject<string>(null);
    private status$ = this.status.asObservable();
    private stompConfig: InjectableRxStompConfig | StompConfig = {
        heartbeatIncoming: 0,
        heartbeatOutgoing: 20000,
        reconnectDelay: 10000,
        debug: (str) => {
           this.status.next(str);
        }
    };

    protected constructor(
        private stompService: RxStompService,
        private updatedStompConfig: InjectableRxStompConfig,
        private options: WebSocketOptions,
        private authService: AuthService
    ) {
        // Update StompJs configuration.
        this.stompConfig = {...this.stompConfig, ...this.updatedStompConfig};
        // Initialise a list of possible subscribers.
        this.createObservableSocket();
        // Activate subscription to broker.
        this.connect();
    }

    /**
     * Return an observable containing a subscribers list to the broker.
     */
    public getObservable = () => {
        return this.obsStompConnection;
    };


    /**
     * Return an observable containing the socket status
     */
    public getStatus = () => {
        return this.status$;
    };


    private createObservableSocket = () => {
        this.obsStompConnection = new Observable(observer => {
            const subscriberIndex = this.subscriberIndex++;
            this.addToSubscribers({index: subscriberIndex, observer});
            return () => {
                this.removeFromSubscribers(subscriberIndex);
            };
        });
    };

    private addToSubscribers = subscriber => {
        this.subscribers.push(subscriber);
    };

    private removeFromSubscribers = index => {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (i === index) {
                this.subscribers.splice(i, 1);
                break;
            }
        }
    };

    /**
     * Connect and activate the client to the broker.
     */
    private connect = () => {
        this.authService.getValidJwtTokenOrRefresh$().subscribe(token => {
            const config = {
                ...this.stompConfig, connectHeaders: {
                    Authorization: `Bearer ${token}`
                }
            } as StompConfig;
            this.stompService.stompClient.configure(config);
            this.stompService.stompClient.onConnect = this.onSocketConnect;
            this.stompService.stompClient.onStompError = this.onSocketError;
            this.stompService.stompClient.activate();
        });
    };

    /**
     * On each connect / reconnect, we subscribe all broker clients.
     */
    private onSocketConnect = frame => {
        this.authService.getValidJwtTokenOrRefresh$().subscribe(token => {
            this.stompService.stompClient.subscribe(this.options.brokerEndpoint, this.socketListener, {
                Authorization: `Bearer ${token}`
            });
        });
    };

    private onSocketError = errorMsg => {
        console.log('Broker reported error: ' + errorMsg);

        const response: SocketResponse = {
            type: 'ERROR',
            message: errorMsg
        };

        this.subscribers.forEach(subscriber => {
            subscriber.observer.error(response);
        });
    };

    private socketListener = frame => {
        this.subscribers.forEach(subscriber => {
            subscriber.observer.next(this.getMessage(frame));
        });
    };

    private getMessage = data => {
        const response: SocketResponse = {
            type: 'SUCCESS',
            message: JSON.parse(data.body)
        };
        return response;
    };
}
