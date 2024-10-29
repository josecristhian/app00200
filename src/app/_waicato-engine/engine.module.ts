import { NgModule, APP_INITIALIZER, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { APP_URL, APP_LOGIN } from './_utils/common-configs';
import { DEFFAULT_APP_HAS_TENANT } from './_utils/app-utils';
import { WaicatoToastModule, WaicatoErrorHandler } from 'waicato-core';
import { WaicatoAuthConfig, WaicatoAuthModule } from 'waicato-auth';

import { WaicatoMainEngineComponent } from './enginecomponent';
import { InitService } from './engine-init.service';


export function init_app(appInitService: InitService) {
	return () => appInitService.loadConfigFile().then();
}

@NgModule({
	imports: [BrowserModule, HttpClientModule, WaicatoToastModule, WaicatoAuthModule, WaicatoMainEngineComponent],
	declarations: [],
	bootstrap: [],
	exports: [WaicatoMainEngineComponent],
	providers: [
		InitService,
		{ provide: APP_INITIALIZER, useFactory: init_app, deps: [InitService], multi: true },
		{ provide: WaicatoAuthConfig, useValue: { AppConfig: APP_URL.AppConfig, AuthConfig: APP_LOGIN.AuthConfig}, deps: [InitService] },
		{
			provide: APP_BASE_HREF,
			useFactory: () => DEFFAULT_APP_HAS_TENANT() ? '' : `/${window.location.pathname.split('/')[1]}/`, // perform any adjustments here (trim to just first segment, etc.) 
			deps: [InitService]
		},
		{ provide: ErrorHandler, useClass: WaicatoErrorHandler }
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WaicatoMainEngineModule { }
