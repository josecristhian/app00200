import { Component, ViewEncapsulation } from '@angular/core';
import {CommonModule} from '@angular/common';
import _ from 'underscore';
import { RouterModule } from '@angular/router';
import { Tmpl00100_Private_BaseComponent } from '../base/base.component';

@Component({
	selector: 'tmpl00100-private',
	standalone: true,
	imports: [CommonModule, RouterModule, Tmpl00100_Private_BaseComponent],
	providers: [],
	template: `<tmpl00100-private-base><router-outlet #child="outlet"></router-outlet></tmpl00100-private-base>`,
	styles: '',
	encapsulation: ViewEncapsulation.None
})

export class Tmpl00100_Private_Component {
}
