import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@core/services/auth/auth-service.service';
import {NavController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class DoctorGuard implements CanActivate, CanLoad {

    constructor(private auth: AuthService,
                private nav: NavController) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isDoctor = this.auth.isLoggedIn() && this.auth.getClaims().some(role => role === 'ROLE_CLIENT');
        if (isDoctor) {
            return true;
        }
        this.nav.navigateRoot('/auth/signin');
        return false;
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }
}
