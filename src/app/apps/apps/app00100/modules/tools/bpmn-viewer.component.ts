import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaicatoTopBarService, WaicatoUtilService } from 'waicato-core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WaicatoBpmnViewerModule } from 'waicato-processes';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services'


@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [CommonModule, WaicatoBpmnViewerModule],
  template: `
      <nav class="navbar" style="background-color: #1f153b;" *ngIf="this.showNavBar">
        <a href="https://www.hflow.io">
          <img src="assets/waicato-core/img/brand/logo3.png" height="25" alt="">
        </a>
      </nav>

      <div [ngStyle]="{ 'margin': this.embedded ? '15px' : '1px' }" >
          <waicato-bpmn-viewer #processviewer *ngIf="showProcessViewer" [iXML]="xml" [iShowDocumentation]="showDocumentation" [iHeight]="height"></waicato-bpmn-viewer>
      </div>
  `
})
export class ViewerComponent implements OnInit, OnDestroy {

  CDN_URL = 'https://files.hflow.app/public_bpmn/';
  fullScreen = (window.innerHeight * 0.83) + 'px';
  height = this.fullScreen;
  showProcessViewer = false;
  isOffline = false;
  url = '';
  cdn = '';
  bpmn = '';
  embedded = false;
  showDocumentation = true;
  showNavBar = true;
  showToolsBottom = true;
  xml = '';

  constructor(private topBarService: WaicatoTopBarService, public router: Router, public route: ActivatedRoute, private http: HttpClient, public waicatoUtilService: WaicatoUtilService, public appService: AppService) {
  }

  ngOnInit() {
    this.isOffline = this.router.url.includes('/public/bpmn/viewer');
    if ( this.isOffline ) {
      this.height = (window.innerHeight * 0.93) + 'px';
    }
    this.setTopBar();

    this.route.queryParams.subscribe(params => {

      this.embedded = params['embedded'] === 'yes' ? false : true;
      this.showDocumentation = params['documentation'] && params['documentation'] === 'no' ? false : true;
      this.showNavBar = params['navbar'] && params['navbar'] === 'no' ? false : ( this.isOffline) ? true : false ;
      this.showToolsBottom = params['tools'] && params['tools'] === 'no' ? false : true;
      this.height = params['height'] ? params['height'] + 'px' : this.height;

      // ?bpmn=c2m-as-is.bpmn&cdn=varios
      this.bpmn = params['bpmn'] ? params['bpmn'] : '';
      this.cdn = params['cdn'] ? this.CDN_URL + params['cdn'] + '/' : '';

      this.url = this.cdn + this.bpmn;
      if ( this.waicatoUtilService.validURL(this.url) ){
        this.loadFromURL(this.url);
      } else {
        this.loadFromURL('assets/waicato-processes/bpmn/empty.bpmn');
      }

    });
  }

  setTopBar() {
		this.topBarService.clearTopBar();
		this.topBarService.setTitle('<i class="fas fa-glasses"></i>&nbsp;Visor de Procesos BPMN');
    this.topBarService.addButton({label: 'Cancelar', class: 'btn-cancel', icon: 'fa fa-fw fa-times'}, this.onCancel.bind(this));  
  }

  async loadFromURL(url) {
    const data = await lastValueFrom ( this.http.get(url, { responseType: 'text'}) );
    this.xml = data;
    this.showProcessViewer = true;
  }

  ngOnDestroy() {
  }

  onCancel() {
    this.router.navigate( ['/' + this.appService.getAppCode() + '/home']);
  }

}
