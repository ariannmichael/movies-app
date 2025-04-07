import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TMDBService } from '../../core/services/tmdb.service';
import { of } from 'rxjs';
import { MediaItem } from '../../core/models/search.model';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchResponse } from '../../core/models/search.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TMDBService>;

  const mockTrendingMovies: MediaItem[] = [
    {
      id: 1,
      title: 'Test Movie 1',
      backdrop_path: '/path1.jpg',
      poster_path: '/poster1.jpg',
      overview: 'Overview 1',
      genre_ids: [1, 2],
      vote_average: 7.5,
      release_date: '2023-01-01',
      adult: false,
      original_language: 'en',
      original_title: 'Test Movie 1',
      popularity: 100,
      video: false,
      vote_count: 1000
    },
    {
      id: 2,
      name: 'Test TV Show',
      backdrop_path: '/path2.jpg',
      poster_path: '/poster2.jpg',
      overview: 'Overview 2',
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
    }
  ];

  const mockPopularMovies: MediaItem[] = [
    {
      id: 3,
      title: 'Popular Movie 1',
      backdrop_path: '/path3.jpg',
      poster_path: '/poster3.jpg',
      overview: 'Overview 3',
      genre_ids: [5, 6],
      vote_average: 9.0,
      release_date: '2023-03-01',
      adult: false,
      original_language: 'en',
      original_title: 'Popular Movie 1',
      popularity: 300,
      video: false,
      vote_count: 3000
    }
  ];

  const mockSearchResponse: SearchResponse = {
    page: 1,
    results: mockTrendingMovies,
    total_pages: 1,
    total_results: mockTrendingMovies.length
  };

  const mockPopularResponse: SearchResponse = {
    page: 1,
    results: mockPopularMovies,
    total_pages: 1,
    total_results: mockPopularMovies.length
  };

  const emptyResponse: SearchResponse = {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0
  };

  beforeEach(async () => {
    tmdbServiceSpy = jasmine.createSpyObj('TMDBService', ['getTrendingMovies', 'getPopularMovies']);
    tmdbServiceSpy.getTrendingMovies.and.returnValue(of(mockSearchResponse));
    tmdbServiceSpy.getPopularMovies.and.returnValue(of(mockPopularResponse));

    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
      providers: [
        { provide: TMDBService, useValue: tmdbServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load trending movies on init', () => {
    expect(tmdbServiceSpy.getTrendingMovies).toHaveBeenCalled();
    expect(component.trendingMovies()).toEqual(mockTrendingMovies);
    expect(component.featuredItem()).toEqual(mockTrendingMovies[0]);
  });

  it('should load popular movies on init', () => {
    expect(tmdbServiceSpy.getPopularMovies).toHaveBeenCalled();
    expect(component.popularMovies()).toEqual(mockPopularMovies);
  });

  it('should change featured item when changeFeatured is called', () => {
    component.changeFeatured(1);
    expect(component.featuredItem()).toEqual(mockTrendingMovies[1]);
    expect(component.currentIndex()).toBe(1);
  });

  it('should determine media type correctly', () => {
    expect(component.getMediaType(mockTrendingMovies[0])).toBe('movie');
    expect(component.getMediaType(mockTrendingMovies[1])).toBe('tv');
  });

  it('should generate correct details link', () => {
    expect(component.getDetailsLink(mockTrendingMovies[0])).toEqual(['/movie', '1']);
    expect(component.getDetailsLink(mockTrendingMovies[1])).toEqual(['/tv', '2']);
  });

  it('should auto-rotate featured items', fakeAsync(() => {
    component.startAutoRotate();
    expect(component.currentIndex()).toBe(0);
    
    tick(2000); // ROTATION_INTERVAL is 2000ms
    expect(component.currentIndex()).toBe(1);
    
    tick(2000);
    expect(component.currentIndex()).toBe(0); // Should loop back to 0 since there are only 2 items
    
    tick(2000);
    expect(component.currentIndex()).toBe(1); // Should continue rotating
    
    component.stopAutoRotate();
  }));

  it('should stop auto-rotation on destroy', () => {
    spyOn(component, 'stopAutoRotate');
    component.ngOnDestroy();
    expect(component.stopAutoRotate).toHaveBeenCalled();
  });

  it('should handle empty results gracefully', () => {
    tmdbServiceSpy.getTrendingMovies.and.returnValue(of(emptyResponse));
    component.loadTrendingMovies();
    expect(component.trendingMovies()).toEqual([]);
    expect(component.featuredItem()).toBeTruthy(); // Should keep existing featured item
  });
}); 