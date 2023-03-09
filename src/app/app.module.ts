import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PredictionCardComponent } from './components/prediction-card/prediction-card.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { environment } from 'src/environments/environment';

// Canvas Modules
import * as CanvasJSAngularChart from '../assets/canvasjs-3.7.5/canvasjs.angular.component';
import { PredictionsChartComponent } from './components/predictions-chart/predictions-chart.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

// Angular Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    PredictionCardComponent,
    WeatherComponent,
    CanvasJSChart,
    PredictionsChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
  ],
  providers: [ToastrService],
  bootstrap: [AppComponent],
})
export class AppModule {}
