import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MediaItem } from '../../core/models/search.model';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss'
})
export class MediaListComponent {
  @Input() mediaItems: MediaItem[] = [];
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 20;
  @Input() currentPage: number = 1;
  @Input() isLoading: boolean = false;

  @Output() pageChange = new EventEmitter<PageEvent>();
}
