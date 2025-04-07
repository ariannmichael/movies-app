import { Component, signal, OnDestroy, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
  trendingMovies = signal<MediaItem[]>([]);
  popularMovies = signal<MediaItem[]>([]);
  featuredItem = signal<MediaItem | null>(null);
  currentIndex = signal(0);
  private autoRotateInterval: any;
  private readonly ROTATION_INTERVAL = 2500;

  constructor(private tmdbService: TMDBService) {
    this.loadTrendingMovies();
    this.loadPopularMovies();
  }

  ngOnInit() {
    this.startAutoRotate();
  }

  ngOnDestroy() {
    this.stopAutoRotate();
  }

  startAutoRotate() {
    this.stopAutoRotate(); // Clear any existing interval
    this.autoRotateInterval = setInterval(() => {
      const items = this.trendingMovies();
      const nextIndex = (this.currentIndex() + 1) % items.length; // Loop through actual number of items
      this.changeFeatured(nextIndex);
    }, this.ROTATION_INTERVAL);
  }

  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  loadTrendingMovies() {
    this.tmdbService.getTrendingMovies().subscribe({
      next: (res) => {
        this.trendingMovies.set(res.results);
        if (res.results.length > 0) {
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
    // Add your genre mapping logic here
    return '';
  }

  getMediaType(item: MediaItem): string {
    return item.name ? 'tv' : 'movie';
  }

  getDetailsLink(item: MediaItem): string[] {
    return ['/' + this.getMediaType(item), item.id.toString()];
  }
}