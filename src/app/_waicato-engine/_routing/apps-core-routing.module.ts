import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { APPS_ROUTES_PRIVATE, APPS_ROUTES_PUBLIC } from '../../apps/apps-settings.module';

const OOTB_APP_PRIVATE_ROUTE: Routes = [{ path: 'default', loadChildren: () => import('../_default-app/app-routing.module').then(m => m.RoutingModule) }];
const OOTB_APP_PUBLIC_ROUTE: Routes = [{ path: '404', loadComponent: () => import ('../_shared/404/404.component').then ( m => m.NotFoundPageComponent) }];

export const APP_ROUTES: Routes = APPS_ROUTES_PRIVATE ? [...OOTB_APP_PRIVATE_ROUTE, ...APPS_ROUTES_PRIVATE] : OOTB_APP_PRIVATE_ROUTE;
export const APP_ROUTES_PUBLIC: Routes = APPS_ROUTES_PUBLIC ? [...OOTB_APP_PUBLIC_ROUTE, ...APPS_ROUTES_PUBLIC] : OOTB_APP_PUBLIC_ROUTE;


@NgModule({
  imports: [CommonModule, RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule],
  declarations: []
})
export class AppsCorePrivateRoutingModule {
}

@NgModule({
  imports: [CommonModule, RouterModule.forChild(APP_ROUTES_PUBLIC)],
  exports: [RouterModule],
  declarations: []
})
export class AppsCorePublicRoutingModule {}