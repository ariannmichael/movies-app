import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { TMDBService } from '../../core/services/tmdb.service';
import { MediaItem } from '../../core/models/search.model';
import { MediaListComponent } from '../../shared/media-list/media-list.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { FilterComponent } from '../../shared/filter/filter.component';


@Component({
  selector: 'app-tv-show-list',
  standalone: true,
  imports: [
    CommonModule, 
    MediaListComponent, 
    MovieCardComponent, 
    MatPaginatorModule, 
    MatProgressSpinnerModule,
    FilterComponent
  ],
  templateUrl: './tv-show-list.component.html',
  styleUrl: './tv-show-list.component.scss'
})
export class TvShowListComponent {
  tvShows = signal<MediaItem[]>([]);
  totalTvShows = signal(0);
  pageSize = 20;
  currentPage = 1;
  isLoading = signal(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tmdbService: TMDBService) {
    this.loadTvShows();
  }

  loadTvShows() {
    this.isLoading.set(true);
    this.tmdbService.getPopularTv(this.currentPage).subscribe({
      next: (res) => {
        this.tvShows.set(res.results);
        this.totalTvShows.set(res.total_results);
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
    this.loadTvShows();
  }
}
