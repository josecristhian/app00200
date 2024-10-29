import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WaicatoSessionService } from 'waicato-core';
import { WaicatoTopBarService, WaicatoUtilService } from 'waicato-core';
import { WaicatoFormDataModule } from 'waicato-data-mgtm';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AppService } from '../../services'

@Component({
  selector: 'app-form-data',
  standalone: true,
  imports: [CommonModule, WaicatoFormDataModule],
  template: `<waicato-form-data [BackendConfig]="sessionService.getBackendConfig()" [iWaicatoTopBarService]="topBarService" [formData]="formData" [useUrl]="useUrl" (oOnCancel)="onCancel()"></waicato-form-data>`
})
export class FormDataComponent implements OnInit {

  useUrl = true;
  urlPrefix;
  formData: any = {};

  constructor( private router: Router, public sessionService: WaicatoSessionService, public waicatoUtilService: WaicatoUtilService, public route: ActivatedRoute, private changeDetector: ChangeDetectorRef, public topBarService: WaicatoTopBarService, public appService: AppService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.formData.type = '';
      this.changeDetector.detectChanges();
      this.urlPrefix = this.router.url.substring(1, this.router.url.indexOf(params['formname']));
      this.formData.prefix = this.urlPrefix;
      this.formData = this.waicatoUtilService.parseFormUrl( this.router.url, this.urlPrefix );
    });
  }

  onCancel(){
    this.router.navigate( ['/' + this.appService.getAppCode() + '/home']);
  }

}

export const FormDataRoutes: Routes = [
  { path: '', component: FormDataComponent },
  { path: 'new', component: FormDataComponent },
  { path: ':id',
      children: [
          { path: '', redirectTo: 'view', pathMatch: 'full' },
          { path: 'view', component: FormDataComponent },
          { path: 'edit', component: FormDataComponent },
          { path: 'delete', component: FormDataComponent },
          { path: '**', /*support parents relations*/ component: FormDataComponent }
      ]
  }
]