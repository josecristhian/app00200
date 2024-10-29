import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'underscore';
import { WaicatoToastService, WaicatoSessionService } from 'waicato-core';
import { AppService } from '../../../services'

declare var $: any;

@Component({
  selector: 'app-process-task',
  template: `<waicato-process-my-task-complete [BackendConfig]="sessionService.getBackendConfig()" [iTaskId]="taskId" (oOnSubmitted)="onSubmitted($event)" (oOnClaimTask)="onClaimTask($event)" (oOnCancel)="onCancel()"></waicato-process-my-task-complete>`
})
export class ProcessTaskComponent implements OnInit {

  taskId;

  constructor(public sessionService: WaicatoSessionService, public route: ActivatedRoute, public router: Router, private toastService: WaicatoToastService, public appService: AppService ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      if ( !params['id'] ) {
        this.onError( { key: 'interno', message: 'Parametros Incorrectos' });
        return;
      }

      this.taskId = params['id'];
    });
  }

  onError(error) {
      this.toastService.error(error.message, 'ERROR:');
      this.router.navigate(['/' + this.appService.getAppCode() + '/my/tasks']);
  }

  onSubmitted(submission){
    this.router.navigate(['/' + this.appService.getAppCode() + '/my/tasks']);
  }

  onClaimTask(task){
    this.router.navigate(['/' + this.appService.getAppCode() + '/my/tasks/complete'], { queryParams: { id: task.id, random: new Date().getTime() } });
  }

  onCancel(){
    this.router.navigate(['/' + this.appService.getAppCode() + '/my/tasks']);
  }

}
