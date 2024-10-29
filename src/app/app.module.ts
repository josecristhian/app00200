import { NgModule } from '@angular/core';
import { WaicatoMainComponent} from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { WaicatoMainEngineModule } from './_waicato-engine/engine.module';

const routes: Routes = [
    // aquí mis rutas

    // core
    { path: '', loadChildren: () => import('./_waicato-engine/_routing/core-routing.module').then(m => m.CoreRoutingModule) },
   
];

@NgModule({
	imports: [
		WaicatoMainEngineModule,
		RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
	],
	declarations: [WaicatoMainComponent],
	bootstrap: [WaicatoMainComponent]
})
export class WaicatoAppModule { }
