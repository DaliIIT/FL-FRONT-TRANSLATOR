import { Component, OnInit } from "@angular/core";
import { AlertController, NavController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  selectedLocation = "Dr.Rose Ortiz";
  appoinment = [
    {
      day: "Monday",
      date: "1 Nov 2019",
    },
    {
      day: "Tuesday",
      date: "2 Nov 2019",
    },
    {
      day: "Wednesday",
      date: "3 Nov 2019",
    },
  ];
  morning = [
    {
      time: "10:00 am",
      img: "../../../assets/image/jacob.png ",
      name: "Jacob Murphy",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
    {
      time: "11:00 am",
      img: "../../../assets/image/sara.png ",
      name: "Sara Lynch",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
  ];
  afternoon = [
    {
      time: "12:00 pm",
      img: "../../../assets/image/fionna.png",
      name: "Fionna Jackson",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
    {
      time: "01:00 pm",
      img: "../../../assets/image/rachhel.png",
      name: "Rachel Murphy",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
  ];
  Evening = [
    {
      time: "05:00 pm",
      img: "../../../assets/image/patricia.png",
      name: "Fionna Jackson",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
    {
      time: "06:30 pm",
      img: "../../../assets/image/arron.png",
      name: "Rachel Murphy",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
  ];
  Night = [
    {
      time: "07:00 pm",
      img: "../../../assets/image/pearson.png",
      name: "Fionna Jackson",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
    {
      time: "08:30 pm",
      img: "../../../assets/image/benjamin.png",
      name: "George Pearson",
      price: "$50",
      age: "32",
      add: "Low Mill Farm, Lendales Lane",
    },
  ];
  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private menu: MenuController
  ) {
    this.menu.enable(true);
  }

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
  patientInfo() {
    this.nav.navigateForward("/patient-info/PatientInfo");
  }
}
