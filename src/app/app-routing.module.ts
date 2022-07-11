import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component'

export const APP_ROUTES: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent }
];
