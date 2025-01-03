import { Injectable } from '@angular/core';
import { WaicatoEventsService, WaicatoSessionService } from 'waicato-core';
import { WaicatoSubmService } from 'waicato-data-mgtm';
import _ from 'underscore';
import { WaicatoAuthService } from 'waicato-auth';

@Injectable({providedIn: 'root'})

export class AppServicePublic  {

  constructor (public sessionService: WaicatoSessionService, public waicatoSubmService: WaicatoSubmService, public eventsService: WaicatoEventsService, public auth: WaicatoAuthService) {}

  canActivate() {
    this.initializeApp();
    return true
  }

  initializeApp() {
      this.loadMenu();
  }

  async loadMenu() {

      /* top bar menu */
      const topbar_menu = [
        { "type": "item", "label": "Servicios", "icon": "fa fa-signal", "link": "/status" },
        { "type": "divider" }
      ]

      if ( this.auth?.auth?.authenticated ) {
        topbar_menu.push({ "type": "item", "label": "Cerrar Sesión", "icon": "fa-solid fa-right-from-bracket", "link": "/logout" });
      } else {
        topbar_menu.push({ "type": "item", "label": "Iniciar Sesión", "icon": "fa-solid fa-user-shield", "link": "/login" });
      }

      this.eventsService.triggerEventByType('custom', { type: 'templateLoaded', value: 'readyForTopbarMenu', items: topbar_menu });        


      /* sidebar menu */
      const sidebar_menu = [
        { data: { nivel: 'item', nombre: 'Inicio', itemIcon: 'fa fa-home', routeFixed: '/public/home', color: '', app: '' }, _id: '1' },
        { data: { nivel: 'item', nombre: 'Acerca de', itemIcon: 'fa-regular fa-circle-question', routeFixed: '/public/about', color: '', app: '' }, _id: '2' },
        { data: { nivel: 'item', nombre: 'Aplicación', itemIcon: 'fa-solid fa-box-open', routeFixed: '/app00200', color: '', app: '' }, _id: '3' },
      ]

      setTimeout(() => {
        this.eventsService.triggerEventByType('custom', { type: 'templateLoaded', value: 'readyForSidebarMenu', items: sidebar_menu });
      }, 50);

  }

}