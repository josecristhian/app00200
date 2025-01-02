import { Component, OnInit } from '@angular/core';
import { WaicatoTopBarService } from 'waicato-core';
import { AppServicePrivate } from '../../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `Acerca de...`,
  styles : `.pb-4, .py-4 { padding-bottom: 0.1rem !important; padding-top: 0.3rem !important; }`
})
export class AboutPublicComponent implements OnInit {

  constructor( private topBarService: WaicatoTopBarService, private localServices: AppServicePrivate ) {
  }

  ngOnInit(): void {
    this.topBarService.setTitle('<i class="fa-regular fa-circle-question"></i>&nbsp;Application ID: ' + this.localServices.getAppData()['app']);
  }


}
