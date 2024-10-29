import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from '../../_shared/auth/auth.component';

declare var $: any;


@Component({
  selector: 'template-00001-login',
  standalone: true,
  imports: [CommonModule, AuthLoginComponent],
  template: `
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

      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Template00001LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


}
