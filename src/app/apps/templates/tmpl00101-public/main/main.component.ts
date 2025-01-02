import { Component, ViewEncapsulation } from '@angular/core';
import {CommonModule} from '@angular/common';
import _ from 'underscore';
import { RouterModule } from '@angular/router';
import { Tmpl00101_Public_BaseComponent } from '../base/base.component';

@Component({
	selector: 'tmpl00101-public',
	standalone: true,
	imports: [CommonModule, RouterModule, Tmpl00101_Public_BaseComponent],
	providers: [],
	template: `<tmpl00101-public-base><router-outlet #child="outlet"></router-outlet></tmpl00101-public-base>`,
	styles: '',
	encapsulation: ViewEncapsulation.None
})

export class Tmpl00101_Public_Component {
}
