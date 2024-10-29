import { UrlSegment } from '@angular/router';
import { APPS_SETTINGS } from '../../apps/apps-settings.module';
import { TEMPLATE_LIST } from '../../apps/templates-settings.module';
import { RESERVED_ROUTES_ID, TEMPLATE_DEFAULT_COMPONENT } from '../_utils/app-utils';
import { isCommonPrivateRoute } from '../_shared/app-routing.module';
import { APP_ROUTES_PUBLIC } from './apps-core-routing.module';
import _ from 'underscore';

export function isPublicRoute(route: UrlSegment[]) {
  const url = route.map(segment => segment.path).join('/');
  const arp = APP_ROUTES_PUBLIC;
  return arp.some(item => item.path === url);
}

// catch all public routes
export function routerPublicMatcher(url: UrlSegment[]) {
  // vacio === default app
  // empty: si está vacío + hay app default + app default admite rutas públicas
  // const empty = url.length === 0 && APP_CONFIG.LOAD_APPS.some(app => app.default && app.allowPublicRoutes) ? { consumed: url } : null;
  // notempty: no está vacío y si es una ruta pública declarada
  const notempty = url.length > 0 && url[0].path === 'public' && isPublicRoute(url) ? { consumed: url.slice(1, 1) } : null;
  return notempty
}

// catch all app routes
export function routerAppsMatcher(url: UrlSegment[]) {
  const apps = APPS_SETTINGS;
  const r = url.length 
    ? (apps.some(item => item.app === url[0].path) ? { consumed: url.slice(1, 1) } : null) // hay app con el path
    : (apps.some(item => item.default) ? { consumed: url } : null);
  return r;
}

// catch all private routes
export function routerCommonPrivateMatcher(url: UrlSegment[]) {
  return isCommonPrivateRoute(url) ? { consumed: url.slice(1, 1) } : null;
}

// catch all custom template routes
export function routerReservedMatcher(url: UrlSegment[]) {
  // URL-PATH esta incluido en la configuración de templates y el template tiene el componente (key) configurado
  if ( url[0]?.path && RESERVED_ROUTES_ID.includes(url[0].path) ) {
    const template = TEMPLATE_LIST.find( (x) => x.hasOwnProperty('default') && x['default'] ) || TEMPLATE_DEFAULT_COMPONENT;
    if ( template[url[0].path] ) {
      return { consumed: url } 
    }
  }

  return null;
}

// catch all custom template routes
export function routerRootMatcher(url: UrlSegment[]) {
  if ( url.length <= 0 ) {
    return { consumed: url };
  }

  return null;
}