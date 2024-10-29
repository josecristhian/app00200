import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective  } from 'ng2-charts';
@Component({
  selector: 'app-charts-test',
  standalone: true,
  imports: [CommonModule, BaseChartDirective ],
  template: `
        <section class="buttons"></section>
        <div style="display: block; height: 300px">
          <canvas baseChart id="myChart"
              [datasets]="config.data.datasets"
              [labels]="config.data.labels"
              [options]="config.options"
              [type]="config.type"
              >
            </canvas>
        </div>
  `
})
export class ChartsTestComponent implements OnInit, AfterViewInit {

  actions = [
    {
      name: 'Randomize',
      handler(chart) {
        chart.data.datasets.forEach(dataset => {
          dataset.data = [25, 82, 56, 36, 77, 12];
        });
        chart.update();
      }
    }
  ];

  datasets = [
    {
        label: 'Crude oil prices',
        data: [85, 72, 78, 75, 77, 75]
    },
    {
      label: 'xxxx',
      data: [25, 32, 48, 55, 67, 55]
    }
  ];

  config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: this.datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Mi propio titulo'
        }
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    const myChart = Chart.getChart('myChart');

    this.actions.forEach((a, i) => {
      const button = document.createElement('button');
      button.id = 'button' + i;
      button.className = 'btn btn-primary mb-2';
      button.innerText = a.name;
      button.onclick = () => a.handler(myChart);
      document.querySelector('.buttons').appendChild(button);
    });

  }

}
