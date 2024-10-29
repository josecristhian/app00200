import { Component, ViewEncapsulation } from '@angular/core';
import { WaicatoAuthService } from 'waicato-auth';
import {CommonModule, Location} from '@angular/common';
import screenfull from 'screenfull';
import _ from 'underscore';

import { MenuToggleModule } from '../sidebar/menu/menu-toggle.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { WaicatoToastModule, WaicatoSpinnerModule, WaicatoTopBarModule, WaicatoSessionService } from 'waicato-core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

declare var $: any;
@Component({
	selector: 'template-00001',
	standalone: true,
	imports: [CommonModule, NgScrollbarModule, MenuToggleModule, WaicatoToastModule, WaicatoSpinnerModule, WaicatoTopBarModule, SidebarComponent, RouterModule],
	providers: [],
	templateUrl: './main-material.html',
	styleUrls: ['./main-material.scss'],
	encapsulation: ViewEncapsulation.None
})

export class Template00001Component {

	sidebarExpanded = true;
	isFullscreen = false;

	constructor( public auth: WaicatoAuthService, public sessionService: WaicatoSessionService, public _location: Location) {
	}

	toggleFullscreen() {
		if (screenfull.isEnabled) {
			screenfull.toggle();
			this.isFullscreen = !this.isFullscreen;
		}
	}

	public toggleSideBar() {
		this.sidebarExpanded = !this.sidebarExpanded;
	}

	logOut() {
		this.auth.auth.logout();
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
