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
        return this.auth.getValidJwtTokenOrRefresh$().pipe(map(token => {
            this.navigate();
            return false;
        }), catchError(err => of(true)));
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    private navigate() {
        if (this.auth.getClaims().some(role => role === 'ROLE_ADMIN')) {
            this.nav.navigateRoot('/admin/home');
        } else if (this.auth.getClaims().some(role => role === 'ROLE_TRANSLATOR')) {
            this.nav.navigateRoot('/translator/tabs/home');
        } else if (this.auth.getClaims().some(role => role === 'ROLE_CLIENT')) {
            this.nav.navigateRoot('/doctor/home');
        }
    }

}
