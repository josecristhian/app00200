import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<img src='assets/waicato/img/404.jpeg' width="100%"><button class="button btn btn-primary" [routerLink]="['/home']">Volver</button>`,
  styles: `.button { position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); padding: 10px 20px; }`
})
export class NotFoundPageComponent {
 
}
