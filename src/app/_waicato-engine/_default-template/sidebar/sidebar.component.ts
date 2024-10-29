import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { WaicatoEventsService, WaicatoSessionService } from 'waicato-core';
import { MenuItems } from "./menu/menu-items/menu-items";
import { WaicatoAuthService } from "waicato-auth";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { MenuToggleModule } from "./menu/menu-toggle.module";
import { NgScrollbarModule } from "ngx-scrollbar";
import { WaicatoSubmService } from 'waicato-data-mgtm';
import { GET_APPS } from '../../_utils/app-utils';
import { lastValueFrom } from "rxjs";
import _ from 'underscore';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  providers: [MenuItems],
  imports: [CommonModule, RouterModule, MenuToggleModule, NgScrollbarModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isExpanded: boolean = true;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  menuItems = []

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  constructor (public sessionService: WaicatoSessionService, public menuItemsClass: MenuItems, public auth: WaicatoAuthService, public eventsService: WaicatoEventsService, public waicatoSubmService: WaicatoSubmService) {
  }

  ngOnInit(): void {
    this.eventsService.events$.subscribe( (e) => {

      if ( this.auth.auth.authenticated && ['onLogin', 'firstTimeLoad', 'pageWasRefreshed'].includes(e?.type) ) {
        this.loadMenu();
      }

      if ( e?.type === 'onLogout' ) {
        console.log('unload menu');
      }
  });
  }

  logOut() {
		this.auth.auth.logout();
	}

  toJson( s: string ) {
		if ( s && s.length > 0 ) {
			return JSON.parse(s);
		}
		return {};
	}

  async loadMenu() {
    const menuData = await lastValueFrom( this.waicatoSubmService.getSubmissions(this.sessionService.getBackendConfig(), 'system-frontend-menu', 'data.visible=true&sort=data.orden&limit=100') );
    const menu = _.filter(menuData, (x) => _.filter(GET_APPS(), (a) => a.app === x.data.app)?.length > 0 || x.data.app?.length <= 0)
		this.setMenu(menu);
  }

  setMenu(menuItems) {
		const self = this;
    this.menuItems = menuItems;

		this.menuItemsClass.clear();

		// const respuestaMenuHeaders: any = responseMenuHeaders;
		let cabeceras = _.filter(this.menuItems, (x) => x.data.nivel === 'cabecera');
		let items = _.filter(this.menuItems, (x) => x.data.nivel === 'item');
		let singles = _.filter(this.menuItems, (x) => x.data.nivel === 'item' && ( !_.has(x.data, 'cabecera') || x.data.cabecera._id === undefined || x.data.cabecera.length <= 0 ) );
		interface ChildrenItems { state: string; name: string; color?: string; type?: string; label?: string; }
		interface Menu { state: string; parametros: string; name: string; type: string; app: string, icon: string; color?: string; label?: string; children?: ChildrenItems[]; }

		// eliminar items que no tienen el feature BPM
		const tenant = this.sessionService.getTenant();
		const DONOTALLOWEDFEATURES = _.map ( _.filter( tenant.features, (x) => !x.active ), (x) => x.code );
		if ( DONOTALLOWEDFEATURES.length > 0 ) {
			cabeceras = _.filter( cabeceras, (x) => !x.data.adicional || _.intersection(DONOTALLOWEDFEATURES, x.data.adicional.split(',')).length <= 0 ); // 1000 excluir BPM
			items = 	_.filter( items, (x) => !x.data.adicional || _.intersection(DONOTALLOWEDFEATURES, x.data.adicional.split(',')).length <= 0 ); // 1000 excluir BPM
			singles = 	_.filter( singles, (x) => !x.data.adicional || _.intersection(DONOTALLOWEDFEATURES, x.data.adicional.split(',')).length <= 0 ); // 1000 excluir BPM
		}

		// add home
		const default_app = GET_APPS().find(app => app['default'] === true)?.app || '';
		const mihome: Menu = { state: (default_app.length > 0 ? '/' + default_app + '/home' : '/home'), parametros: '', name: 'Inicio', type: 'single', icon: 'fa fa-home', app: '' };
		this.menuItemsClass.add(mihome);

		_.each( singles, function (ia) {
			const pathItem = ( ia.data.routeFixed && ia.data.routeFixed.length > 0 ) ? ia.data.routeFixed : '';
			const mi: Menu = { state: pathItem, parametros: ia.data.parametros, name: ia.data.nombre, type: 'single', icon: ia.data.itemIcon, color: ia.data.color, app: ia.data.app };
			self.menuItemsClass.add(mi);
		});

		_.each( cabeceras, function (cabecera) {
			const mi: Menu = { state: '', parametros: '', name: cabecera.data.nombre, type: 'sub', icon: cabecera.data.itemIcon, color: cabecera.data.color, app: '' };
			const itemsMenu = _.filter(items, (x) => _.has(x.data, 'cabecera') && x.data.cabecera._id === cabecera._id);
			const elementos = [];

			_.each ( itemsMenu, function (item) {
				const pathItem = ( item.data.routeFixed && item.data.routeFixed.length > 0 ) ? item.data.routeFixed : '';
				elementos.push( { state: pathItem, parametros: item.data.parametros, name: item.data.nombre, type: 'link', icon: item.data.itemIcon, color: item.data.color, app: item.data.app });
			});

			mi.children = elementos;
			self.menuItemsClass.add(mi);
		});

		const mi: Menu = { state: '/logout', parametros: '', name: 'Salir', type: 'single', icon: 'fa-solid fa-right-from-bracket', color: '', app: '' };
		this.menuItemsClass.add(mi);
	}

	ngOnDestroy() {
	}

  
}
