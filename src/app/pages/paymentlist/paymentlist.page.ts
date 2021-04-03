import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-paymentlist",
  templateUrl: "./paymentlist.page.html",
  styleUrls: ["./paymentlist.page.scss"],
})
export class PaymentlistPage implements OnInit {
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
  patientList = [
    {
      name: "Adam Hughes",
      price: "$30",
    },
    {
      name: "Carolyn Murphy",
      price: "$80",
    },
    {
      name: "Terry McDonald",
      price: "$40",
    },
    {
      name: "Mary Roberts",
      price: "$50",
    },
    {
      name: "Jonathan Vargas",
      price: "$25",
    },
    {
      name: "Rachel Meyer",
      price: "$35",
    },
    {
      name: "Kevin Carpenter",
      price: "$55",
    },
    {
      name: "Janice Holland",
      price: "$65",
    },
    {
      name: "Marilyn Carrol",
      price: "$40",
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
