import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-translator-tabs',
    templateUrl: './translator-tabs.component.html',
    styleUrls: ['./translator-tabs.component.scss'],
})
export class TranslatorTabsComponent implements OnInit {

    constructor(private nav: NavController,
                private menu: MenuController) {
        this.menu.enable(false);
    }

    ngOnInit() {
        this.nav.navigateRoot('/translator/tabs/home');
    }

}
