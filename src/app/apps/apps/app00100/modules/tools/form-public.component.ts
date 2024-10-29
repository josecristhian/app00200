import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaicatoSpinnerService } from 'waicato-core';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WaicatoDataMgtmModule, WaicatoFrmsService } from 'waicato-data-mgtm';
import { WaicatoSpinnerModule, WaicatoSessionService } from 'waicato-core';

@Component({
  selector: 'app-formpublic',
  standalone: true,
  imports: [CommonModule, WaicatoDataMgtmModule, WaicatoSpinnerModule],
  template: `
      <waicato-spinner #spin></waicato-spinner>

      <nav class="navbar" [ngStyle]="{'width': this.anchoNavBar, 'background-color': '#1f153b', 'margin': '0 auto'}" *ngIf="this.showNavBar">
          <a href="https://www.hflow.io">
            <img src="assets/waicato-core/img/brand/logo3.png" height="25" alt="">
          </a>
      </nav>

      <br>

      <div [ngStyle]="{'width': this.anchoForm, 'margin': '0 auto'}">
          <!-- MESSAGES DATA -->
          <div *ngIf="welcomeMessage.length>0 && !infoSubmitted" class="alert alert-info" role="alert" [innerHtml]="this.welcomeMessage"></div>
          <div *ngIf="postMessage.length>0 && infoSubmitted" class="alert alert-info" role="alert" [innerHtml]="this.postMessage"></div>


          <div *ngIf="!this.errorDetected && !this.infoSubmitted && this.mostrarCreate">
              <waicato-data-mgtm-create [BackendConfig]="sessionService.getBackendConfig()" [jsonForm]="this.formComponents" [useURL]="false" (oOnSubmit)="onSubmit($event)"></waicato-data-mgtm-create>
          </div>

          <div class="card not-found-wrapper" *ngIf="this.infoSubmitted">
              <h2 class="font-weight-bold text-success"><i class="fas fa-key"></i> {{this.formPublicId + '::' + this.savedSubmissionId}}</h2>
          </div>
          <div *ngIf="this.infoSubmitted">
              <waicato-data-mgtm-view [BackendConfig]="sessionService.getBackendConfig()" [jsonForm]="this.formComponents" [jsonSubmission]="this.savedSubmission"></waicato-data-mgtm-view>
          </div>

          <div class="card not-found-wrapper text-center shadow-box p-4" *ngIf="this.errorDetected">
              <h2 class="font-2x font-weight-bold text-danger">{{this.errorMessage}}</h2>
              <p class="font-lg">{{'Disculpas! No podemos cargar el formulario solicitado...'}}</p>
          </div>

      </div>
  `
})
export class FormpublicComponent implements OnInit {

  mostrarCreate = false;
  formComponents = { components: {} };
  formPublicId = '';
  errorDetected = false;
  errorMessage = '';
  infoSubmitted = false;
  showNavBar = true;
  savedSubmission;
  savedSubmissionId;
  welcomeMessage = '';
  postMessage = '';
  anchoNavBar = '100%';
  anchoForm = '95%';

  constructor(private spinnerService: WaicatoSpinnerService, public sessionService: WaicatoSessionService, public route: ActivatedRoute, public frmsService: WaicatoFrmsService) {
    this.route.params.subscribe( params => {
      this.loadPublicForm( params['id'] );
    });

    this.route.queryParams.subscribe(qparams => {
      this.showNavBar = qparams['navbar'] && qparams['navbar'] === 'no' ? false : true ;
      this.anchoNavBar = qparams['navbarWidth'] ? qparams['navbarWidth'] + '%' : this.anchoNavBar;
      this.anchoForm = qparams['formWidth'] ? qparams['formWidth'] + '%' : this.anchoForm;
    });
  }

  ngOnInit(): void {
  }

  async loadPublicForm ( id ) {
    try {
      this.spinnerService.show();
      const f = await lastValueFrom ( this.frmsService.getPublicForm( this.sessionService.getBackendConfig(), id ) );

      if ( f['status'] && f['status'] !== 200 ) {
        this.errorDetected = true;

        if ( f['status'] === 401 ) {
          this.errorMessage = 'FORMULARIO NO AUTORIZADO';
        }

        if ( f['status'] === 403 ) {
          this.errorMessage = 'FORMULARIO EXPIRADO';
        }

        if ( f['status'] === 400 || f['status'] === 404 ) {
          this.errorMessage = 'FORMULARIO NO ENCONTRADO';
        }

        this.spinnerService.hide();
        return;
      }

      this.formPublicId = id;
      this.welcomeMessage = f['message'] ? f['message'] : '';
      this.formComponents = { components: f['components'] };
      this.spinnerService.hide();
      this.mostrarCreate = true;

    } catch (e) {
      this.errorDetected = true;
      this.spinnerService.hide();
    }
  }

  async postPublicForm (id, submission ) {
      this.spinnerService.show();
      const p = await lastValueFrom ( this.frmsService.postPublicForm( this.sessionService.getBackendConfig(), id, submission ) );

      if ( p['status'] && p['status'] !== 200 ) {
        this.errorDetected = true;
        this.errorMessage = p['status'] === 404 ? 'FORMULARIO NO ENCONTRADO' : 'FORMULARIO NO AUTORIZADO';
        this.spinnerService.hide();
        return;
      }

      this.spinnerService.hide();
      this.savedSubmission = submission;
      this.savedSubmissionId = p['id'];
      this.postMessage = p['message'] ? p['message'] : '';
      this.infoSubmitted = true;
  }

  onSubmit( e ) {
    const data = { formPublicId: this.formPublicId, components: this.formComponents, submission: e };
    this.postPublicForm( this.formPublicId, e );
  }

}
