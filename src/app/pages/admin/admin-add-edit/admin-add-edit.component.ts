import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserValidators} from '@core/validators/user-validators';
import {UserService} from '@core/services/api/user.service';
import {RegisterService} from '@core/services/register-service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin-add-edit',
    templateUrl: './admin-add-edit.component.html',
    styleUrls: ['./admin-add-edit.component.scss'],
})
export class AdminAddEditComponent implements OnInit {
    signUpForm: FormGroup;
    userId: number;
    error = '';
    langages: string[] = ['Albanisch', 'Arabisch', 'Bosnisch', 'Krotisch', 'Serbisch', 'Bulgarisch', 'Dari', 'Englisch',
        'Farsi/Persisch', 'Franzosisch', 'Kurdisch Kurmanci', 'Polnisch', 'Rumanisch', 'Russisch', 'Slowakisch', 'Tschechisch',
        'Tukisch', 'Ungarisch', 'Italian', 'Greek', 'Spanish', 'Portuguese'];

    constructor(private menu: MenuController,
                private fb: FormBuilder,
                private userService: UserService,
                private registerService: RegisterService,
                private nav: NavController,
                private router: Router) {
        this.menu.enable(false);
    }

    get usernameControl(): AbstractControl {
        return this.signUpForm.get('username');
    }

    ngOnInit() {
        if (this.router.getCurrentNavigation().extras.state) {
            const userId = this.router.getCurrentNavigation().extras.state.userId;
            console.log(userId);
            if (userId) {
                this.userId = userId;
                this.userService.getById(userId).subscribe(user => {
                    console.log(user);
                    this.signUpForm.patchValue(user);
                });
            }
        }

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

    // get f() {
    //     return this.signUpForm.controls;
    // }

    signUp() {
        // console.log(this.signUpForm.controls)
        const user = this.signUpForm.value;
        console.log(user);
        if (this.signUpForm.value.doctor) {
            delete user.translator;
            delete user.doctor;
            delete user.confirmPassword;
            delete user.privacy;
            this.registerService.registerClient(user).subscribe(value => this.nav.navigateRoot('/admin/home'));
        } else if (this.signUpForm.value.translator) {
            delete user.translator;
            delete user.doctor;
            delete user.confirmPassword;
            delete user.privacy;
            this.registerService.registerTranslator(user).subscribe(value => this.nav.navigateRoot('/admin/home'));
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

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => this.nav.navigateRoot('/admin/home'));
    }

}
