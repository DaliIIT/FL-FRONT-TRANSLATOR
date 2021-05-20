import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '@core/services/auth/auth-service.service';
import {catchError, map} from 'rxjs/operators';
import {NavController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {


    constructor(private auth: AuthService,
                private nav: NavController) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.auth.getJwtToken()) {
            return true;
        }
        return this.auth.getValidJwtTokenOrRefresh$().pipe(map(token => {
            this.nav.navigateRoot('/landing-page');
            return false;
        }), catchError(err => {
            return of(true);
        }));
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }


}
