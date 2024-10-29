import { APPS_SETTINGS } from '../../apps/apps-settings.module';

import { Template00001Component } from '../_default-template/main/main.component';
import { Template00001LoginComponent } from '../_default-template/login/login.component';

export const RESERVED_ROUTES_ID = ['base', 'login', '404'];

export const TEMPLATE_DEFAULT_COMPONENT = 
{ 
    id: 'default',
    base: Template00001Component,
    login: Template00001LoginComponent
}

/** ------------------------------------------------------------------------------------------------------ */
export function GET_APPS() {
    const DEFAULT_APP = [ {id: 'app00000', app: 'default', default: false, loginSource: 'usuario/login/' } ];
    return [...DEFAULT_APP, ...APPS_SETTINGS]
}

export function GET_DEFAULT_APP() {
    const apps = GET_APPS();
    return apps.find( app => app.default );
}

export function DEFFAULT_APP_HAS_TENANT() {
    const app = GET_DEFAULT_APP();
    return app['tenant'] ? true : false
}

/** ------------------------------------------------------------------------------------------------------ */