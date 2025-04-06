import { Component, signal  } from '@angular/core';
import { TMDBService } from '../../core/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { Movie } from '../../core/models/search.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies = signal<Movie[]>([]);

  constructor(private tmdbService: TMDBService) {
    this.tmdbService.getPopularMovies().subscribe(res => {
      this.movies.set(res.results);
    });
  }
}
