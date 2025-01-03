import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { Tmpl00100_Private_TopbarComponent } from '../topbar/topbar.component';

declare var $: any;

@Component({
	selector: 'tmpl00101-public-base',
	standalone: true,
	imports: [CommonModule, NgScrollbarModule, MenuToggleModule, WaicatoToastModule, WaicatoSpinnerModule, WaicatoTopBarModule, SidebarComponent, RouterModule, Tmpl00100_Private_TopbarComponent],
	providers: [],
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class Tmpl00101_Public_BaseComponent implements OnInit {

	sidebarExpanded = true;
	isFullscreen = false;
	topBarMenu: any[] = [];
	TS = TEMPLATE_SETTINGS;
	constructor( public auth: WaicatoAuthService, public sessionService: WaicatoSessionService, public _location: Location, public eventsService: WaicatoEventsService) {
	}

	ngOnInit(): void {
		this.eventsService.events$.subscribe( (e) => {
			if ( e?.type === 'custom' && e?.params?.type === 'templateLoaded' && e?.params?.value === 'readyForTopbarMenu' ) {
				setTimeout(() => { this.loadTopBarMenu(e?.params?.items) }, 100);
			}
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

	public toggleSideBar(status) {
		this.sidebarExpanded = status;
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
