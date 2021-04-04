import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-date-picker',
    template: `
        <ion-input class="genral_input" (click)="dateField.open();"
                   readonly
                   #input
                   (ionChange)="onValueChange(input.value)"
                   [placeholder]="placeholder" type="text" [value]="dateField.value | date : 'dd/MM/yyyy'"></ion-input>
        <ion-datetime class="d-none" #dateField displayFormat="DD/MM/YYYY" [min]="min" [max]="max"></ion-datetime>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ],
    styles: [`
        :host {
            display: block;
        }
    `]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
    @Input() placeholder = '';
    @Input() min = 1950;
    @Input() max = new Date().getFullYear();

    constructor() {
    }

    ngOnInit() {
    }

    onComponentChange = (value) => {
    }

    onComponentTouched = (value) => {
    }

    registerOnChange(fn: any): void {
        this.onComponentChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onComponentTouched = fn;
    }

    writeValue(obj: any): void {
        this.onComponentChange(obj);
    }

    onValueChange(value: string) {
        this.writeValue(value);
    }
}
