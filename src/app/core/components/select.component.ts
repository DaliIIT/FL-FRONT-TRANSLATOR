import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-select',
    template: `
        <ion-input class="genral_input" (click)="ionSelect.open();"
                   readonly
                   #input
                   (ionChange)="onValueChange(input.value?.value)"
                   [placeholder]="placeholder" type="text" [value]="ionSelect.value?.display"></ion-input>
        <ion-item class="d-none">
            <ion-select #ionSelect interface="action-sheet" placeholder="Select One">
                <ion-select-option *ngFor="let v of values" [value]="v">{{v.display || v.value}}</ion-select-option>
            </ion-select>
        </ion-item>    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ],
    styles: [`
        :host {
            display: block;
        }
    `]
})
export class SelectComponent implements ControlValueAccessor, OnInit {
    @Input() placeholder = '';
    @Input() values: { value: any, display?: string }[] = [];

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
