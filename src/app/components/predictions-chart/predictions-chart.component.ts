import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-predictions-chart',
  templateUrl: './predictions-chart.component.html',
  styleUrls: ['./predictions-chart.component.scss'],
})
export class PredictionsChartComponent implements OnInit, OnChanges {
  public _selectedDate: any;
  @Input() set selectedDate(date: any) {
    this._selectedDate = date;
    setTimeout(() => {
      this.generateChart(date);
    }, 1000);
  }
  @Input() changing: Subject<boolean> = new Subject();
  public selectedDateMin: any[] = [];
  public selectedDateMax: any[] = [];
  public chart: any;
  public chartOptions: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {
    this.changing.subscribe(() => {
      this.generateChart(this._selectedDate);
    });
    this.generateChart(this.selectedDate);
  }

  get selectedDate() {
    return this._selectedDate;
  }

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  generateChart(date: any) {
    this.chartOptions = {
      animationEnabled: true,
      theme: 'light2',
      borderRadius: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      axisX: {
        title: 'Hour',
        suffix: ':00',
        interval: 1,
      },
      axisY: {
        title: 'Temperature',
        suffix: '°F',
        interval: 1,
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: function (e: any) {
          if (
            typeof e.dataSeries.visible === 'undefined' ||
            e.dataSeries.visible
          ) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        },
      },
      data: [
        {
          type: 'line',
          name: 'Minimum',
          showInLegend: true,
          yValueFormatString: '#,###°F',
          xValueFormatString: '00',
          dataPoints: this.selectedDate?.map((item: any) => {
            return {
              x: parseInt(moment(item.dt_txt).format('HH:mm')),
              y: item.main.temp_min,
            };
          }),
        },
        {
          type: 'line',
          name: 'Maximum',
          showInLegend: true,
          xValueFormatString: '00',
          yValueFormatString: '#,###°F',
          dataPoints: this.selectedDate?.map((item: any) => {
            return {
              x: parseInt(moment(item.dt_txt).format('HH:mm')),
              y: item.main.temp_max,
            };
          }),
        },
      ],
    };
  }
}
