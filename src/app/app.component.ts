import { Component } from '@angular/core';

@Component({
 selector: 'app-main',
 template: `
 	<waicato-engine></waicato-engine>
	<router-outlet></router-outlet>
 `
})

export class WaicatoMainComponent {}
