import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaicatoSessionService } from 'waicato-core';
import { WaicatoTopBarService } from 'waicato-core';
import { CommonModule } from '@angular/common';
import { WaicatoBpmnModelerModule } from 'waicato-processes';
import { AppService } from '../../services'

declare var $: any;

@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [CommonModule, WaicatoBpmnModelerModule],
  template: `
      <!-- Cabecera  -->
      <div *ngIf="this.showNavBar">
          <nav class="navbar" style="background-color: #1f153b;">
              <a href="https://www.hflow.io">
                  <img src="assets/waicato-core/img/brand/logo3.png" height="25" alt="">
              </a>
          </nav>
      </div>

      <div role="tabpanel" [ngStyle]="{'height' : this.canvasHeight + 'px', 'margin': this.embedded ? '15px' : '5px'}">
          <waicato-bpmn-modeler #bpmnmodeler [BackendConfig]="sessionService.getBackendConfig()" [iHeight]="this.height"></waicato-bpmn-modeler>
      </div>
  `

})
export class ModelerComponent implements OnInit {

  fullScreen = (window.innerHeight * 0.80) + 'px';
  height = this.fullScreen;
  file: any;
  url: string;
  panelPropertiesShow = false;
  isOffline = false;
  canvasHeight = window.innerHeight * 0.70;
  style = { 'height' : this.canvasHeight + 'px;' };
  showNavBar = true;
  embedded = false;

  constructor(public route: ActivatedRoute, public router: Router, private topBarService: WaicatoTopBarService, public sessionService: WaicatoSessionService, public appService: AppService ) {
  }

  ngOnInit() {    
    this.isOffline = this.router.url.includes('/public/bpmn/modeler');
    this.setTopBar();

    this.route.queryParams.subscribe(params => {
      this.url = params['bpmn'] ? params['bpmn'] : '';
      this.embedded = params['embedded'] === 'yes' ? true : false;
      this.showNavBar = params['navbar'] && params['navbar'] === 'no' ? false : ( this.isOffline) ? true : false ;
      this.height = params['height'] ? params['height'] : this.height;

      if ( this.url.length > 0) {
        //
      }
    });
  }

  setTopBar() {
		this.topBarService.clearTopBar();
		this.topBarService.setTitle('<i class="fas fa-shapes"></i>&nbsp;Modelador de Procesos BPMN');
    this.topBarService.addButton({label: 'Cancelar', class: 'btn-cancel', icon: 'fa fa-fw fa-times'}, this.onCancel.bind(this));
  }

  onCancel() {
    this.router.navigate( ['/' + this.appService.getAppCode() + '/home']);
  }



}
