import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-translator-home',
    templateUrl: './translator-home.component.html',
    styleUrls: ['./translator-home.component.scss'],
})
export class TranslatorHomeComponent implements OnInit {

    calls: any[] = [{name: 'Amine Mekki', duration: '40', date: '13.01.2021'},
        {name: 'Med Ali Jallouli', duration: '40', date: '13.01.2021'},
        {name: 'Foulen ben Foulen', duration: '40', date: '13.01.2021'}];

    constructor() {
    }

    ngOnInit() {
    }

}
