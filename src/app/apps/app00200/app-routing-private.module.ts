import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppServicePrivate } from './services';

const routes: Routes = [
    {
      path: '',
      canActivate: [AppServicePrivate],
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
        { path: 'info', loadComponent: () => import('./pages/info/info.component').then(m => m.InfoComponent) },
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
