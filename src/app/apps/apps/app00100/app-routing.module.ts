import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    { path: 'data/:formname', loadChildren: () => import('./modules/forms/form-data.component').then(m => m.FormDataRoutes) },
    { path: 'view/:idView/:formname', loadChildren: () => import('./modules/forms/form-view.component').then(m => m.FormViewRoutes) },
    { path: 'mgtm', loadComponent: () => import('./modules/forms/form-entities.component').then(m => m.FormEntitiesComponent) },
    { path: 'mgtm/:formname', loadChildren: () => import('./modules/forms/form-data.component').then(m => m.FormDataRoutes) },
    { path: 'workflows/:id/forms/:formname', loadChildren: () => import('./modules/forms/form-data.component').then(m => m.FormDataRoutes) },
    { path: 'workflows', loadChildren: () => import('./modules/processes/ficha/ficha.module').then(m => m.FichaModule) },
    { path: 'my', loadChildren: () => import('./modules/processes/my/process-my.module').then(m => m.ProcessMyModule) },
    { path: 'my/reports', loadComponent: () => import('./modules/analytics/myreports.component').then(m => m.MyreportsComponent) },
    { path: 'dmn', loadComponent: () => import('./modules/processes/rules/rules.component').then(m => m.RulesComponent) },
    { path: 'analytics/reporting/:id', loadComponent: () => import('./modules/analytics/reporting.component').then(m => m.ReportingComponent) },
    { path: 'templates', loadComponent: () => import('./modules/tools/plugin.component').then(m => m.PluginComponent) },
    { path: 'bpmn/viewer', loadComponent: () => import('./modules/tools/bpmn-viewer.component').then(m => m.ViewerComponent) },
    { path: 'bpmn/modeler', loadComponent: () => import('./modules/tools/bpmn-modeler.component').then(m => m.ModelerComponent) },          
    { path: 'utils/bpmndiff', loadComponent: () => import('./modules/tools/bpmn-diff.component').then(m => m.BpmndiffComponent) },
    { path: 'utils/bpmnmodeler', loadComponent: () => import('./modules/tools/bpmn-modeler.component').then(m => m.ModelerComponent) },
    { path: 'utils/bpmnviewer', loadComponent: () => import('./modules/tools/bpmn-viewer.component').then(m => m.ViewerComponent) },
    { path: 'utils/charts', loadComponent: () => import('./modules/tools/charts-test.component').then(m => m.ChartsTestComponent) },
    { path: 'utils/formbuilder', loadComponent: () => import('./modules/tools/form-builder.component').then(m => m.FormbuilderComponent) },
    { path: 'utils/import', loadComponent: () => import('./modules/tools/import-data.component').then(m => m.ImportDataComponent) },
    { path: '**', redirectTo: 'home' }  // Handle wildcard
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
