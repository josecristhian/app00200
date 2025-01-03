import { Theme00100_Private_Component } from './themes/theme00100-private/main/main.component';
import { Theme00100_Private_Login_Component } from './themes/theme00100-private/login/login.component';

import { Theme00101_Public_Component } from './themes/theme00101-public/main/main.component';
import { Theme00102_Public_Component } from './themes/theme00102-public/template.component';

export const TEMPLATE_LIST = [
    { id: 'theme00100-private', default: true, base: Theme00100_Private_Component, login: Theme00100_Private_Login_Component },
    { id: 'theme00101-public', default: false, base: Theme00101_Public_Component },
    { id: 'theme00102-public', default: false, base: Theme00102_Public_Component }
];
