import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaItem } from '../../core/models/search.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() item!: MediaItem;

  getYear(): string {
    const date = this.item.release_date || this.item.first_air_date;
    return date ? new Date(date).getFullYear().toString() : '';
  }
}
