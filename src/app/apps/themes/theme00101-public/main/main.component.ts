import { Component, ViewEncapsulation } from '@angular/core';
import {CommonModule} from '@angular/common';
import _ from 'underscore';
import { RouterModule } from '@angular/router';
import { Theme00101_Public_BaseComponent } from '../base/base.component';

@Component({
	selector: 'theme00101-public',
	standalone: true,
	imports: [CommonModule, RouterModule, Theme00101_Public_BaseComponent],
	providers: [],
	template: `<theme00101-public-base><router-outlet #child="outlet"></router-outlet></theme00101-public-base>`,
	styles: '',
	encapsulation: ViewEncapsulation.None
})

export class Theme00101_Public_Component {
}
