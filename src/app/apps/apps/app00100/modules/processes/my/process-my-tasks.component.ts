import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WaicatoSessionService } from 'waicato-core';
import { AppService } from '../../../services'

@Component({
  selector: 'app-process-mytasks',
  template: `<waicato-process-my-tasks [BackendConfig]="sessionService.getBackendConfig()" (oOnCerrarTarea)="onCerrarTarea($event)"></waicato-process-my-tasks>`
})
export class ProcessMyTasksComponent implements OnInit {

  constructor(public sessionService: WaicatoSessionService, public router: Router, public appService: AppService ) {
  }

  ngOnInit() {
  }

  async onCerrarTarea( task ) {
      this.router.navigate([ this.appService.getAppCode() + '/my/tasks/complete'], { queryParams: { id: task.taskId } });
  }

}
