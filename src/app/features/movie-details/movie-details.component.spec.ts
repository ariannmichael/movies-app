import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { ActivatedRoute } from '@angular/router';
import { TMDBService, MovieDetails } from '../../core/services/tmdb.service';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TMDBService>;

  const mockMovie: MovieDetails = {
    id: 1,
    title: 'Test Movie',
    backdrop_path: '/backdrop.jpg',
    poster_path: '/poster.jpg',
    overview: 'Test Overview',
    genres: [{ id: 1, name: 'Action' }],
    vote_average: 8.5,
    release_date: '2023-01-01',
    status: 'Released',
    tagline: 'Test Tagline',
    credits: {
      cast: [
        { id: 1, name: 'Actor 1', profile_path: '/actor1.jpg', character: 'Character 1' },
        { id: 2, name: 'Actor 2', profile_path: '/actor2.jpg', character: 'Character 2' }
      ],
      crew: [
        { id: 3, name: 'Crew 1', profile_path: '/crew1.jpg', job: 'Director', department: 'Directing' },
        { id: 4, name: 'Crew 2', profile_path: '/crew2.jpg', job: 'Screenplay', department: 'Writing' },
        { id: 5, name: 'Crew 3', profile_path: '/crew3.jpg', job: 'Story', department: 'Writing' }
      ]
    }
  };

  beforeEach(async () => {
    const tmdbSpy = jasmine.createSpyObj('TMDBService', ['getMovieDetails']);
    tmdbSpy.getMovieDetails.and.returnValue(of(mockMovie));

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent, MatProgressSpinnerModule],
      providers: [
        { provide: TMDBService, useValue: tmdbSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    }).compileComponents();

    tmdbServiceSpy = TestBed.inject(TMDBService) as jasmine.SpyObj<TMDBService>;
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie details on init', () => {
    expect(tmdbServiceSpy.getMovieDetails).toHaveBeenCalledWith('1');
    expect(component.movie()).toEqual(mockMovie);
    expect(component.isLoading()).toBeFalse();
  });

  it('should get top cast members', () => {
    const topCast = component.getTopCast(mockMovie);
    expect(topCast.length).toBe(2);
    expect(topCast[0].name).toBe('Actor 1');
    expect(topCast[1].name).toBe('Actor 2');
  });

  it('should get featured crew members', () => {
    const featuredCrew = component.getFeaturedCrew(mockMovie);
    expect(featuredCrew.length).toBe(3);
    expect(featuredCrew[0].name).toBe('Crew 1');
    expect(featuredCrew[0].job).toBe('Director');
    expect(featuredCrew[1].name).toBe('Crew 2');
    expect(featuredCrew[1].job).toBe('Screenplay');
    expect(featuredCrew[2].name).toBe('Crew 3');
    expect(featuredCrew[2].job).toBe('Story');
  });

  it('should handle empty credits', () => {
    const movieWithoutCredits = { ...mockMovie, credits: { cast: [], crew: [] } };
    expect(component.getTopCast(movieWithoutCredits)).toEqual([]);
    expect(component.getFeaturedCrew(movieWithoutCredits)).toEqual([]);
  });

  it('should handle missing credits', () => {
    const movieWithoutCredits = { ...mockMovie };
    movieWithoutCredits.credits = undefined as any;
    expect(component.getTopCast(movieWithoutCredits)).toEqual([]);
    expect(component.getFeaturedCrew(movieWithoutCredits)).toEqual([]);
  });

  it('should get release year', () => {
    fixture.detectChanges();
    expect(component.getYear(mockMovie.release_date)).toBe('2023');
  });

  it('should handle missing release date', () => {
    fixture.detectChanges();
    expect(component.getYear('')).toBe('');
  });
}); 