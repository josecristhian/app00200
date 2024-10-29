import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { WaicatoBpmsService } from 'waicato-processes';
import { WaicatoAuthService } from 'waicato-auth';
import screenfull from 'screenfull';
import _ from 'underscore';
import { MenuToggleModule } from '../sidebar/menu/menu-toggle.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { WaicatoToastModule, WaicatoSpinnerModule, WaicatoTopBarModule, WaicatoSessionService } from 'waicato-core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

declare var $: any;

@Component({
	selector: 'template-00002',
	standalone: true,
	imports: [CommonModule, NgScrollbarModule, MenuToggleModule, WaicatoToastModule, WaicatoSpinnerModule, WaicatoTopBarModule, SidebarComponent, RouterModule],
	providers: [],
	templateUrl: './main-material.html',
	styleUrls: ['./main-material.scss'],
	encapsulation: ViewEncapsulation.None
})

export class Template00002Component implements OnInit {

	sidebarExpanded = true;
	activeComponent: any; // el componente activo para poder comunicar componente padre con el hijo
	isFullscreen = false;
	header: string;

	constructor( public auth: WaicatoAuthService, public sessionService: WaicatoSessionService, public bpmsService: WaicatoBpmsService,
				 public _location: Location) {
	}

	ngOnInit() {
		// obtener cantidad de tareas
		this.bpmsService.getBpmTaskListCount(this.sessionService.getBackendConfig());
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

	/** As router outlet will emit an activate event any time a new component is being instantiated. */
	onActivate(e, scrollContainer) {
		this.activeComponent = e;
		scrollContainer.scrollTop = 0;
	}

	onDeactivate() {
		this.activeComponent = null;
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
