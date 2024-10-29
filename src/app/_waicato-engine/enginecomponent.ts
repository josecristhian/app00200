import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { WaicatoAuthService } from 'waicato-auth';
import { Router, NavigationEnd } from '@angular/router';
import { WaicatoSessionService, WaicatoToastService, WaicatoEventsService, WaicatoTenantService } from 'waicato-core';
import { APP_URL, SERVICE_PREFIXES } from './_utils/common-configs';
import { DEFFAULT_APP_HAS_TENANT } from './_utils/app-utils';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WaicatoToastModule, WaicatoSpinnerModule } from 'waicato-core';
import { Title } from '@angular/platform-browser';

declare var $: any;

interface NavigationEvent extends PerformanceNavigationTiming {
	type: 'reload' | 'navigate' | 'back_forward' | 'prerender';
}

@Component({
 selector: 'waicato-engine',
 standalone: true,
 imports: [WaicatoToastModule, WaicatoSpinnerModule],
 template: `
 	<waicato-toast></waicato-toast>
	<waicato-spinner></waicato-spinner>
 `,
 encapsulation: ViewEncapsulation.None
})

export class WaicatoMainEngineComponent implements OnInit, OnDestroy {	

	private readonly destroy$ = new Subject<void>();
  	private readonly RESTRICTED_PATHS = ['/auth', '/logout'];
  	private readonly TOOLTIP_SELECTOR = '[data-bs-toggle="tooltip"]';

	constructor(private toastService: WaicatoToastService, public auth: WaicatoAuthService, public router: Router, public sessionService: WaicatoSessionService,
				private events: WaicatoEventsService, public tenantService: WaicatoTenantService, private titleService: Title) {
	}

	ngOnInit() {
		this.checkNavigationType();
		this.initializeAuthListeners();
		this.initializeRouteListeners();
		this.initializeTooltips();
		this.setTitle()
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private setTitle(): void {
		this.titleService.setTitle('Waicato Home');
	}

	private checkNavigationType(): void {
		const navigationEntries = performance.getEntriesByType('navigation');
		
		if (navigationEntries.length > 0 && this.isNavigationTiming(navigationEntries[0])) {
		  const event = navigationEntries[0].type === 'reload' ? 'pageWasRefreshed' : 'firstTimeLoad';
		  this.events.triggerEventByType(event);
		}
	}

	private isNavigationTiming(entry: PerformanceEntry): entry is NavigationEvent {
		return entry instanceof PerformanceNavigationTiming;
	}

	private initializeAuthListeners(): void {
		// Login listener
		this.auth.auth.onLogin
		  .pipe(takeUntil(this.destroy$))
		  .subscribe(() => {
			const { nombre } = this.auth.auth.user.data;
			this.toastService.success(nombre, 'BIENVENIDO');
			this.sessionService.setSessionOnLogin(this.auth.auth.user, APP_URL, SERVICE_PREFIXES);
			this.router.navigateByUrl('/home');
		  });
	
		// Logout listener
		this.auth.auth.onLogout
		  .pipe(takeUntil(this.destroy$))
		  .subscribe(() => {
			this.sessionService.setSessionOnLogout();
			this.router.navigate(['/login']);
		  });
	}

	private initializeRouteListeners(): void {
		this.router.events
		  .pipe(
			filter((event): event is NavigationEnd => event instanceof NavigationEnd),
			takeUntil(this.destroy$)
		  )
		  .subscribe((event: NavigationEnd) => {
			this.handleTenantValidation(event);
			this.updateRouteHistory(event);
		  });
	}

	private handleTenantValidation(event: NavigationEnd): void {
		const isRestrictedPath = this.RESTRICTED_PATHS.some(path => event.url.includes(path));
		
		if (!isRestrictedPath && !DEFFAULT_APP_HAS_TENANT() && this.tenantService.hasTenantIdChange()) {
		  this.router.navigate(['/logout']);
		}
	}
	
	private updateRouteHistory(event: NavigationEnd): void {
		this.sessionService.setRoutesURL(
			this.sessionService.getCurrentUrl(),
			event.url
		);
	}

	private initializeTooltips(): void {
		$(this.TOOLTIP_SELECTOR).tooltip();
	}

}
