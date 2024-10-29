import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaicatoToastService, WaicatoSessionService } from 'waicato-core';
import { AppService } from '../../../services'

@Component({
  selector: 'app-process-mystart',
  template: `<waicato-process-my-start *ngIf="loadForm" [BackendConfig]="sessionService.getBackendConfig()" [iFormPath]="formPath" [iProcessKey]="processKey" (oOnSubmitted)="onSubmitted($event)" (oOnCancel)="onCancel()"></waicato-process-my-start>`
})
export class ProcessMystartComponent {

  formPath = '';
  processKey = '';
  loadForm = false;

  constructor(private toastService: WaicatoToastService, public route: ActivatedRoute, public router: Router, public sessionService: WaicatoSessionService, public appService: AppService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      if ( !(params['form'] && params['process']) ) {
        this.onError( { key: 'interno', message: 'Parametros Incorrectos' });
        return;
      }

      this.formPath = params['form'];
      this.processKey = params['process'];
      this.loadForm = true;
    });
  }

  onError(error) {
    if ( error.key && error.key === 'interno' ) {
      this.toastService.error(error.message, 'ERROR:');
    }
  }

  onSubmitted(submission){
      this.router.navigate(['/' + this.appService.getAppCode() + '/my/processes']);
  }

  onCancel() {
    this.router.navigate(['/' + this.appService.getAppCode() + '/my/processes']);
  }

}
