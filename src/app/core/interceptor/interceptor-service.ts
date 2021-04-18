import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth/auth-service.service';
import {Router} from '@angular/router';
import {catchError, filter, map, switchMap, take} from 'rxjs/operators';
import {Tokens} from 'src/app/core/models/Tokens';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private auth: AuthService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.getJwtToken$().pipe(
            map(token => {
                if (!token) {
                    this.router.navigate(['/login']);
                    this.auth.logout();
                }
                req = this.addToken(req, token);
                return req;
            }),
            switchMap(request => next.handle(request).pipe(catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 401 &&
                    !request.url.includes('logout')) {
                    return this.handle401Error(request, next);
                }
                return throwError(err);
            })))
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        if (!request.url.includes('oauth/token')) {
            return request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return request;
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.auth.refreshToken().pipe(
                switchMap((token: Tokens) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.access_token);
                    return next.handle(this.addToken(request, token.access_token));
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));
        }
    }

}
