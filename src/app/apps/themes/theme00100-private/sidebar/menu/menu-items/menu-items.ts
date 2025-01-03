import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  parametros: string;
  color?: string;
  type?: string;
  label?: string;
  app?: string;
}

export interface Menu {
  state: string;
  name: string;
  parametros: string;
  type: string;
  icon: string;
  color?: string;
  label?: string;
  app?: string;
  children?: ChildrenItems[];
}

const MENUITEMSBASE = [
];

let MENUITEMS = MENUITEMSBASE;

@Injectable()
export class MenuItems {
   getAll(): Menu[] {
      return MENUITEMS;
   }
   add(menu: any) {
      MENUITEMS.push(menu);
   }
   clear() {
      MENUITEMS = [];
   }
}
