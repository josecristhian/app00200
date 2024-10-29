import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaicatoSessionService } from 'waicato-core';
import { WaicatoFormBuilderModule } from 'waicato-data-mgtm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formbuilder',
  standalone: true,
  imports: [CommonModule, WaicatoFormBuilderModule],
  template: `
      <nav class="navbar" style="background-color: #1f153b;" *ngIf="this.showNavBar">
      <a href="https://www.hflow.io">
        <img src="assets/waicato-core/img/brand/logo3.png" height="25" alt="">
      </a>
      </nav>

      <!-- Tabs Builder -->
      <waicato-form-builder #builder
          [BackendConfig]="sessionService.getBackendConfig()"
          [useInput]="true"
          [iType]="'play'"
          [iShowBuilder]="this.showBuilder"
          [iHideBuilderButton]="this.hideBuilderButton"
          [iURL]="this.url"
      ></waicato-form-builder>
  `
})
export class FormbuilderComponent implements OnInit {

  embedded = false;
  showNavBar = true;
  isOffline = false;
  showBuilder = true;
  hideBuilderButton = false;
  url = '';

  constructor(public route: ActivatedRoute, public router: Router, public sessionService: WaicatoSessionService ) { }

  ngOnInit(): void {
    this.isOffline = this.router.url.includes('/public/form/builder') || this.router.url.includes('/public/form/viewer');
    this.showBuilder = this.router.url.includes('/public/form/builder') || this.router.url.includes('/utils/formbuilder');
    this.hideBuilderButton = this.router.url.includes('/public/form/viewer');

    this.route.queryParams.subscribe(params => {
      this.url = params['form'] ? params['form'] : '';
      this.embedded = params['embedded'] === 'yes' ? false : true;
      this.showNavBar = params['navbar'] && params['navbar'] === 'no' ? false : ( this.isOffline) ? true : false ;
    });
  }

}
