import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../core/models/search.model';

@Component({
  selector: 'app-trending-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-carousel.component.html',
  styleUrl: './trending-carousel.component.scss'
})
export class TrendingCarouselComponent {
  @Input() movies: Movie[] = [];
  currentIndex = signal(0);
  isLoaded = signal(false);
  intervalId: any;

  ngOnInit(): void {
    this.preloadImages().then(() => {
      this.isLoaded.set(true);
      this.intervalId = setInterval(() => this.next(), 5000);
    });    
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  preloadImages(): Promise<void> {
    const promises = this.movies.map(item => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = 'https://image.tmdb.org/t/p/original' + item.backdrop_path;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(true);
      });
    });
    return Promise.all(promises).then(() => {});
  }

  next() {
    this.currentIndex.update(i => (i + 1) % this.movies.length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.movies.length) % this.movies.length);
  }

  select(index: number) {
    this.currentIndex.set(index);
  }  

  currentItem = computed(() => this.movies[this.currentIndex()]);
}
