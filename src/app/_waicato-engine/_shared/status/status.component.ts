import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaicatoSessionService, WaicatoStatusModule } from 'waicato-core';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, WaicatoStatusModule],
  template: `<waicato-status [urlServerStatus]="urlServer" [showTable]="true"></waicato-status>`

})
export class StatusPageComponent implements OnInit {

  public urlServer;

  constructor( public sessionService: WaicatoSessionService){}

  ngOnInit(): void {
    //public urlServer = CONFIG.API_SERVER + 'status/status';
    this.urlServer = this.sessionService.getBackendConfig().API_SERVER + 'status/status';
  }

  
}
