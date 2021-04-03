import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-review",
  templateUrl: "./review.page.html",
  styleUrls: ["./review.page.scss"],
})
export class ReviewPage implements OnInit {
  selectedLocation = "Dr.Rose Ortiz";
  review = [
    {
      img: "../../../assets/image/arron.png",
      name: "Tom Powell",
      ago: "2 days ago",
      detail:
        "Phasellus risus turpis, pretium sit amet magna non, molestie ultricies enim. Nullam pulvinar ",
      rate: 4,
      ishelp: true,
    },
    {
      img: "../../../assets/image/fionna.png",
      name: "Carol Adams",
      ago: "2 days ago",
      detail:
        "Phasellus risus turpis, pretium sit amet magna non, molestie ultricies enim. Nullam pulvinar ",
      rate: 4,
    },
    {
      img: "../../../assets/image/patricia.png",
      name: "Nancy Coleman",
      ago: "2 days ago",
      detail:
        "Phasellus risus turpis, pretium sit amet magna non, molestie ultricies enim. Nullam pulvinar ",
      rate: 4,
    },
    {
      img: "../../../assets/image/jacob.png",
      name: "Tom Powell",
      ago: "2 days ago",
      detail:
        "Phasellus risus turpis, pretium sit amet magna non, molestie ultricies enim. Nullam pulvinar ",
      rate: 4,
    },
    {
      img: "../../../assets/image/fionna.png",
      name: "Carol Adams",
      ago: "2 days ago",
      detail:
        "Phasellus risus turpis, pretium sit amet magna non, molestie ultricies enim. Nullam pulvinar ",
      rate: 4,
    },
    {
      img: "../../../assets/image/patricia.png",
      name: "Nancy Coleman",
      ago: "2 days ago",
      detail:
        "Phasellus risus turpis, pretium sit amet magna non, molestie ultricies enim. Nullam pulvinar ",
      rate: 4,
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
