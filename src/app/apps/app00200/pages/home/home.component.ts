import { Component, OnInit } from '@angular/core';
import { WaicatoTopBarService } from 'waicato-core';
import { AppServicePrivate } from '../../services';

declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private topBarService: WaicatoTopBarService, private localServices: AppServicePrivate ) {
  }

  ngOnInit(): void {
    this.topBarService.setTitle('<i class="fa fa-home"></i>&nbsp;Application ID: ' + this.localServices.getAppData()['app']);
  }

  onShowFormInfo() {
    $('#formInfo').modal('show');
  }

}


