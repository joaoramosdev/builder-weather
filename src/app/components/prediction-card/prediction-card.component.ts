import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-prediction-card',
  templateUrl: './prediction-card.component.html',
  styleUrls: ['./prediction-card.component.scss'],
})
export class PredictionCardComponent implements OnInit {
  @Input() prediction: any;
  constructor() {}

  ngOnInit(): void {}

  getImageUrl(date: any) {
    return `https://openweathermap.org/img/wn/${date?.weather[0].icon}@2x.png`;
  }

  getWeekDay(day: any) {
    return moment(day).format('dddd');
  }
}
