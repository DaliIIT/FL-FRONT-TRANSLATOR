import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {User} from '@core/models/User';

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

    getById(id: number): Observable<User> {
        console.log(id);
        return this.http.get<User>(`${environment.authUrl}/user/${id}`);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.authUrl}/user/${id}`);
    }

    public getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.authUrl}/user/all`);
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
