import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient) {
    }

    registerTranslator(user: User) {
        return this.http.post<User>(`${environment.authUrl}/user/add/translator`, user);
    }

    registerClient(user: User) {
        return this.http.post<User>(`${environment.authUrl}/user/add/client`, user);
    }
}
