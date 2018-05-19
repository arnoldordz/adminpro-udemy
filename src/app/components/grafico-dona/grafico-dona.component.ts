import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('chartData') data:  number[];
  @Input('chartLabels') labels: string[];
  @Input('chartType') type: string;

  constructor() { }

  ngOnInit() {

  }

}
