import { Component, OnInit } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";
import { ViewChild } from "@angular/core";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
  @ViewChild("input", { static: true }) myInput;
  data: any = {};
  constructor(private nav: NavController, private menu: MenuController) {
    this.menu.enable(false);
  }

  ngOnInit() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
  }

  forgotPassword() {}
  signUp() {
    this.nav.navigateForward("/signup");
  }
  login() {
    this.nav.navigateRoot("/home");
  }
}
