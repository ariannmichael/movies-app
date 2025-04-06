import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MediaListComponent } from '../../shared/media-list/media-list.component';
import { TMDBService } from '../../core/services/tmdb.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MediaItem } from '../../core/models/search.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MediaListComponent, MatButtonToggleModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  mediaType = 'movie';
  searchQuery = '';
  currentPage = 1;
  results = signal<MediaItem[]>([]);
  totalResults = signal(0);
  isLoading = signal(false);

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService
  ) {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.search();
    });
  }

  search() {
    if (!this.searchQuery) return;
    
    this.isLoading.set(true);
    if (this.mediaType === 'movie') {
      this.tmdbService.searchMovies(this.searchQuery, this.currentPage).subscribe({
        next: (res) => {
          this.results.set(res.results);
          this.totalResults.set(res.total_results);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error searching movies:', error);
          this.isLoading.set(false);
        }
      });
    } else {      
      this.tmdbService.searchTVShows(this.searchQuery, this.currentPage).subscribe({
        next: (res) => {
          this.results.set(res.results);
          this.totalResults.set(res.total_results);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error searching TV shows:', error);
          this.isLoading.set(false);
        }
      });
    }
  }

  onMediaTypeChange() {
    this.currentPage = 1;
    this.search();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.search();
  }
}
