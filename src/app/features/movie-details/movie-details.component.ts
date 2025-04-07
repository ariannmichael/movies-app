import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TMDBService, MovieDetails } from '../../core/services/tmdb.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  movie = signal<MovieDetails | null>(null);
  isLoading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService
  ) {
    this.route.params.subscribe(params => {
      this.loadMovie(params['id']);
    });
  }

  loadMovie(id: string) {
    this.isLoading.set(true);
    this.tmdbService.getMovieDetails(id).subscribe({
      next: (movie: MovieDetails) => {
        this.movie.set(movie);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        console.error('Error loading movie details:', error);
        this.isLoading.set(false);
      }
    });
  }

  getYear(date: string): string {
    return date ? new Date(date).getFullYear().toString() : '';
  }

  getDirectors(movie: MovieDetails): string {
    if (movie.credits?.crew) {
      const directors = movie.credits.crew
        .filter(person => person.job === 'Director')
        .map(person => person.name);
      return directors.join(', ');
    }
    return '';
  }

  getTopCast(movie: MovieDetails) {
    return movie.credits?.cast?.slice(0, 6) || [];
  }

  getFeaturedCrew(movie: MovieDetails) {
    if (!movie.credits?.crew) return [];
    
    const importantRoles = ['Director', 'Screenplay', 'Story'];
    return movie.credits.crew
      .filter(person => importantRoles.includes(person.job))
      .slice(0, 6);
  }
}