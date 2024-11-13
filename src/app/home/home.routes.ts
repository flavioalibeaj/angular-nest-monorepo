import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { createProfileGuard } from './guards/create-profile.guard';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [createProfileGuard],
    data: {
      openWithProfileId: true,
    },
    children: [],
  },
  {
    path: 'create-profile',
    canActivate: [createProfileGuard],
    data: {
      openWithProfileId: false,
    },
    loadComponent: () =>
      import('./pages/create-profile/create-profile.component').then(
        (c) => c.CreateProfileComponent
      ),
  },
];
