import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    @ViewChild('input', {static: true}) myInput;
    registerForm: FormGroup;

    private langages: string[] = ['Albanisch', 'Arabisch', 'Bosnisch', 'Krotisch', 'Serbisch', 'Bulgarisch', 'Dari', 'Englisch',
        'Farsi/Persisch', 'Franzosisch', 'Kurdisch Kurmanci', 'Polnisch', 'Rumanisch', 'Russisch', 'Slowakisch', 'Tschechisch',
        'Tukisch', 'Ungarisch', 'Italian', 'Greek', 'Spanish', 'Portuguese'];

    constructor(private nav: NavController, private menu: MenuController, private formBuilder: FormBuilder) {
        this.menu.enable(false);
    }

    ngOnInit() {
        setTimeout(() => {
            this.myInput.setFocus();
        }, 150);

        this.registerForm = this.formBuilder.group({
            companyName: ['', Validators.required],
            fullName: ['', Validators.required],
            birthday: ['', Validators.required],
            position: ['', [Validators.required]],
            languages: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: [false, Validators.required],
            confirmPassword: [false, Validators.required]
        }, {
            validator: this.MustMatch('password', 'confirmPassword')
        });
    }

    login() {
        this.nav.navigateRoot('/signin');
    }

    uploadDocument() {
        this.nav.navigateRoot('/home');
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({mustMatch: true});
            } else {
                matchingControl.setErrors(null);
            }
        };
    }

    onSubmit() {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
        }
    }
}
