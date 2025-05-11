import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ConfigurationComponent} from './pages/configuration/configuration.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)},
  {path: 'reports', loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent)},
  {path: 'config', loadComponent: () => import('./pages/configuration/configuration.component').then(m => m.ConfigurationComponent)},
];
