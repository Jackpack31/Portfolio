import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills').then(m => m.Skills)
  },
  {
    path: 'projekte',
    loadComponent: () => import('./pages/projects/projects').then(m => m.Projects)
  },
  {
    path: '3d-druck',
    loadComponent: () => import('./pages/hobbies/hobbies').then(m => m.Hobbies)
  },
  {
  path: 'impressum',
  loadComponent: () => import('./pages/impressum/impressum').then(m => m.Impressum)
},
  { path: '**', redirectTo: '' }
];