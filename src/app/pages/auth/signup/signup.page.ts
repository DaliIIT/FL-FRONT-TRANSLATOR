import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from 'src/app/core/services/register-service';
import {Language} from 'src/app/core/models/Language';
import {User} from 'src/app/core/models/User';

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

    constructor(private nav: NavController, private menu: MenuController, private formBuilder: FormBuilder,
                private registerService: RegisterService) {
        this.menu.enable(false);
    }

    ngOnInit() {
        setTimeout(() => {
            this.myInput.setFocus();
        }, 150);

        this.registerForm = this.formBuilder.group({
            type: ['', Validators.required],
            companyName: ['', Validators.required],
            fullName: ['', Validators.required],
            birthday: ['', Validators.required],
            position: ['', [Validators.required]],
            languages: ['', [Validators.required]],
            username: ['', [Validators.required, Validators.email]],
            password: [false, Validators.required],
            confirmPassword: [false, Validators.required]
        }, {
            validator: this.MustMatch('password', 'confirmPassword')
        });
    }

    login() {
        this.nav.navigateRoot('/auth/signin');
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
            const languages: Language[] = this.registerForm.get('languages').value.map(value => ({name: value}));
            const user: User = {
                id: null,

                roles: null,

                username: this.registerForm.get('username').value,

                password: this.registerForm.get('password').value,

                birthDay: this.registerForm.get('birthday').value,

                companyName: this.registerForm.get('companyName').value,

                position: this.registerForm.get('position').value,

                fullName: this.registerForm.get('fullName').value,

                languages: languages
            };
            switch (this.registerForm.get('type').value) {
                case 'Translator':
                    this.registerService.registerTranslator(user).subscribe(value => this.nav.navigateRoot('/auth/signin'));
                    break;
                case 'Client':
                    this.registerService.registerClient(user).subscribe(value => this.nav.navigateRoot('/auth/signin'));
                    break;
            }
        }
    }
}
