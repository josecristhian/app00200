import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WaicatoSessionService } from 'waicato-core';
import { WaicatoAuthService } from 'waicato-auth';

declare var $: any;


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-wrapper">
      <div class="login-block text-center login-content shadow-box border mx-auto">
        <div class="login-icon mb-4">
          <span class="square-100 fa-notify"><i class="fa fa-unlock-alt"></i></span>
        </div>
                  
        <div>
            <span>
                <img src="{{ sessionService.getUserLogged()?.image }}" class="rounded-circle mb-3 border" width="150" height="150" />
            </span>
            <BR>
            <span class="login-info">
              {{ auth?.auth?.user?.data?.nombre }}<BR>
              <i class="fas fa-building"></i>&nbsp;{{ auth?.auth?.user?.data?.email }}
            </span>
            <BR>
        </div>

        <div style="width: 100%;">    
          <button class="btn btn-danger" style="width: 100%; margin-bottom: 3px" (click)="onLogout()"><span class="fa fa-sign-out"></span> Cerrar Sesión</button>
          <BR>
          <button class="btn btn-primary" style="width: 100%;" (click)="onHome()"><span class="fa fa-home"></span> Home</button>
        </div>
            
      </div>
    </div>   
  `,
  styleUrls: ['./logged-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoggedInfoComponent {

  constructor( public router: Router, public sessionService: WaicatoSessionService, public auth: WaicatoAuthService ) {
  }

  onHome(){
    this.router.navigate( ['/home'] );
  }
  
  onLogout(){
    this.router.navigate( ['/logout'] );
  }


}
