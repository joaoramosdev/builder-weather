import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://api.unsplash.com/';

  getImageByCityName(city: any) {
    return this.http
      .get(
        `https://api.unsplash.com/search/photos?query=${city}&orientation=landscape&client_id=${environment.UNSPLASH_API_KEY}`
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
