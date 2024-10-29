import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessFichaWrappersComponent } from './ficha-wrappers.component';
import { FormioModule } from '@formio/angular';
import { FormioResource } from '@formio/angular/resource';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule, Routes } from '@angular/router';
import { WaicatoBpmnViewerModule, WaicatoProcessViewerModule } from 'waicato-processes';
import { WaicatoProcessModelerModule } from 'waicato-processes';
import { WaicatoFormDeleteModule, WaicatoFormBuilderModule, WaicatoDataMgtmModule } from 'waicato-data-mgtm';
import { WaicatoSpinnerModule } from 'waicato-core';
import { WaicatoProcessFichaCRUDModule } from 'waicato-processes';
import { WaicatoProcessFichaInstancesModule } from 'waicato-processes';
import { ProcessFichaCRUDComponent } from './ficha-crud.component';
import { WaicatoProcessFichaFormsModule } from 'waicato-processes';
import { WaicatoProcessFichaViewModule } from 'waicato-processes';
import { ProcessFichaListIndexComponent } from './ficha-list-index.component';
import { WaicatoProcessListModule } from 'waicato-processes';

const routes: Routes = [
    {
        path: '',
        component: ProcessFichaListIndexComponent
    },
    {
        path: 'new',
        component: ProcessFichaCRUDComponent
    },
    {
        path: ':id',
        children: [
            {
                path: '',
                redirectTo: 'view/ficha',
                pathMatch: 'full'
            },
            {
                path: 'view/ficha',
                component: ProcessFichaWrappersComponent
            },
            {
                path: 'view/forms',
                component: ProcessFichaWrappersComponent
            },
            {
                path: 'view/process',
                component: ProcessFichaWrappersComponent
            },
            {
                path: 'view/instancias',
                component: ProcessFichaWrappersComponent
            },
            {
                path: 'edit',
                component: ProcessFichaCRUDComponent
            },
            {
                path: 'delete',
                component: ProcessFichaCRUDComponent
            }
        ]
    }
];


@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    FormioResource,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    WaicatoProcessModelerModule,
    WaicatoBpmnViewerModule,
    WaicatoDataMgtmModule,
    WaicatoFormDeleteModule,
    WaicatoFormBuilderModule,
    WaicatoSpinnerModule,    
    WaicatoProcessViewerModule,
    WaicatoProcessFichaCRUDModule,
    WaicatoProcessFichaFormsModule,
    WaicatoProcessFichaInstancesModule,
    WaicatoProcessFichaViewModule,
    WaicatoProcessListModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProcessFichaCRUDComponent, ProcessFichaWrappersComponent, ProcessFichaListIndexComponent]
})
export class FichaModule {}
