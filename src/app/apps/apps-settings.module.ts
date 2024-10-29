	
import { Routes } from '@angular/router';

export const APPS_SETTINGS = [
    { id: 'app00000', app: 'default', default: true, allowPublicRoutes: true, loginSource: 'usuario/login/', tenant: 'bomboncitos' }
];

export const APPS_ROUTES_PRIVATE: Routes = [
    { path: 'app00000', loadChildren: () => import('../_waicato-engine/_default-app/app-routing.module').then(m => m.RoutingModule) },
];

export const APPS_ROUTES_PUBLIC: Routes = [
];
