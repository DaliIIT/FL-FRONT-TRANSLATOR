import {Component, OnInit} from '@angular/core';
import {AuthService} from '@core/services/auth/auth-service.service';

@Component({
    selector: 'app-translator-profile',
    templateUrl: './translator-profile.component.html',
    styleUrls: ['./translator-profile.component.scss'],
})
export class TranslatorProfileComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
    }
}
