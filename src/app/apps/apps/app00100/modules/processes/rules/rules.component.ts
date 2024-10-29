import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaicatoRulesListModule } from 'waicato-processes';
import { WaicatoSessionService } from 'waicato-core';
import { Router } from '@angular/router';
import { AppService } from '../../../services'

@Component({
  standalone: true,
  imports: [CommonModule, WaicatoRulesListModule],
  selector: 'app-rules',
  template: `<waicato-rules-list [BackendConfig]="sessionService.getBackendConfig()" (oOnCancel)="onCancel()"></waicato-rules-list>`
})
export class RulesComponent {

  constructor(public sessionService: WaicatoSessionService, private router: Router, public appService: AppService){    
  }

  onCancel(){
    this.router.navigate( ['/' + this.appService.getAppCode() + '/home']);
  }

}
