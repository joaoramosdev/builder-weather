import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenWeatherService } from 'src/app/services/open-weather.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { defaultZip } from 'src/assets/constants/open-weather.constants';
import { UnsplashService } from 'src/app/services/unsplash.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public predictionList: any;
  public cityPrediction: any;
  public testArray: any;
  selectedDate: any;
  public selectedDateMin: any[] = [];
  public math = Math;
  public moment = moment;
  public zipCode: any;
  public locationImageUrl: any;
  _dateChanged: Subject<boolean> = new Subject();

  constructor(
    private openWeather: OpenWeatherService,
    private _route: ActivatedRoute,
    private unsplashService: UnsplashService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      if (params.get('zip') !== null) {
        this.seachByZIP(params.get('zip'));
      } else {
        this.seachByZIP(defaultZip);
      }
    });
  }

  public getWeather(lat: any, long: any) {
    this.openWeather.getWeatherForecast(lat, long).subscribe((res) => {
      this.cityPrediction = res.city;
      this.predictionList = this.divideArrray(res.list);
      this.selectedDate = this.predictionList[0];
      this.unsplashService
        .getImageByCityName(
          res.city.name + ' , ' + res.city.country + ' , ' + 'urban'
        )
        .subscribe((res) => {
          this.locationImageUrl = res.results[0].urls.full;
        });
    });
  }

  public divideArrray(arr: any) {
    const obj: any = {};

    for (let i = 0; i < arr.length; i++) {
      const day = moment(arr[i].dt_txt, 'YYYY/MM/DD').format('D');
      if (!obj.hasOwnProperty(day)) {
        obj[day] = [];
      }
      obj[day].push(arr[i]);
    }

    const result = Object.values(obj);
    if (result.length > 5) {
      result.pop();
    }
    return result;
  }

  public dateChanged() {
    this._dateChanged.next(true);
  }

  public selectDate(date: any) {
    this.selectedDate = date;
    this.dateChanged();
  }

  public seachByZIP(zip: any) {
    this.openWeather.getCityByZipCode(zip).subscribe(
      (res) => {
        this.getWeather(res.coord.lat, res.coord.lon);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
