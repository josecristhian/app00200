import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'header-template',
    standalone: true,
    imports: [CommonModule, RouterModule],
    providers: [],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateHeaderComponent {
}
