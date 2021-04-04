import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserValidators} from 'src/app/core/validators/user-validators';
import {UserService} from 'src/app/core/services/api/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    signinForm: FormGroup;
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
        private userService: UserService
    ) {
        this.menu.enable(false);
    }

    get usernameControl(): AbstractControl {
        return this.signinForm.get('username');
    }

    ngOnInit() {
        this.signinForm = this.fb.group({
            username: this.fb.control('', [Validators.required],
                [UserValidators.exists(this.userService)]),
            password: this.fb.control('', [Validators.required]),
            firstname: this.fb.control(''),
            lastname: this.fb.control(''),
            dateOfBirth: this.fb.control(''),
            gender: this.fb.control(''),
        });
    }

    login() {
        this.nav.navigateRoot('/signin');
    }

    signUp() {
        console.log(this.signinForm.value);
        this.userService.addClient(this.signinForm.value).subscribe(() => {
            this.nav.navigateRoot('/signin');
        });
    }
}
