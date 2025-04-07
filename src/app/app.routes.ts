import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MovieDetailsComponent } from './features/movie-details/movie-details.component';
import { MovieListComponent } from './features/movie-list/movie-list.component';
import { TvShowListComponent } from './features/tv-show-list/tv-show-list.component';
import { SearchComponent } from './features/search/search.component';
import { TvShowDetailsComponent } from './features/tv-show-details/tv-show-details.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'tv/:id', component: TvShowDetailsComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'tv-shows', component: TvShowListComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '' },
];