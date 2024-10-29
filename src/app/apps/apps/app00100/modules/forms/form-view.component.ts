import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { WaicatoFormDataModule, WaicatoViewService } from 'waicato-data-mgtm';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { WaicatoDataMgtmModule } from 'waicato-data-mgtm';
import { WaicatoUtilService, WaicatoSessionService } from 'waicato-core';


@Component({
  selector: 'app-form-view',
  standalone: true,
  imports: [CommonModule, WaicatoFormDataModule, WaicatoDataMgtmModule],
  template: `
      <div *ngIf="!errorDetected">
          <waicato-data-mgtm-index *ngIf="formData.type==='index'" [BackendConfig]="sessionService.getBackendConfig()" [formPath]="formData.formulario" [useURL]="useUrl" [urlPrefix]="urlPrefix" [isView]="true" [viewId]="viewId" (oOnError)="onError($event)"></waicato-data-mgtm-index>
          <waicato-data-mgtm-view *ngIf="formData.type==='view'" [BackendConfig]="sessionService.getBackendConfig()" [formPath]="formData.formulario" [submissionId]="formData.submissionId" [useURL]="useUrl" [urlPrefix]="urlPrefix" [isView]="true" [viewId]="viewId" (oOnError)="onError($event)"></waicato-data-mgtm-view>
      </div>

      <div class="card not-found-wrapper text-center shadow-box p-4" *ngIf="errorDetected">
          <h2 class="font-2x font-weight-bold text-danger">{{'Error desconocido'}}</h2>
          <p class="font-lg">{{'Disculpas! Tenemos un error con la página solicitada...'}}</p>
      </div>
  `
})
export class FormViewComponent implements OnInit {

  useUrl = true;
  urlPrefix;
  errorDetected = false;
  formData: any = {};
  viewId;

  constructor( private router: Router, public sessionService: WaicatoSessionService, public waicatoUtilService: WaicatoUtilService, public route: ActivatedRoute, public viewService: WaicatoViewService ) {
  }

  ngOnInit(): void {
    try {
      this.route.params.subscribe( async params => {
        this.viewId = params['idView'];
        await lastValueFrom( this.viewService.existView(this.sessionService.getBackendConfig(), this.viewId, params['formname']) );
        this.urlPrefix = this.router.url.substring(1, this.router.url.indexOf(params['formname']));
        this.formData = this.waicatoUtilService.parseFormUrl( this.router.url, this.urlPrefix);
      });
    } catch (e) {
      this.errorDetected = true;
      this.formData = {};
    }
  }

  onError(e) {
  }
}

export const FormViewRoutes: Routes = [
  {
      path: '',
      component: FormViewComponent
  },
  {
      path: ':id',
      children: [
          {
              path: '',
              redirectTo: 'view',
              pathMatch: 'full'
          },
          {
              path: 'view',
              component: FormViewComponent
          },
          {
              path: '**', // support parents relations
              component: FormViewComponent
          }
      ]
  }
]
