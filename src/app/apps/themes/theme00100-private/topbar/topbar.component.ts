import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { WaicatoAuthService } from 'waicato-auth';
import {CommonModule, Location} from '@angular/common';
import screenfull from 'screenfull';
import _ from 'underscore';
import { TEMPLATE_SETTINGS } from '../config.module';
import { MenuToggleModule } from '../sidebar/menu/menu-toggle.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { WaicatoToastModule, WaicatoSpinnerModule, WaicatoTopBarModule, WaicatoSessionService, WaicatoEventsService } from 'waicato-core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

declare var $: any;

@Component({
	selector: 'theme00100-private-topbar',
	standalone: true,
	imports: [CommonModule, NgScrollbarModule, MenuToggleModule, WaicatoToastModule, WaicatoSpinnerModule, WaicatoTopBarModule, SidebarComponent, RouterModule],
	providers: [],
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class Theme00100_Private_TopbarComponent implements OnInit {

	sidebarExpanded = true;
	isFullscreen = false;
	topBarMenu: any[] = [];
	@Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
	TS = TEMPLATE_SETTINGS;

	constructor( public auth: WaicatoAuthService, public sessionService: WaicatoSessionService, public _location: Location, public eventsService: WaicatoEventsService) {
	}

	ngOnInit(): void {
		this.eventsService.events$.subscribe( (e) => {
			if ( e?.type === 'menuLoaded' ) this.loadTopBarMenu();
		});
	}

	async loadTopBarMenu() {
		const currentMenu = this.sessionService.getAppMenu();
		const topbarItems = currentMenu.topbar;
		
		if ( !topbarItems.find(item => item.label === 'Servicios') ) {
			topbarItems.unshift(
				...[ 
				{ type: 'divider' },
				{ type: 'item', label: 'Servicios', icon: 'fa fa-signal', link: '/status' },
				{ type: 'item', label: this.sessionService.getTenant().name, icon: 'fa-solid fa-building' }
				].reverse()
			);
		}
		
		this.topBarMenu = currentMenu.topbar = topbarItems;
		
		// UPDATE GLOBAL MENU
		this.sessionService.setAppMenu(currentMenu);
	}

	toggleFullscreen() {
		if (screenfull.isEnabled) {
			screenfull.toggle();
			this.isFullscreen = !this.isFullscreen;
		}
	}

	public switchSideBar() {		
		this.sidebarExpanded = !this.sidebarExpanded;
		console.log('running toggleSideBar: ', this.sidebarExpanded);
		this.toggleSidebar.emit(this.sidebarExpanded);
		return this.sidebarExpanded;
	}

	backClicked() {
		this._location.back();
	}

	forwardClicked() {
		this._location.forward();
	}

	refreshClicked(): void {
		window.location.reload();
	}

}
