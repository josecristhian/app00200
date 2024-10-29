import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_shared/auth/auth.component';
import * as routerMatchers from './app-routing-matchers';

const core_routes: Routes = [
    // reserved or custom templates pages
    { matcher: routerMatchers.routerReservedMatcher, loadComponent: () => import ('../_utils/template-loader').then ( m => m.TemplateDinamicLoaderComponent) },

    // root (empty)
    { matcher: routerMatchers.routerRootMatcher, loadChildren: () => import ('./app-routing-root').then ( m => m.AppsRoutingRootModule) },

    // rutas públicas '/public/xxxx'
    { matcher: routerMatchers.routerPublicMatcher, loadChildren: () => import('./apps-core-routing.module').then(m => m.AppsCorePublicRoutingModule) },

    // apps & modules
    {
      path: '',
      loadComponent: () => import('../_utils/template-loader').then(m => m.TemplateDinamicLoaderComponent),
      canActivate: [AuthGuard],
      runGuardsAndResolvers: 'always',
      children: [
        { path: 'home', loadComponent: () => import('../_utils/template-loader').then(m => m.TemplateDinamicLoaderComponent) },
        { matcher: routerMatchers.routerAppsMatcher, loadChildren: () => import('./apps-core-routing.module').then(m => m.AppsCorePrivateRoutingModule) },
        { matcher: routerMatchers.routerCommonPrivateMatcher, loadChildren: () => import('../_shared/app-routing.module').then( m => m.CommonPrivateRoutingModule) },
      ]
    },

    // empty
    { path: '', loadChildren: () => import('./apps-core-routing.module').then(m => m.AppsCorePublicRoutingModule) },

    // catch all
    { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forChild(core_routes)],
  exports: [RouterModule],
  providers: []
})
export class CoreRoutingModule { }

