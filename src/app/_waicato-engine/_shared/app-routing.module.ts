import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

export function isCommonPrivateRoute(route: UrlSegment[]) {
  const url = route.map(segment => segment.path).join('/');
  return common_private_routes.some(item => item.path === url);
}

const common_private_routes: Routes = [
  { path: 'auth', loadComponent: () => import ('./logged_info/logged-info.component').then ( m => m.LoggedInfoComponent) },
  { path: 'status', loadComponent: () => import('./status/status.component').then(m => m.StatusPageComponent) },
  { path: 'logout', loadComponent: () => import ('./auth/auth.component').then ( m => m.LogoutComponent) }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(common_private_routes)],
  exports: [RouterModule],
  declarations: []
})
export class CommonPrivateRoutingModule {}
