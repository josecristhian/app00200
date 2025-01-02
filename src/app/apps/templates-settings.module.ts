import { Tmpl00100_Private_Component } from './templates/tmpl00100-private/main/main.component';
import { Tmpl00100_Private_Login_Component } from './templates/tmpl00100-private/login/login.component';

import { Tmpl00101_Public_Component } from './templates/tmpl00101-public/main/main.component';
import { Tmpl00102_Public_Component } from './templates/tmpl00102-public/template.component';

export const TEMPLATE_LIST = [
    { id: 'tmpl00100-private', default: true, base: Tmpl00100_Private_Component, login: Tmpl00100_Private_Login_Component },
    { id: 'tmpl00101-public', default: false, base: Tmpl00101_Public_Component },
    { id: 'tmpl00102-public', default: false, base: Tmpl00102_Public_Component }
];
