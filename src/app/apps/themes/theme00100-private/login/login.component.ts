import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from '../../../../_waicato-engine/_shared/auth/auth.component';
import { Theme00100_Private_BaseComponent } from '../base/base.component';
import { WaicatoTopBarService } from 'waicato-core';
import { RouterModule } from '@angular/router';

declare var $: any;


@Component({
  selector: 'theme00100-private-login',
  standalone: true,
  imports: [CommonModule, AuthLoginComponent, RouterModule, Theme00100_Private_BaseComponent],
  template: `
    <theme00100-private-base>
      <div class="registerone-wrapper d-flex align-items-center justify-content-between">
        <div class="login-block text-center register-content shadow-box border mx-auto position-relative">
          <div class="login-icon mb-4">
            <span class="square-100 fa-notify"><i class="fa fa-unlock-alt"></i></span>
          </div>

          <div class="logo-sign">
            <img src="assets/waicato-core/img/brand/logo0.png" width="100%">
          </div>

          <div class="card card-primary panel panel-default text-left">
            <div class="card-body panel-body">
              <auth-login></auth-login>
            </div>
          </div>

          <a [routerLink]="'/public'"><i class="fa-solid fa-globe"></i>&nbsp;Volver Página Web Principal</a>

        </div>
      </div>
    </theme00100-private-base>
  `,
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Theme00100_Private_Login_Component implements OnInit {

  constructor(private topBarService: WaicatoTopBarService) {
  }

  ngOnInit(): void {
    this.topBarService.setTitle('');
  }


}
