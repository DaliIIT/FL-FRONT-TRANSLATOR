import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {User} from '@core/models/User';
import {Language} from '@core/models/Language';
import {JoinRoomDto} from '@core/models/JoinRoomDto';
import {ValueWrapper} from '@core/models/ValueWrapper';

@Injectable({
    providedIn: 'root'
})
export class ApiCallService {

    constructor(private http: HttpClient) {
    }

    askForTranslator(to: string, peerId?: string, from?: string): Observable<ValueWrapper<string>> {
        let params = new HttpParams();
        params = params.append('to', to);
        peerId && (params = params.append('peerId', peerId));
        from && (params = params.append('from', from));
        return this.http.post<ValueWrapper<string>>(`${environment.authUrl}/call/translator/ask`, params);
    }

    /**
     *
     * @param peerId user peerId
     * @param clientUsername other side username
     * @return Observable<string> : other side peerId
     */
    joinCall(peerId: string, clientUsername: string): Observable<JoinRoomDto> {
        let params = new HttpParams();
        params = params.append('clientUsername', clientUsername);
        params = params.append('peerId', peerId);
        return this.http.post<JoinRoomDto>(`${environment.authUrl}/call/get-peer-id`, params);
    }


    leaveRoom(roomId: string): Observable<JoinRoomDto> {
        let params = new HttpParams();
        params = params.append('roomId', roomId);
        return this.http.post<JoinRoomDto>(`${environment.authUrl}/call/destroy-room`, params);
    }


}
