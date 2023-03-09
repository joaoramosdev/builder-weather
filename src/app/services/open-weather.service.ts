import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.OW_API_URL;

  getWeatherForecast(lat: number, lon: number) {
    return this.http
      .get(
        `${
          this.baseUrl
        }/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${'imperial'}&appid=${
          environment.OW_API_KEY
        }`
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getCityByZipCode(zip: any) {
    return this.http
      .get(
        `${environment.OW_API_URL}/data/2.5/weather?zip=${zip}&appid=${environment.OW_API_KEY}`
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
