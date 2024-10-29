import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaicatoReportingMyModule } from 'waicato-analytics';
import { Router } from '@angular/router';
import { AppService } from '../../services'
import { WaicatoSessionService } from 'waicato-core';

@Component({
  selector: 'app-myreports',
  standalone: true,
  imports: [CommonModule, WaicatoReportingMyModule],
  template: `<waicato-reporting-my [BackendConfig]="sessionService.getBackendConfig()" (oOnRowClicked)="onRowClicked($event)"></waicato-reporting-my>`
})
export class MyreportsComponent {
 
  constructor(public router: Router, public sessionService: WaicatoSessionService, public appService: AppService) { }

  onRowClicked (id) {
    this.router.navigate(['/' + this.appService.getAppCode() + '/analytics/reporting/' + id]);
  }

}
