import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const _routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(_routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppsRoutingRootModule {
}

