import { Component, signal } from '@angular/core';
import { TMDBService } from '../../core/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { MediaListComponent } from '../../shared/media-list/media-list.component';
import { PageEvent } from '@angular/material/paginator';
import { Movie } from '../../core/models/search.model';
import { FilterComponent, FilterCriteria } from '../../shared/filter/filter.component';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MediaListComponent, FilterComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies = signal<Movie[]>([]);
  totalMovies = signal(0);
  pageSize = 20;
  currentPage = 1;
  isLoading = signal(false);

  constructor(private tmdbService: TMDBService) {
    this.loadMovies();
  }

  loadMovies() {
    this.isLoading.set(true);
    this.tmdbService.getPopularMovies(this.currentPage).subscribe({
      next: (res) => {
        this.movies.set(res.results);
        this.totalMovies.set(res.total_results);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.isLoading.set(false);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.loadMovies();
  }

  onFilterChange(filterCriteria: FilterCriteria) {
    this.tmdbService.discoverMovies(this.currentPage, filterCriteria).subscribe({
      next: (res) => {
        this.movies.set(res.results);
        this.totalMovies.set(res.total_results);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.isLoading.set(false);
      }
    });
  }
}
