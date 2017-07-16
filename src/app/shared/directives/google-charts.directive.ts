import { Directive, ElementRef, Input, OnInit } from '@angular/core';


declare const google: any;
declare const googleLoaded: any;

@Directive({
  selector: '[appGoogleChart]'
})
export class GoogleChartsDirective implements OnInit {
  public _element: any;

  @Input('chartType') public chartType: string;
  @Input('chartOptions') public chartOptions: Object;
  @Input('chartData') public chartData: Object;

  constructor (public element: ElementRef) {
    this._element = this.element.nativeElement;
  }

  ngOnInit() {
    setTimeout(() => {
      google.charts.load('current', { 'packages': ['corechart']});
        setTimeout(() => {
          this.drawGraph(this.chartOptions, this.chartType, this.chartData, this._element);
        }, 1000);
      }, 1000
    );
  }

  drawGraph (chartOptions, chartType, chartData, ele) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      let wrapper;
      wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        dataTable: chartData,
        options: chartOptions || {},
        containerId: ele.id
      });
      wrapper.draw();
    };
  }
}
