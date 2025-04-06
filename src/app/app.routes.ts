import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { MovieDetailsComponent } from './modules/movie-details/movie-details.component';
import { MovieListComponent } from './modules/movie-list/movie-list.component';
import { TvShowListComponent } from './modules/tv-show-list/tv-show-list.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'tv-shows', component: TvShowListComponent },
  { path: '**', redirectTo: '' },
];