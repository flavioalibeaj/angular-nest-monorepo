import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { createProfileGuard } from './home/guards/create-profile.guard';

export const routes: Routes = [
  {
    path: 'auth',
    data: { openWhenAuthenticated: false },
    canActivate: [authGuard],
    loadChildren: () => import('./auth/auth.routes').then((r) => r.authRoutes),
  },
  {
    path: '',
    data: {
      openWhenAuthenticated: true,
      openWithProfileId: true,
    },
    canActivate: [authGuard, createProfileGuard],
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    loadChildren: () => import('./home/home.routes').then((r) => r.homeRoutes),
  },
  {
    path: 'create-profile',
    canActivate: [authGuard, createProfileGuard],
    data: {
      openWhenAuthenticated: true,
      openWithProfileId: false,
    },
    loadComponent: () =>
      import('./create-profile/create-profile.component').then(
        (c) => c.CreateProfileComponent
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
