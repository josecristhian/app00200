import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'footer-template',
    standalone: true,
    imports: [CommonModule, RouterModule],
    providers: [],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateFooterComponent {
}
