import {Injectable} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {environment} from 'src/environments/environment';
import {AbstractWebSocketService} from 'src/app/core/services/socket/AbstractWebSocketService';
import {AuthService} from 'src/app/core/services/auth/auth-service.service';
import {WebSocketOptions} from 'src/app/core/services/socket/WebSocketOptions';


export const progressStompConfig: InjectableRxStompConfig = {
    webSocketFactory: () => {
        return new WebSocket(environment.wsUrl);
    }
};

@Injectable({
    providedIn: 'root'
})
export class ActivitySocketService extends AbstractWebSocketService {

    constructor(stompService: RxStompService, authService: AuthService) {
        super(stompService,
            progressStompConfig,
            new WebSocketOptions('/user/activity/ask'),
            authService
        );
    }
}
