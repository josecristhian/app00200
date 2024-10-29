import { Component, OnInit } from '@angular/core';
import _ from 'underscore';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WaicatoReportingModule } from 'waicato-analytics';
import { WaicatoSessionService } from 'waicato-core';


@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [CommonModule, WaicatoReportingModule],
  template: `<waicato-reporting [BackendConfig]="sessionService.getBackendConfig()" [reportID]="reportID" [queryVariables]="queryVariables" *ngIf="showReport"></waicato-reporting>`
})
export class ReportingComponent implements OnInit {

  reportID;
  queryVariables = [];
  showReport = false;
 
  constructor(public route: ActivatedRoute, public router: Router, public sessionService: WaicatoSessionService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async query => {
      _.each( _.keys(query), (x) => {
        this.queryVariables.push( {name: x, value: query[x]} );
      });

      if ( this.reportID ) {
        this.initReportingData();
      }
    });

    this.route.params.subscribe(async params => {
      this.reportID = params['id'];
      this.initReportingData();
    });
  }

  initReportingData() {
    this.showReport = true;
  }

}
