import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TMDBService } from '../../core/services/tmdb.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../core/models/search.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  query = '';
  movies = signal<Movie[]>([]);

  constructor(private tmdbService: TMDBService) {}

  search() {
    if (!this.query) return;
    this.tmdbService.searchMovies(this.query).subscribe(res => {
      this.movies.set(res.results);
    });
  }
}