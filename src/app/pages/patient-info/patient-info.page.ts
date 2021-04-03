import { ActivatedRoute } from "@angular/router";
import { CallModalPage } from "./../call-modal/call-modal.page";

import { Component, OnInit } from "@angular/core";
import {
  PopoverController,
  ModalController,
  NavController,
} from "@ionic/angular";

@Component({
  selector: "app-patient-info",
  templateUrl: "./patient-info.page.html",
  styleUrls: ["./patient-info.page.scss"],
})
export class PatientInfoPage implements OnInit {
  activeTab: string = "PatientInfo";
  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private nav: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.activeTab = params["id"];
    });
  }
  chageTab(name) {
    this.activeTab = name;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CallModalPage,
      cssClass: "callModal",
    });
    return await modal.present();
  }
  chat() {
    this.nav.navigateForward("/chat");
  }
}
