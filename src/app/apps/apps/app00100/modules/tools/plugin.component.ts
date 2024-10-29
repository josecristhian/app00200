import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaicatoPluginsModule } from 'waicato-data-mgtm';
import { WaicatoSessionService } from 'waicato-core';
import { AppService } from '../../services'
import { Router } from '@angular/router';

@Component({
  selector: 'app-plugin',
  standalone: true,
  imports: [CommonModule, WaicatoPluginsModule],
  template: `<waicato-plugins [BackendConfig]="sessionService.getBackendConfig()" (oOnCancel)="onCancel()"></waicato-plugins>`

})
export class PluginComponent {

  constructor(public sessionService: WaicatoSessionService, private router: Router, public appService: AppService) {
  }

  onCancel(){
    this.router.navigate( ['/' + this.appService.getAppCode() + '/home']);
  }

}
