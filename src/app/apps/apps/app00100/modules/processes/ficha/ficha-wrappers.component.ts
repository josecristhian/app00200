import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaicatoTopBarService, WaicatoSessionService } from 'waicato-core';
import _ from 'underscore';
import { AppService } from '../../../services'

@Component({
  selector: 'app-process-ficha',
  template: `
            <div class="tab-wrappers tabs-below">
              <ul class="nav nav-tabs nav-xs nav-tabs-highlight nav-tabs-top mb-4" role="tablist" id="myTab">
                  <li class="nav-item"><a aria-controls="active" aria-expanded="true" class="nav-link" [ngClass]="{'disabledTab': workflowNotSaved, 'active': tab === 'ficha'}" data-bs-toggle="tab" data-bs-target="#tab-ficha" role="tab" (click)="onClickTabs('ficha')">&nbsp;<i class="fa fa-fw fa-file-alt {{workflowNotSaved?'disabledTab':'text-warning'}}"></i>&nbsp;Ficha</a></li>
                  <li class="nav-item"><a aria-controls="active" aria-expanded="true" class="nav-link" [ngClass]="{'disabledTab': workflowNotSaved, 'active': tab === 'forms'}" data-bs-toggle="tab" data-bs-target="#tab-forms" role="tab" (click)="onClickTabs('forms')">&nbsp;<i class="fas fa-file-invoice {{workflowNotSaved?'disabledTab':'text-primary'}}"></i>&nbsp;Formularios</a></li>
                  <li class="nav-item"><a aria-controls="active" aria-expanded="true" class="nav-link" [ngClass]="{'active': tab === 'process'}"  data-bs-toggle="tab" data-bs-target="#tab-process" role="tab" (click)="onClickTabs('process')">&nbsp;<i class="fas fa-box text-success"></i>&nbsp;Modelador <i *ngIf="workflowNotSaved" class="noguardado">(no guardado)</i></a></li>
                  <li class="nav-item"><a aria-controls="active" aria-expanded="true" class="nav-link" [ngClass]="{'disabledTab': workflowNotSaved, 'active': tab === 'instancias'}" data-bs-toggle="tab" data-bs-target="#tab-instancias" role="tab" (click)="onClickTabs('instancias')">&nbsp;<i class="fa fa-list-alt {{workflowNotSaved?'disabledTab':'text-info'}}"></i>&nbsp;Instancias</a></li>
              </ul>
              <hr style='margin-top:0em' />
            <div class="tab-content">
              <div class="tab-pane fade" [ngClass]="{'active show': tab==='ficha'}" id="tab-ficha" role="tabpanel">
                <waicato-process-ficha-view *ngIf="showFicha" [BackendConfig]="sessionService.getBackendConfig()" [iProcessId]="processId" [iWaicatoTopBarService]="topBarService" (oOnCancel)="onProcessFichaCancel()"></waicato-process-ficha-view>
              </div>
              <div class="tab-pane fade" [ngClass]="{'active show': tab==='forms'}" id="tab-forms" role="tabpanel" >
                <waicato-process-ficha-forms *ngIf="showProcessForms" [BackendConfig]="sessionService.getBackendConfig()" [iProcessId]="processId" [iWaicatoTopBarService]="topBarService" (oOnCancel)="onCancel()" (oOnClickData)="onClickDataProcessForms($event)"></waicato-process-ficha-forms>
              </div>
              <div class="tab-pane fade" [ngClass]="{'active show': tab==='process'}" id="tab-process" role="tabpanel">
                <waicato-process-modeler #bpmnmodeler *ngIf="showModeler" [BackendConfig]="sessionService.getBackendConfig()" [iProcessId]="processId" (oOnCancel)="onClickTabs('ficha')" (oNotSaved)="notSavedEvent($event)"></waicato-process-modeler>
              </div>
              <div class="tab-pane fade" [ngClass]="{'active show': tab==='instancias'}" id="tab-instancias" role="tabpanel" >
                <waicato-process-ficha-instances #instances *ngIf="showInstances" [BackendConfig]="sessionService.getBackendConfig()" [iProcessId]="processId" (oOnCancel)="onCancel()"></waicato-process-ficha-instances>
              </div>
            </div>
          </div>
  `,
  styles: [`
    :host ::ng-deep .tabs-below .tab-content .tab-pane { padding: 0 !important; }
    :host ::ng-deep .mb-4, .my-4 { margin-bottom: 0.5rem !important; }
    :host ::ng-deep .nav.nav-xs > li > a { padding-top: 5px; padding-right: 10px; padding-bottom: 0; padding-left: 0; }
    :host ::ng-deep .chk-block .chk-block-content { padding-top: 0px; padding-left: 5px; padding-right: 1px; padding-bottom: 0px; margin-bottom: 1px; }
    :host ::ng-deep .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link { font-weight: bold !important; }
    :host ::ng-deep .px-4 { padding: 0.1rem !important; }
    .noguardado { font-size: xx-small; }
    .disabledTab{ pointer-events: none; color: #cccccc; }  
  `]
})
export class ProcessFichaWrappersComponent implements OnInit {

  /** */
  ficha: any = { key: '' }; // seteamos el key para evitar errores de undefined en el html;
  showFicha = false;
  showModeler = false;
  showInstances = false;
  showProcessForms = false;
  processId: string;
  tab = '';
  workflowNotSaved = false;

  constructor(public route: ActivatedRoute, public router: Router, public topBarService: WaicatoTopBarService, public sessionService: WaicatoSessionService, public appService: AppService) {
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.route.params.subscribe(async params => {

      this.topBarService.setTitle('<i class="fas fa-box"></i> Proceso');
      
      this.processId = (params.id !== null) ? params.id : undefined;

      let currentURL = 'ficha';
      let setTab = true;

      if ( this.router.url.indexOf('/view/forms') >= 0 ) {
        currentURL = 'forms';
      }

      if ( this.router.url.indexOf('/view/process') >= 0 ) {
        currentURL = 'process';
      }

      if ( this.router.url.indexOf('/view/instancias') >= 0 ) {
        currentURL = 'instancias';
      }

      const queryParams = this.route.snapshot.queryParams;

      if ( queryParams['origin'] && (queryParams['origin'] === 'form-index' || queryParams['origin'] === 'access') ) {
        currentURL = 'forms';
        setTab = false;
        this.router.navigate(['../' + 'forms'], { relativeTo: this.route });
      }

      if ( setTab ) {
        this.setCurrentTab(currentURL);
      }

    });
  }

  setCurrentTab(tab: string) {
    if ( tab !== this.tab ) {
    }

    this.tab = tab;

    setTimeout(() => {
      this.showModeler = tab === 'process';
      this.showInstances = tab === 'instancias';
      this.showProcessForms = tab === 'forms';
      this.showFicha = tab === 'ficha';
    }, 100);
  }

  onClickTabs(tab: string) {
    if ( tab !== this.tab ) {
      this.router.navigate(['../' + tab], { relativeTo: this.route });
    }
  }

  onCancel() {
    this.router.navigate(['/' + this.appService.getAppCode() + '/workflows'], { relativeTo: this.route });
  }

  notSavedEvent(event) {
    setTimeout( () => {
      this.workflowNotSaved=event
    }, 100)
  }

  /*-----------------------------*/
  /*<waicato-process-ficha-view */
  onProcessFichaCancel() {
    this.router.navigate(['/' + this.appService.getAppCode() + '/workflows'], { relativeTo: this.route });
  }

  /*-----------------------------*/
  /* waicato-process-ficha-forms */
  onClickDataProcessForms(data) {
    this.router.navigate(['/' + this.appService.getAppCode() + '/workflows/', data.processId, 'forms', data.formName], { relativeTo: this.route });
  }

  /*-----------------------------*/

}
