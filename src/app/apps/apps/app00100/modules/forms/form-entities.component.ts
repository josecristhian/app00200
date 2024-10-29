import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import _ from 'underscore';
import { Router, ActivatedRoute } from '@angular/router';
import { WaicatoTopBarService, WaicatoUtilService, WaicatoGridConfig, WaicatoSessionService } from 'waicato-core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { WaicatoFormDeleteModule, WaicatoEntitiesModule } from 'waicato-data-mgtm';
import { AppService } from '../../services'

declare var $: any;

@Component({
  selector: 'app-entities',
  standalone: true,
  imports: [
    CommonModule,
    WaicatoFormDeleteModule,
    NgxDatatableModule,
    WaicatoEntitiesModule
  ],
  template: `<waicato-entities [BackendConfig]="sessionService.getBackendConfig()" [iWaicatoTopBarService]="topBarService" [formData]="formData" [useUrl]="useUrl" [gridConfig]="gridConfig" (oOnCancel)="onCancel()"></waicato-entities>`
})
export class FormEntitiesComponent implements OnInit {

  urlPrefix = 'mgtm';
  formData: any = {};
  useUrl = true;
  gridConfig = WaicatoGridConfig;

  constructor(public sessionService: WaicatoSessionService, public waicatoUtilService: WaicatoUtilService, public topBarService: WaicatoTopBarService, private router: Router, public route: ActivatedRoute, public appService: AppService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const prefix = '/' + this.appService.getAppCode() + '/' + this.urlPrefix;
      this.formData.prefix = prefix;
      this.formData = this.waicatoUtilService.parseFormUrl( this.router.url, prefix );
    });
  }

  onCancel(){
    this.router.navigate( ['/' + this.appService.getAppCode() + '/home']);
  }


}
