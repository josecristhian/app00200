import { Routes } from '@angular/router';

export const APPS_GENERAL_SETTINGS = { default_home: '/public/home' };

/**
 id: unique app identifier
 app: app name that must match path in routes 
 default: if true, this app will be the default app
 allowPublicRoutes: if true, this app will allow public routes
 loginSource: login source for this app
 tenant: tenant for this app, if empty tenant will be obtained from url
*/
export const APPS_SETTINGS = [
    { id: 'app00200', app: 'app00200', default: true, allowPublicRoutes: true, loginSource: 'usuario/login/', tenant: 'tenant00200' }
];

export const APPS_ROUTES_PRIVATE: Routes = [
    { path: 'app00200', loadChildren: () => import('./app00200/app-routing-private.module').then(m => m.RoutingModule) }
];

export const APPS_ROUTES_PUBLIC: Routes = [
    { path: 'public', loadChildren: () => import('./app00200/app-routing-public.module').then(m => m.RoutingModule) }
];
