import { Component, OnInit, ViewEncapsulation, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEMPLATE_DEFAULT_COMPONENT, GET_DEFAULT_APP } from './app-utils';
import { TEMPLATE_LIST } from '../../apps/templates-settings.module';
import { ActivatedRoute, Router } from '@angular/router';

interface TemplateConfig {
  [key: string]: () => Promise<Type<any>>;
}

@Component({
  selector: 'template-core',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="isLoading">Loading template...</ng-container>
    <ng-container *ngComponentOutlet="currentTemplate"></ng-container>
  `,
  encapsulation: ViewEncapsulation.None
})
export class TemplateDinamicLoaderComponent implements OnInit {
  private templateConfig;
  private templateCache: { [key: string]: Type<any> } = {};

  currentTemplate: Type<any> | null = null;
  isLoading = false;
  templateComponent;
  templateID;

  constructor ( public router: Router, public route: ActivatedRoute ) {  
  }

  async ngOnInit() {
    this.route.url.subscribe( async (x) => {
      // home redirects to app's default page
      if ( x[0]?.path === 'home' ) {
        const default_app = GET_DEFAULT_APP();
        if ( default_app?.app ) {
          this.router.navigate( ['/' + default_app.app]);
        }
        return;
      }

      // de la url tomamos el módulo a cargar (ex. login) y si no se encuentra se usa el x defecto
      this.templateComponent = x.length > 0 && x[0].path ? x[0].path : 'base';

      // solicitamos cargar el template
      const default_template = TEMPLATE_LIST.find(app => app['default'] === true) || TEMPLATE_DEFAULT_COMPONENT;

      this.templateID = default_template.id;
      await this.loadTemplate(this.templateID);
    })
  }

  async loadTemplate(templateKey: string) {
    this.isLoading = true;
    this.templateConfig = this.getDinamicTemplate();
    try {
      if (this.templateCache[templateKey]) {
        this.currentTemplate = this.templateCache[templateKey];
      } else if (this.templateConfig[templateKey]) {
        const componentType = await this.templateConfig[templateKey]();
        this.templateCache[templateKey] = componentType;
        this.currentTemplate = componentType;
      } else {
        throw new Error(`Template ${templateKey} not found`);
      }
    } catch (error) {
      console.error(`Failed to load template ${templateKey}:`, error);
      this.currentTemplate = null;
    } finally {
      this.isLoading = false;
    }
  }

  getDinamicTemplate() {
    const tc = this.templateID !== 'default' 
                ? { [this.templateID]: TEMPLATE_LIST.find(c => c['id'] === this.templateID)[this.templateComponent] }
                : { [this.templateID]: TEMPLATE_DEFAULT_COMPONENT[this.templateComponent] }

    const dynamicTemplateConfig: TemplateConfig = Object.keys(tc).reduce((config, key) => {
      config[key] = async () => {
        return tc[key]; // Return the component directly
      };
      return config;
    }, {});

    return dynamicTemplateConfig;
  }

  
}