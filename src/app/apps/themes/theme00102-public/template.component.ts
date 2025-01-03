import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateHeaderComponent } from './header/header.component';
import { TemplateFooterComponent } from './footer/footer.component';

@Component({
	selector: 'theme00102-public',
	standalone: true,
	imports: [CommonModule, RouterModule, TemplateHeaderComponent, TemplateFooterComponent],
	providers: [],
	template: `
		<header-template></header-template>
		<main class="main-content"><router-outlet #child="outlet"></router-outlet></main>
		<footer-template></footer-template>
	`,
	styles : '.container { max-width: 960px; }; .main-content { display: flex; justify-content: center; margin-top: 2px; }',
	encapsulation: ViewEncapsulation.None
})

export class Theme00102_Public_Component {
}
