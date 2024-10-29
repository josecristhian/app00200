import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'underscore';
import { WaicatoTopBarService, WaicatoSessionService } from 'waicato-core';
import { AppService } from '../../../services'

declare var $: any;

@Component({
  selector: 'app-process-myprocesses',
  template: `<waicato-process-my-processes [BackendConfig]="sessionService.getBackendConfig()" (oOnStartProcess)="onStartProcess($event)" (oOnMyStartedProcesses)="oOnMyStartedProcesses($event)"></waicato-process-my-processes>`
})
export class ProcessMyProcessesComponent implements OnInit {

  processKey;

  constructor(public sessionService: WaicatoSessionService, public route: ActivatedRoute, private topBarService: WaicatoTopBarService, public router: Router, public appService: AppService) {
  }

  ngOnInit() {
    this.topBarService.setTitle('<i class="fa fa-cube"></i>&nbsp;Mis Procesos');
    this.route.params.subscribe(async params => {
      this.processKey = ( params.key !== null ) ? params.key : undefined;
    });
  }

  onStartProcess(data) {
    this.router.navigate(['/' + this.appService.getAppCode() + '/my/processes/start'], { queryParams: { form: data.form, process: data.key, nombre: data.nombre, descripcion: data.descripcion } });
  }

  oOnMyStartedProcesses(data){
    this.router.navigate(['/' + this.appService.getAppCode() + '/my/processes/started'], { queryParams: { processId: data.formid } });
  }
  
  onCancel() {
    this.router.navigate(['/' + this.appService.getAppCode() + '/my/processes']);
  }

}


