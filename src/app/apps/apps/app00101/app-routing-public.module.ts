import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'public/home', loadComponent: () => import('./pages/public/home/home.component').then(m => m.HomeComponent) },
  { path: ':user', loadComponent: () => import('./modules/projects/projects.component').then(m => m.ProjectsComponent) },
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
