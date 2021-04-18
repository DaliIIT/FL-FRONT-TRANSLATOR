import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError, map, mapTo, switchMap, tap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Tokens} from 'src/app/core/models/Tokens';
import {LoginError} from 'src/app/core/models/LoginError';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedUser: string;

    constructor(private http: HttpClient,
                private router: Router) {
    }

    get authBasic() {
        const headers = {
            Authorization: 'Basic ' + btoa('translatorapp:clientsecret'),
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
        return this.getRefreshToken().pipe(map(refreshToken => new HttpParams()
                .set('refreshToken', refreshToken)),
            switchMap(body => this.http.post<any>(`${environment.authUrl}/user/public/logout`,
                body,
                {headers: {'Content-type': 'application/x-www-form-urlencoded'}}
            )),
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
        const headers = this.authBasic;
        return this.getRefreshToken().pipe(map(refreshToken => new HttpParams()
                .set('grant_type', 'refresh_token')
                .set('refresh_token', refreshToken)),
            switchMap(body => this.http.post<any>(`${environment.authUrl}/oauth/token`, body, {headers})),
            tap((tokens: Tokens) => {
                this.storeAccessToken(tokens.access_token);
            })
        );
    }

    getJwtToken$() {
        return of(localStorage.getItem(ACCESS_TOKEN));
        // return from(this.nativeStorage.getItem(ACCESS_TOKEN)).pipe(catchError(err => of(null)));
    }
    getJwtToken(): string {
        return localStorage.getItem(ACCESS_TOKEN);
        // return from(this.nativeStorage.getItem(ACCESS_TOKEN)).pipe(catchError(err => of(null)));
    }

    getClaims(): string[] {
        const authorities = jwt_decode(this.getJwtToken()).authorities;
        return authorities || [];
        // return this.getJwtToken().pipe(map(jwt_decode), map((decoded: any) => decoded.authorities ? decoded.authorities : []));
    }

    getUserName(): string {
        const userName = jwt_decode(this.getJwtToken()).user_name;
        return userName;
        // return this.getJwtToken().pipe(map(jwt_decode), map((decoded: any) => decoded.user_name));
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
        return of(localStorage.getItem(REFRESH_TOKEN));
        // return from(this.nativeStorage.getItem(REFRESH_TOKEN)).pipe(catchError(err => of(null)));
    }

    private storeAccessToken(jwt: string) {
        // TODO use ionic storage
        localStorage.setItem(ACCESS_TOKEN, jwt);
        // this.nativeStorage.setItem(ACCESS_TOKEN, jwt)
        //     .then(
        //         () => console.log('Stored item!'),
        //         error => console.error('Error storing item', error)
        //     );
    }

    private storeRefreshToken(jwt: string) {
        localStorage.setItem(REFRESH_TOKEN, jwt);

        // this.nativeStorage.setItem(REFRESH_TOKEN, jwt)
        //     .then(
        //         () => console.log('Stored item!'),
        //         error => console.error('Error storing item', error)
        //     );
    }

    private storeTokens(token: Tokens) {
        this.storeAccessToken(token.access_token);
        this.storeRefreshToken(token.refresh_token);
    }

    private removeTokens() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        // this.nativeStorage.remove(ACCESS_TOKEN).then(
        //     () => console.log('removed item!'),
        //     error => console.error('Error removing item', error)
        // );
        // this.nativeStorage.remove(REFRESH_TOKEN).then(
        //     () => console.log('removed item!'),
        //     error => console.error('Error removing item', error)
        // );
    }

}
