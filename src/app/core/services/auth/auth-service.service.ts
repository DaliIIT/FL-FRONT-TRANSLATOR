import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError, map, mapTo, tap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Tokens} from 'src/app/core/models/Tokens';
import {LoginError} from 'src/app/core/models/LoginError';

const JWT_TOKEN = 'JWT_TOKEN';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private loggedUser: string;

    constructor(private http: HttpClient,
                private router: Router,
                private nativeStorage: NativeStorage) {
    }

    get authBasic() {
        const headers = {
            Authorization: 'Basic ' + btoa('my-trusted-client:clientsecret'),
            'Content-type': 'application/x-www-form-urlencoded',
        };
        return headers;
    }

    login(user: { username: string, password: string },
          grantType = 'password',
          code = null): Observable<Tokens & LoginError> {
        this.removeTokens();
        const headers = this.authBasic;
        const body = new HttpParams()
            .set('username', user.username)
            .set('password', user.password)
            .set('code', code)
            .set('grant_type', grantType);
        return this.http.post<any>(`${environment.authUrl}/oauth/token`, body, {headers})
            .pipe(
                tap(tokens => this.doLoginUser(user.username, tokens)),
                catchError(error => {
                    return of(error.error);
                }));
    }

    logout() {
        this.router.navigate(['/auth/login']);
        const body = new HttpParams()
            .set('refreshToken', this.getRefreshToken());
        return this.http.post<any>(`
        ${environment.authUrl}/user/public/logout`,
            body,
            {headers: {'Content-type': 'application/x-www-form-urlencoded'}}
        )
            .pipe(
                tap(() => this.doLogoutUser()),
                mapTo(true),
                catchError(error => {
                    return of(false);
                }));
    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    refreshToken() {
        const body = new HttpParams()
            .set('grant_type', 'refresh_token')
            .set('refresh_token', this.getRefreshToken());
        const headers = this.authBasic;
        return this.http.post<any>(`${environment.authUrl}/oauth/token`, body, {headers}).pipe(
            tap((tokens: Tokens) => {
                this.storeJwtToken(tokens.access_token);
            }));
    }

    getJwtToken(): Observable<string> {
        return from(this.nativeStorage.getItem(JWT_TOKEN));
    }

    getClaims(): Observable<string[]> {
        return this.getJwtToken().pipe(map(jwt_decode), map((decoded: any) => decoded.authorities ? decoded.authorities : []));
    }

    getUserName(): Observable<string> {
        return this.getJwtToken().pipe(map(jwt_decode), map((decoded: any) => decoded.user_name));
    }

    private doLoginUser(username: string, token: Tokens) {
        this.loggedUser = username;
        this.storeTokens(token);
    }

    private doLogoutUser() {
        this.loggedUser = null;
        this.removeTokens();
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeJwtToken(jwt: string) {
        this.nativeStorage.setItem(JWT_TOKEN, jwt)
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );
    }

    private storeTokens(token: Tokens) {
        this.storeJwtToken(token.access_token);
    }

    private removeTokens() {
        this.nativeStorage.remove(JWT_TOKEN).then(
            () => console.log('removed item!'),
            error => console.error('Error removing item', error)
        );
    }

}
