import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    public exists(username: string) {
        return this.http.get<boolean>(`${environment.authUrl}/user/exists/${username}`);
    }

    public addClient(value) {
        return this.http.post(`${environment.authUrl}/user/add/client`, this.clean(value));
    }

    clean(obj) {
        for (const propName in obj) {
            if (!obj[propName]) {
                delete obj[propName];
            }
        }
        return obj;
    }
}
