import { Component, signal } from '@angular/core';
import { TMDBService } from '../../core/services/tmdb.service';
import { Movie } from '../../core/models/search.model';
import { TrendingCarouselComponent } from '../../shared/trending/trending-carousel/trending-carousel.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, TrendingCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  query = '';
  trendingMovies = signal<Movie[]>([]);
  movies = signal<Movie[]>([]);

  constructor(private tmdbService: TMDBService) {}

  ngOnInit() {
    this.tmdbService.getTrendingMovies().subscribe(res => {      
      this.trendingMovies.set(res.results);
    });
  }

  search() {
    if (!this.query) return;
    this.tmdbService.getTrendingMovies().subscribe(res => {
      this.trendingMovies.set(res.results);
    });
  }
}