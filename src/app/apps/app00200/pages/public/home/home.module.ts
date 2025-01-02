import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePublicComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomePublicComponent }];

@NgModule({
  declarations: [HomePublicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomePublicModule { }
