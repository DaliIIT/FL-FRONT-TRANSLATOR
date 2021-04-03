import { Component, OnInit } from "@angular/core";
import { AlertController, PopoverController } from "@ionic/angular";

@Component({
  selector: "app-history",
  templateUrl: "./history.page.html",
  styleUrls: ["./history.page.scss"],
})
export class HistoryPage implements OnInit {
  selectedLocation = "Dr.Rose Ortiz";
  constructor(
    private alertController: AlertController,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}
  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: "Set Doctor",
      inputs: [
        {
          name: "Kirakwall",
          type: "radio",
          label: "Kirakwall",
          value: "Kirakwall",
          checked: true,
        },
        {
          name: "Kirakwall2",
          type: "radio",
          label: "Kirakwall2",
          value: "Kirakwall2",
        },
        {
          name: "Kirakwall3",
          type: "radio",
          label: "Kirakwall3",
          value: "Kirakwall3",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Ok",
          handler: (data) => {
            this.selectedLocation = data;
          },
        },
      ],
    });

    await alert.present();
  }
  upcoming = [
    {
      img: "../../../assets/image/arron.png",
      name: "Nick Jackson",
      type: "Orthopedics",
      add: "Low Mill Farm, Lendales Lane, Pickering",
      date: "2.Nov 2019 10:00am",
      pname: "Patrick Stanley",
    },
  ];
  data = [
    {
      img: "../../../assets/image/patricia.png",
      name: "Julie Meyer",
      type: "Orthopedics",
      add: "Low Mill Farm, Lendales Lane, Pickering",
      date: "5.Oct 2019 11:00am",
      pname: "Mary Ann Fuller",
    },
    {
      img: "../../../assets/image/fionna.png",
      name: "Patricia Smith",
      type: "Orthopedics",
      add: "Low Mill Farm, Lendales Lane, Pickering",
      date: "12.Oct 2019 05:00pm",
      pname: "Fionna Fuller",
    },
    {
      img: "../../../assets/image/rachhel.png",
      name: "Harry Powell",
      type: "Orthopedics",
      add: "Low Mill Farm, Lendales Lane, Pickering",
      date: "22.Oct 2019 07:30am",
      pname: "Frank Green",
    },
  ];
}
