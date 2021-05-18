import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/core/services/auth/auth-service.service';
import {UserService} from '@core/services/api/user.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
    loginForm: FormGroup;
    error = '';

    constructor(private nav: NavController,
                private menu: MenuController,
                private fb: FormBuilder,
                private auth: AuthService) {
        this.menu.enable(false);
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: this.fb.control('', [Validators.required]),
            password: this.fb.control('', [Validators.required])
        });
    }

    forgotPassword() {
    }

    signUp() {
        this.nav.navigateForward('/auth/signup');
    }

    login() {
        const formValue = this.loginForm.value;
        this.auth.login(formValue).subscribe(result => {
            if (!result.error) {
                if (this.auth.isLoggedIn()) {
                    this.nav.navigateRoot('/landing-page');
                }
                this.loginForm.reset();
            }
            this.error = result.error === 'invalid_grant' ? 'Incorrect username or password' : '';
        });
    }

}
