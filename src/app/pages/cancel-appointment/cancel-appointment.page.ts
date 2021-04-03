import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-cancel-appointment",
  templateUrl: "./cancel-appointment.page.html",
  styleUrls: ["./cancel-appointment.page.scss"],
})
export class CancelAppointmentPage implements OnInit {
  selectedLocation = "Dr.Rose Ortiz";
  cancelAppoint = [
    {
      time: "10:00 am",
      img: "../../../assets/image/patricia.png ",
      name: "Patricia Wallace",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
    {
      time: "10:30 am",
      img: "../../../assets/image/arron.png",
      name: "Aaron James",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
    {
      time: "11:00 am",
      img: "../../../assets/image/pearson.png",
      name: "George Pearson",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
    {
      time: "10:30 am",
      img: "../../../assets/image/benjamin.png",
      name: "Benjamin Garrett",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
  ];
  constructor(private alertController: AlertController) {}

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
}
