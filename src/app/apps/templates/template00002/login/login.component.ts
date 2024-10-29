import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from '../../../../_waicato-engine/_shared/auth/auth.component';
import { RouterModule } from '@angular/router';
import { WaicatoAuthService } from 'waicato-auth';

declare var $: any;


@Component({
  selector: 'template-00002-login',
  standalone: true,
  imports: [CommonModule, AuthLoginComponent, RouterModule],
  templateUrl: 'login.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Template00002LoginComponent implements OnInit {

  constructor(public auth: WaicatoAuthService) {
  }

  ngOnInit(): void {
  }


}
