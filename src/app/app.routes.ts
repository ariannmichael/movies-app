import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { MovieDetailsComponent } from './modules/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: '**', redirectTo: '' },
];