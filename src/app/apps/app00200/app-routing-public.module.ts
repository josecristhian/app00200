import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppServicePublic } from './services';
import { GET_GENERAL_SETTINGS } from '../../_waicato-engine/_utils/app-utils';

const routes: Routes = [

  {
    path: '',
    canActivate: [AppServicePublic],
    loadComponent: () => import('../../_waicato-engine/_utils/template-loader').then(m => m.TemplateDinamicLoaderComponent),
    resolve: { data: () => ( { template_id: GET_GENERAL_SETTINGS().public_template_id }) },
    children: [
        { path: 'home', loadChildren: () => import('./pages/public/home/home.module').then(m => m.HomePublicModule) },
        { path: 'about', loadComponent: () => import('./pages/public/about/about.component').then(m => m.AboutPublicComponent) },
        { path: '**', redirectTo: 'home' }  // Handle wildcard
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule {}
