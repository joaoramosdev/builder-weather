import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  constructor(private http: HttpClient) {}

  public getCityImage(city: any) {
    return this.http
      .get(
        `${environment.GOOGLE_API_URL}/place/findplacefromtext/json?input=${city}&key=${environment.OW_API_KEY}&inputtype=textquery&fields=name,photos`
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
