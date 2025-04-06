import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { TMDBService } from '../../core/services/tmdb.service';

@Component({
  selector: 'app-tv-show-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './tv-show-list.component.html',
  styleUrl: './tv-show-list.component.scss'
})
export class TvShowListComponent {
  tvShows = signal<any[]>([]);

  constructor(private tmdbService: TMDBService) {
    this.tmdbService.getPopularTv().subscribe(res => {
      console.log(res);
      
      this.tvShows.set(res.results);
    });
  }
}
