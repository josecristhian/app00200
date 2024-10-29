	
import { Routes } from '@angular/router';

export const APPS_SETTINGS = [
    { id: 'app00000', app: 'default', default: false, loginSource: 'usuario/login/', tenant: 'bomboncitos' },
    { id: 'app00100', app: 'app00100', default: false, loginSource: 'usuario/login/', tenant: 'bomboncitos' },
    { id: 'app00101', app: 'fundme', default: true, allowPublicRoutes: true, loginSource: 'usuario/login/', tenant: 'bomboncitos' }
];

export const APPS_ROUTES_PRIVATE: Routes = [
    { path: 'app00000', loadChildren: () => import('../_waicato-engine/_default-app/app-routing.module').then(m => m.RoutingModule) },
    { path: 'app00100', loadChildren: () => import('./apps/app00100/app-routing.module').then(m => m.RoutingModule) },
    { path: 'fundme', loadChildren: () => import('./apps/app00101/app-routing.module').then(m => m.RoutingModule) },
];

export const APPS_ROUTES_PUBLIC: Routes = [
    { path: '', loadChildren: () => import('./apps/app00101/app-routing-public.module').then(m => m.RoutingModule) },
];
