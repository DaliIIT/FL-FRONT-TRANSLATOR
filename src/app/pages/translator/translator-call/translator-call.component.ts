import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-translator-call',
    templateUrl: './translator-call.component.html',
    styleUrls: ['./translator-call.component.scss'],
})
export class TranslatorCallComponent implements OnInit {

    calls: any[] = [{name: 'Amine Mekki', language: 'English'},
        {name: 'Med Ali Jallouli', language: 'Arabic'},
        {name: 'Foulen ben Foulen', language: 'English'}];

    constructor() {
    }

    ngOnInit() {
    }

}
