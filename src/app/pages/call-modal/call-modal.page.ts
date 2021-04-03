import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-call-modal",
  templateUrl: "./call-modal.page.html",
  styleUrls: ["./call-modal.page.scss"],
})
export class CallModalPage implements OnInit {
  constructor(private modal: ModalController) {}

  ngOnInit() {}
  closeModal() {
    this.modal.dismiss();
  }
}
