import { Component, OnInit } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";
import { ViewChild } from "@angular/core";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  @ViewChild("input", { static: true }) myInput;
  constructor(private nav: NavController, private menu: MenuController) {
    this.menu.enable(false);
  }
  ngOnInit() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
  }
  login() {
    this.nav.navigateRoot("/signin");
  }
  uploadDocument() {
    this.nav.navigateRoot("/home");
  }
}
