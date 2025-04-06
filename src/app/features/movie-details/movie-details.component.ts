import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TMDBService } from '../../core/services/tmdb.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TMDBService);

  movie: any = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.tmdbService.getMovieDetails(id).subscribe(res => this.movie = res);
  }
}