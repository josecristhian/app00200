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
	selector: 'tmpl00100-private-topbar',
	standalone: true,
	imports: [CommonModule, NgScrollbarModule, MenuToggleModule, WaicatoToastModule, WaicatoSpinnerModule, WaicatoTopBarModule, SidebarComponent, RouterModule],
	providers: [],
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class Tmpl00100_Private_TopbarComponent implements OnInit {

	sidebarExpanded = true;
	isFullscreen = false;
	topBarMenu: any[] = [];
	@Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
	TS = TEMPLATE_SETTINGS

	constructor( public auth: WaicatoAuthService, public sessionService: WaicatoSessionService, public _location: Location, public eventsService: WaicatoEventsService) {
	}

	ngOnInit(): void {
		this.eventsService.events$.subscribe( (e) => {
			if ( e?.category === 'custom' && e?.params?.type === 'templateLoaded' && e?.params?.value === 'readyForTopbarMenu' ) this.loadTopBarMenu(e?.params?.items);
		});
	}

	async loadTopBarMenu(items) {
		this.topBarMenu = items;
	}

	toggleFullscreen() {
		if (screenfull.isEnabled) {
			screenfull.toggle();
			this.isFullscreen = !this.isFullscreen;
		}
	}

	public switchSideBar() {		
		this.sidebarExpanded = !this.sidebarExpanded;
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
