import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() date!: any;

  lineChartData: ChartDataSets[] = [
    //{ data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  constructor() { }

  ngOnInit(): void {

    this.lineChartData.push({
      data: this.date[1].map(d => parseInt(d)),
      label: this.date[0]
    });
    console.log('line', this.date);
    console.log('date', this.lineChartData);
  }




}
