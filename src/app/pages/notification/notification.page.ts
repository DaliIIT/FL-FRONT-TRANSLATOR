import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.page.html",
  styleUrls: ["./notification.page.scss"],
})
export class NotificationPage implements OnInit {
  today = [
    {
      img: "../../../assets/image/jacob.png",
      name: "Nick Adams",
      detail: "Book Appointment 11,Nov 2019 10:00am",
      ago: "5min ago",
    },
    {
      img: "../../../assets/image/fionna.png",
      name: "Kelly Gomez",
      detail: "Cancel Appointment 11,Nov 2019 10:00am",
      ago: "3 Hour ago",
    },
    {
      img: "../../../assets/image/pearson.png",
      name: "Alex Griffin",
      detail: "Book Appointment 11,Nov 2019 10:00am",
      ago: "4 Hour ago",
    },
    {
      img: "../../../assets/image/sara.png",
      name: "Fionna Foster",
      detail: "Give 5 Star And good doctor I change...",
      ago: "4 Hour ago",
    },
  ];
  yesterday = [
    {
      img: "../../../assets/image/benjamin.png",
      name: "Amanda Clark",
      detail: "Book Appointment 11,Nov 2019 10:00am",
      ago: "5min ago",
    },
    {
      img: "../../../assets/image/fionna.png",
      name: "Kelly Gomez",
      detail: "Cancel Appointment 11,Nov 2019 10:00am",
      ago: "3 Hour ago",
    },
    {
      img: "../../../assets/image/pearson.png",
      name: "Alex Griffin",
      detail: "Book Appointment 11,Nov 2019 10:00am",
      ago: "4 Hour ago",
    },
    {
      img: "../../../assets/image/sara.png",
      name: "Fionna Foster",
      detail: "Give 5 Star And good doctor I change...",
      ago: "4 Hour ago",
    },
  ];
  constructor() {}

  ngOnInit() {}
}
