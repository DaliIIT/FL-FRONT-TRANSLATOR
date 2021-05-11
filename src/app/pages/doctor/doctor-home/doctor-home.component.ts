import {Component, OnInit} from '@angular/core';
import {AlertController, MenuController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-doctor-home',
    templateUrl: './doctor-home.component.html',
    styleUrls: ['./doctor-home.component.scss'],
})
export class DoctorHomeComponent implements OnInit {

    languages: string[] = ['Spanish', 'Hindi', 'Russian'];

    constructor(private alertController: AlertController,
                private nav: NavController,
                private menu: MenuController) {
        this.menu.enable(false);
    }

    ngOnInit() {
    }

}
