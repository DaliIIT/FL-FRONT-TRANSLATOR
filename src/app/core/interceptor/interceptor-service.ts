import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth/auth-service.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.auth.getJwtToken().subscribe(token => {
            if (!token) {
                this.router.navigate(['/login']);
                this.auth.logout();
            }
            req = this.addToken(req, token);
        });


        return next.handle(req).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                this.router.navigate(['/login']);
                this.auth.logout();
            }
            return throwError(err);
        }));
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

}
