import { Component, OnInit } from '@angular/core';
import { WaicatoAuthModule } from 'waicato-auth';
import { WaicatoAuthService } from 'waicato-auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [CommonModule, WaicatoAuthModule],
  template: `<waicato-auth-login></waicato-auth-login>`
})
export class AuthLoginComponent {
}

@Component({
  selector: 'auth-logout',
  standalone: true,
  imports: [CommonModule, WaicatoAuthModule],
  template: `<p>Logout</p>`
})
export class LogoutComponent implements OnInit {

  constructor(public auth: WaicatoAuthService) {}

  ngOnInit() {
   this.auth.auth.logout();
  }

}

import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { WaicatoToastService, WaicatoUtilService, WaicatoSessionService } from 'waicato-core';

@Injectable({
   providedIn: 'root'
})

export class AuthGuard  {

	constructor(private toastService: WaicatoToastService, private router: Router, public auth: WaicatoAuthService, public sessionService: WaicatoSessionService, public utilService: WaicatoUtilService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
      return this.auth.auth.ready.then( () => {

         // está autenticado y existe token
         if ( this.auth.auth.authenticated && localStorage.getItem('formioToken') ) {
            const expired = this.utilService.isTokenExpired(localStorage.getItem('formioToken'))

            // token expirado
            if ( !expired ) {
              return true
            }
         }

         if ( this.sessionService.getTenant().id === 'null' ) {
            // detener acá, no hay tenant
            return false;
         }

         this.sessionService.setBeforeLoginRoute(state.url);

         // not logged in so redirect to login page with the return url
         this.toastService.info(this.sessionService.getError('401'), 'USUARIO:');
         this.router.navigate(['/login'] );
         return false;

      });      
   }   
}
