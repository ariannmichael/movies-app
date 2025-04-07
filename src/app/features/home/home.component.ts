import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { TMDBService } from '../../core/services/tmdb.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MediaItem } from '../../core/models/search.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MatTabsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  trendingMovies = signal<MediaItem[]>([]);
  popularMovies = signal<MediaItem[]>([]);
  featuredItem = signal<MediaItem | null>(null);
  currentIndex = signal(0);

  constructor(private tmdbService: TMDBService) {
    this.loadTrendingMovies();
    this.loadPopularMovies();
  }

  loadTrendingMovies() {
    this.tmdbService.getTrendingMovies().subscribe({
      next: (res) => {
        this.trendingMovies.set(res.results);
        if (!this.featuredItem()) {
          this.featuredItem.set(res.results[0]);
        }
      },
      error: (error) => console.error('Error loading trending movies:', error)
    });
  }

  loadPopularMovies() {
    this.tmdbService.getPopularMovies().subscribe({
      next: (res) => {
        this.popularMovies.set(res.results);
      },
      error: (error) => console.error('Error loading popular movies:', error)
    });
  }

  changeFeatured(index: number) {
    const items = this.trendingMovies();
    if (items.length > index) {
      this.featuredItem.set(items[index]);
      this.currentIndex.set(index);
    }
  }

  getGenres(genreIds: number[]): string {
    // TODO: Implement genre mapping
    return 'Action, Adventure, Fantasy';
  }
}