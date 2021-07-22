import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {



  @Input() date: any;


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [];
  constructor() { }

  ngOnInit(): void {
    this.barChartLabels = this.getUniqueLabel();
    this.barChartData.push({
      data: this.getDate(this.barChartLabels),
      label: this.date[0]
    });
  }
  getUniqueLabel(): string[]{
   return  this.date[1].filter((v, i, a) => a.indexOf(v) === i);
  }
  getDate(label): number[]{
    const numberDate: number[] = [];
    for (const l of label ){
      let count = 0;
      this.date[1].map(d => {
        if (d === l) { count++; }
      });
      numberDate.push(count);
    }
    return numberDate;
  }

}
