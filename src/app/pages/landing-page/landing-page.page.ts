import { Component, OnInit } from '@angular/core';
import {AuthService} from '@core/services/auth/auth-service.service';
import {MenuController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  constructor(private auth: AuthService,
              private nav: NavController,
              private menu: MenuController) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.navigate();
  }

  private navigate() {
    if (this.auth.getClaims().some(role => role === 'ROLE_ADMIN')) {
      this.nav.navigateRoot('/admin/home');
    } else if (this.auth.getClaims().some(role => role === 'ROLE_TRANSLATOR')) {
      this.nav.navigateRoot('/translator/tabs/home');
    } else if (this.auth.getClaims().some(role => role === 'ROLE_CLIENT')) {
      this.nav.navigateRoot('/doctor/home');
    } else {
      this.auth.logout();
    }
  }

}
