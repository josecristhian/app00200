import { Injectable } from '@angular/core';
import { WaicatoSessionService } from 'waicato-core';
import { APP_URL, APP_LOAD, SERVICE_PREFIXES, APP_LOGIN } from './_utils/common-configs';
import _ from 'underscore';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WaicatoEventsService } from 'waicato-core';
import { GET_DEFAULT_APP, DEFFAULT_APP_HAS_TENANT, GET_APPS } from './_utils/app-utils';

@Injectable()
export class InitService {

    constructor(private sessionService: WaicatoSessionService, private http: HttpClient, private events: WaicatoEventsService) {
     }


    loadConfigFile(): Promise<any> {
        return new Promise((resolve, reject) => {

            const hostname = window.location.hostname.split('.');
            const endpoint = window.location.protocol + '//api.' + hostname[hostname.length - 2] + '.' + hostname[hostname.length - 1];
            const tenant = DEFFAULT_APP_HAS_TENANT() ? (GET_DEFAULT_APP()['tenant']) : (window.location.pathname.split('/')[1]);

            if ( tenant.length <= 0 ) { // cuando ingresa a la raiz sin tenant
                this.sessionService.clearTenant();
                reject('NO TENANT ID');
                this.http.get(APP_LOAD.FILES.WEBSITEFILE).subscribe( configfile => {
                    window.location.href = configfile['web'];
                });
                return;
            }

            if ( this.sessionService.getTenant().id !== tenant ) {
                this.sessionService.clearAll();
            }

            if ( APP_LOAD.USEENDPOINTFILE ) {
                this.http.get(APP_LOAD.FILES.ENDPOINTFILE).subscribe( configfile => {
                    this.initiatedApp(environment.production ? configfile['endpoint2'] : configfile['endpoint1'], tenant);
                    resolve('ENDPOINT FILE');
                });
            } else {
                resolve('ENDPOINT DOMAIN');
                this.initiatedApp(endpoint, tenant);
                resolve(true);
            }
        });
    }

    initiatedApp(endpoint, tenant){
        this.initConfigData(endpoint, tenant);
        this.sessionService.initGlobalVariables(endpoint, tenant, APP_URL, SERVICE_PREFIXES);
        this.events.triggerEventByType('appInitiated', { endpoint, tenant });
        // ping to raise an error just in case the end point is incorrect
        this.http.get(endpoint + '/api/' + tenant  + '/status/ping').subscribe( (x) => {});
    }

    initConfigData(endpoint, tenant){
        const apiEndPointTenant = endpoint + '/api/' + tenant;
      
        const default_app = GET_APPS().find(app => app['default'] === true);
        if ( default_app?.app && default_app?.loginSource && default_app?.loginSource.length > 2) {
            APP_LOGIN.AuthConfig.login.form = default_app.loginSource;
        }
      
        APP_URL.API_SERVER = apiEndPointTenant + '/';
        APP_URL.AppConfig.apiUrl = apiEndPointTenant + '/' + SERVICE_PREFIXES.PREFIXES.SUBM;
        APP_URL.AppConfig.appUrl = apiEndPointTenant + '/' + SERVICE_PREFIXES.PREFIXES.SUBM;
    }

}
