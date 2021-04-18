import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from 'src/app/core/services/auth/auth-service.service';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService,
              public router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    return this.authService.getValidJwtTokenOrRefresh$().pipe(
        map(token => token ? this.addToken(request, token) : request),
        switchMap(rq => next.handle(request).pipe(catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.router.navigate(['signin']);
          } else {
            return throwError(error);
          }
        })))
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
