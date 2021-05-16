import {Component, OnInit} from '@angular/core';
import {AlertController, MenuController, NavController} from '@ionic/angular';
import {LanguageService} from '@core/services/api/language.service';
import {ApiCallService} from '@core/services/api/api-call.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-doctor-home',
    templateUrl: './doctor-home.component.html',
    styleUrls: ['./doctor-home.component.scss'],
})
export class DoctorHomeComponent implements OnInit {

    languages = this.languageService.getTranslatorsLanguages();

    constructor(private alertController: AlertController,
                private nav: NavController,
                private menu: MenuController,
                private languageService: LanguageService,
                private apiCallService: ApiCallService,
                private router: Router) {
        this.menu.enable(false);
    }

    ngOnInit() {
    }

    askForTranslator(language: string) {
        this.router.navigate(['/video-call'], {queryParams: {lang: language}});
    }

}
