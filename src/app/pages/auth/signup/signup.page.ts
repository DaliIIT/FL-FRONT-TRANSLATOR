import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserValidators} from 'src/app/core/validators/user-validators';
import {UserService} from 'src/app/core/services/api/user.service';
import {RegisterService} from '../../../core/services/register-service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    private langages: string[] = ['Albanisch', 'Arabisch', 'Bosnisch', 'Krotisch', 'Serbisch', 'Bulgarisch', 'Dari', 'Englisch',
        'Farsi/Persisch', 'Franzosisch', 'Kurdisch Kurmanci', 'Polnisch', 'Rumanisch', 'Russisch', 'Slowakisch', 'Tschechisch',
        'Tukisch', 'Ungarisch', 'Italian', 'Greek', 'Spanish', 'Portuguese'];

    signUpForm: FormGroup;
    error = '';
    customPopoverOptions: any = {
        header: 'Hair Color',
        subHeader: 'Select your hair color',
        message: 'Only select your dominant hair color'
    };

    constructor(
        private nav: NavController,
        private menu: MenuController,
        private fb: FormBuilder,
        private userService: UserService,
        private registerService: RegisterService
    ) {
        this.menu.enable(false);
    }

    get usernameControl(): AbstractControl {
        return this.signUpForm.get('username');
    }

    ngOnInit() {
        this.signUpForm = this.fb.group({
            doctor: [false],
            translator: [false],
            companyName: ['', Validators.required],
            fullName: ['', Validators.required],
            birthday: ['', Validators.required],
            position: ['', [Validators.required]],
            languages: ['', [Validators.required]],
            username: this.fb.control('', [Validators.required],
                [UserValidators.exists(this.userService)]),
            password: [false, Validators.required],
            confirmPassword: [false, Validators.required],
            privacy: [false, Validators.requiredTrue]
        }, {
            validator: this.MustMatch('password', 'confirmPassword')
        });
    }

    get f() {
        return this.signUpForm.controls;
    }


    login() {
        this.nav.navigateForward('/auth/signin');
    }

    signUp() {
        // console.log(this.signUpForm.controls)
        const user = this.signUpForm.value;
        console.log(user);
        if (this.signUpForm.value.doctor) {
            delete user.translator;
            delete user.doctor;
            delete user.confirmPassword;
            delete user.privacy;
            this.registerService.registerClient(user).subscribe(value => this.nav.navigateRoot('/auth/signin'));
        } else if (this.signUpForm.value.translator) {
            delete user.translator;
            delete user.doctor;
            delete user.confirmPassword;
            delete user.privacy;
            this.registerService.registerTranslator(user).subscribe(value => this.nav.navigateRoot('/auth/signin'));
        }
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

}
