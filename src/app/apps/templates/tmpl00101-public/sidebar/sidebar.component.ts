import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from "ngx-scrollbar";
import { WaicatoEventsService, WaicatoSessionService } from 'waicato-core';
import { MenuItems } from "./menu/menu-items/menu-items";
import { WaicatoAuthService } from "waicato-auth";
import { MenuToggleModule } from "./menu/menu-toggle.module";
import _ from 'underscore';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  providers: [MenuItems],
  imports: [CommonModule, RouterModule, MenuToggleModule, NgScrollbarModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	@Input() isExpanded: boolean = true;
	@Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

	menuItems = []

	handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

	constructor (public sessionService: WaicatoSessionService, public menuItemsClass: MenuItems, public auth: WaicatoAuthService, public eventsService: WaicatoEventsService) {
	}

	ngOnInit(): void {
		this.eventsService.events$.subscribe( (e) => {		
			if ( e?.type === 'custom' && e?.params?.type === 'templateLoaded' && e?.params?.value === 'readyForSidebarMenu' ) {
				this.setSidebarMenu(e?.params?.items);
			}
		});
	}

	toJson( s: string ) {
		return  s && s.length > 0 ? JSON.parse(s) : {};
	}

	setSidebarMenu(menuItems) {
		const self = this;
    	this.menuItems = menuItems;

		this.menuItemsClass.clear();

		// const respuestaMenuHeaders: any = responseMenuHeaders;
		let cabeceras = _.filter(this.menuItems, (x) => x.data.nivel === 'cabecera');
		let items = _.filter(this.menuItems, (x) => x.data.nivel === 'item');
		let singles = _.filter(this.menuItems, (x) => x.data.nivel === 'item' && ( !_.has(x.data, 'cabecera') || x.data.cabecera._id === undefined || x.data.cabecera.length <= 0 ) );
		interface ChildrenItems { state: string; name: string; color?: string; type?: string; label?: string; }
		interface Menu { state: string; parametros: string; name: string; type: string; app: string, icon: string; color?: string; label?: string; children?: ChildrenItems[]; }


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

			if ( elementos.length > 0 ) {
				mi.children = elementos;
				self.menuItemsClass.add(mi);
			}
		});

	}

}
