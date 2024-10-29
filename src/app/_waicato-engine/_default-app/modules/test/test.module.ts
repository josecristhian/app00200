import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { RouterModule, Routes } from '@angular/router';
import { WaicatoImportDataModule } from 'waicato-data-mgtm';
import { WaicatoAuthModule } from 'waicato-auth';

const routes: Routes = [
  { path: '', component: TestComponent },
]

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    WaicatoImportDataModule,
    WaicatoAuthModule,
    RouterModule.forChild(routes)
  ]
})
export class TestModule { }
