import { Injectable } from '@angular/core';
import { WaicatoEventsService, WaicatoSessionService } from 'waicato-core';
import { WaicatoSubmService } from 'waicato-data-mgtm';
import { DEFAULT_EMPTY_MENU } from '../../../_waicato-engine/_shared/shared-utilities.service';
import { lastValueFrom } from "rxjs";
import _ from 'underscore';
import { GET_APPS } from '../../../_waicato-engine/_utils/app-utils';
import { APPS_SETTINGS  } from '../../apps-settings.module';

@Injectable({providedIn: 'root'})

export class AppServicePrivate  {

  constructor (public sessionService: WaicatoSessionService, public waicatoSubmService: WaicatoSubmService, public eventsService: WaicatoEventsService) {}

  getAppData(code: string | null = null): string | null {
    const app = code 
      ? _.findWhere(APPS_SETTINGS, { id: code }) 
      : _.findWhere(APPS_SETTINGS, { default: true });

    return app ? app : null;
  }

  canActivate() {
    this.initializeApp();
    return true
  }

  initializeApp() {
      this.loadMenu();
  }

  async loadMenu() {
      const currentMenu = this.sessionService.getAppMenu() || DEFAULT_EMPTY_MENU;

      // SIDEBAR
      const menuItems = await lastValueFrom( this.waicatoSubmService.getSubmissions(this.sessionService.getBackendConfig(), 'system-frontend-menu', 'data.visible=true&sort=data.orden&limit=100') );
      const menuSidebar = _.filter(menuItems, (x) => _.filter(GET_APPS(), (a) => a.app === x.data.app)?.length > 0 || x.data.app?.length <= 0);   
      currentMenu.sidebar = menuSidebar;

      // TOPBAR
      const topbarItems = [
              { type: 'item', label: 'Mi Perfil', icon: 'fa-solid fa-id-card', link: '/view/5df7c603b04de5001aa3a70d/usuario/' + this.sessionService.getUserLogged()?.id + '/view' },
              { type: 'item', label: 'Info Sesión', icon: 'fa-solid fa-user-shield', link: '/auth' },
              { type: 'item', label: 'Cerrar Sesión', icon: 'fa-solid fa-right-from-bracket', link: '/logout' }
      ]
      currentMenu.topbar = topbarItems;

      // SETTING GLOBAL MENU
      this.sessionService.setAppMenu(currentMenu);
      this.eventsService.triggerEventByType('menuLoaded', currentMenu);
  }

}