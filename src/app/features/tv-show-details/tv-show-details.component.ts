import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TMDBService, TVShowDetails } from '../../core/services/tmdb.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.scss']
})
export class TvShowDetailsComponent {
  show = signal<TVShowDetails | null>(null);
  isLoading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService
  ) {
    this.route.params.subscribe(params => {
      this.loadShow(params['id']);
    });
  }

  loadShow(id: string) {
    this.isLoading.set(true);
    this.tmdbService.getTVShowDetails(id).subscribe({
      next: (show: TVShowDetails) => {
        this.show.set(show);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        console.error('Error loading TV show details:', error);
        this.isLoading.set(false);
      }
    });
  }

  getYear(date: string): string {
    return date ? new Date(date).getFullYear().toString() : '';
  }

  getCreators(show: TVShowDetails): string {
    if (show.created_by?.length) {
      return show.created_by.map(creator => creator.name).join(', ');
    }
    return '';
  }

  getTopCast(show: TVShowDetails) {
    return show.credits?.cast?.slice(0, 6) || [];
  }

  getFeaturedCrew(show: TVShowDetails) {
    if (!show.credits?.crew) return [];
    
    const importantRoles = ['Director', 'Producer', 'Executive Producer', 'Writer'];
    return show.credits.crew
      .filter((person: { job: string }) => importantRoles.includes(person.job))
      .slice(0, 6);
  }
} 