import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)},
  {path: 'reports', loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent)},
  {path: 'games', loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent)},
];
