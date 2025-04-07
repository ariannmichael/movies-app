import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaItem } from '../../core/models/search.model';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  const mockMovie: MediaItem = {
    id: 1,
    title: 'Test Movie',
    backdrop_path: '/backdrop.jpg',
    poster_path: '/poster.jpg',
    overview: 'Test Overview',
    genre_ids: [1, 2],
    vote_average: 7.5,
    release_date: '2023-01-01',
    adult: false,
    original_language: 'en',
    original_title: 'Test Movie',
    popularity: 100,
    video: false,
    vote_count: 1000
  };

  const mockTvShow: MediaItem = {
    id: 2,
    name: 'Test TV Show',
    backdrop_path: '/backdrop2.jpg',
    poster_path: '/poster2.jpg',
    overview: 'Test Overview 2',
    genre_ids: [3, 4],
    vote_average: 8.5,
    first_air_date: '2023-02-01',
    release_date: '',
    adult: false,
    original_language: 'en',
    original_title: 'Test TV Show',
    popularity: 200,
    video: false,
    vote_count: 2000
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.item = mockMovie;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get correct year for movie', () => {
    component.item = mockMovie;
    fixture.detectChanges();
    expect(component.getYear()).toBe('2023');
  });

  it('should get correct year for TV show', () => {
    component.item = mockTvShow;
    fixture.detectChanges();
    expect(component.getYear()).toBe('2023');
  });

  it('should get correct year when no date is provided', () => {
    component.item = { ...mockMovie, release_date: '', first_air_date: '' };
    expect(component.getYear()).toBe('');
  });

  it('should determine media type correctly', () => {
    component.item = mockMovie;
    expect(component.getMediaType()).toBe('movie');

    component.item = mockTvShow;
    expect(component.getMediaType()).toBe('tv');
  });

  it('should get correct title for movie', () => {
    component.item = mockMovie;
    expect(component.getTitle()).toBe('Test Movie');
  });

  it('should get correct title for TV show', () => {
    component.item = mockTvShow;
    expect(component.getTitle()).toBe('Test TV Show');
  });

  it('should get empty string when no title or name is provided', () => {
    component.item = { ...mockMovie, title: undefined, name: undefined };
    expect(component.getTitle()).toBe('');
  });

  it('should generate correct router link', () => {
    component.item = mockMovie;
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement.querySelector('.movie-card');
    expect(cardElement.getAttribute('ng-reflect-router-link')).toBe('/movie,1');

    component.item = mockTvShow;
    fixture.detectChanges();
    expect(cardElement.getAttribute('ng-reflect-router-link')).toBe('/tv,2');
  });
});
