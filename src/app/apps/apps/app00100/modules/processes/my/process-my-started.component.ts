import { Component, OnDestroy, OnInit } from '@angular/core';
import { WaicatoTopBarService, WaicatoSessionService } from 'waicato-core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../services'

@Component({
  selector: 'app-process-mystarted',
  template: `<waicato-process-my-started [BackendConfig]="sessionService.getBackendConfig()" [iProcessId]="processId" (oOnCancel)="onCancel()"></waicato-process-my-started>`
})
export class ProcessMystartedComponent implements OnInit, OnDestroy {

  processId = '';

  constructor(public sessionService: WaicatoSessionService, public router: Router, private topBarService: WaicatoTopBarService, public route: ActivatedRoute, public appService: AppService ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.processId = params['processId'] || '';
    });
    this.setTopBar();
  }

  ngOnDestroy() {
  }

  setTopBar() {
    this.topBarService.clearTopBar();
    this.topBarService.setTitle( '<i class="fas fa-cubes"></i>&nbsp;Mis procesos iniciados' );  

    this.topBarService.addButton({label: 'Cancelar', class: 'btn-cancel', icon: 'fa fa-fw fa-times'}, this.onCancel.bind(this));
  }

  onActivate(e) {
    //
  }

  onCancel() {
    this.router.navigateByUrl('/' + this.appService.getAppCode() + '/my/processes');
  }


}
