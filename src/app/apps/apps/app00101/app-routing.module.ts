import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: '', redirectTo: '/public/home', pathMatch: 'full' },
   { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
   { path: '**', redirectTo: '/home' }  // Handle wildcard
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
