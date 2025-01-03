import { Component, ViewEncapsulation } from '@angular/core';
import {CommonModule} from '@angular/common';
import _ from 'underscore';
import { RouterModule } from '@angular/router';
import { Theme00100_Private_BaseComponent } from '../base/base.component';

@Component({
	selector: 'theme00100-private',
	standalone: true,
	imports: [CommonModule, RouterModule, Theme00100_Private_BaseComponent],
	providers: [],
	template: `<theme00100-private-base><router-outlet #child="outlet"></router-outlet></theme00100-private-base>`,
	styles: '',
	encapsulation: ViewEncapsulation.None
})

export class Theme00100_Private_Component {
}
