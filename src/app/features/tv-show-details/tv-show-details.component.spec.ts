import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowDetailsComponent } from './tv-show-details.component';
import { ActivatedRoute } from '@angular/router';
import { TMDBService, TVShowDetails } from '../../core/services/tmdb.service';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('TvShowDetailsComponent', () => {
  let component: TvShowDetailsComponent;
  let fixture: ComponentFixture<TvShowDetailsComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TMDBService>;

  const mockTVShow: TVShowDetails = {
    id: 1,
    name: 'Test TV Show',
    backdrop_path: '/backdrop.jpg',
    poster_path: '/poster.jpg',
    overview: 'Test Overview',
    genres: [{ id: 1, name: 'Drama' }],
    vote_average: 8.5,
    first_air_date: '2024-01-01',
    created_by: [
      { id: 1, name: 'Creator 1' },
      { id: 2, name: 'Creator 2' }
    ],
    status: 'Returning Series',
    tagline: 'Test Tagline',
    credits: {
      cast: [
        { id: 1, name: 'Actor 1', profile_path: '/actor1.jpg', character: 'Character 1' },
        { id: 2, name: 'Actor 2', profile_path: '/actor2.jpg', character: 'Character 2' }
      ],
      crew: [
        { id: 3, name: 'Crew 1', profile_path: '/crew1.jpg', job: 'Director', department: 'Directing' },
        { id: 4, name: 'Crew 2', profile_path: '/crew2.jpg', job: 'Writer', department: 'Writing' }
      ]
    }
  };

  beforeEach(async () => {
    const tmdbSpy = jasmine.createSpyObj('TMDBService', ['getTVShowDetails']);
    tmdbSpy.getTVShowDetails.and.returnValue(of(mockTVShow));

    await TestBed.configureTestingModule({
      imports: [TvShowDetailsComponent, MatProgressSpinnerModule],
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
    fixture = TestBed.createComponent(TvShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load TV show details on init', () => {
    expect(tmdbServiceSpy.getTVShowDetails).toHaveBeenCalledWith('1');
    expect(component.show()).toEqual(mockTVShow);
    expect(component.isLoading()).toBeFalse();
  });

  it('should get top cast members', () => {
    const topCast = component.getTopCast(mockTVShow);
    expect(topCast.length).toBe(2);
    expect(topCast[0].name).toBe('Actor 1');
    expect(topCast[1].name).toBe('Actor 2');
  });

  it('should get featured crew members', () => {
    const featuredCrew = component.getFeaturedCrew(mockTVShow);
    expect(featuredCrew.length).toBe(2);
    expect(featuredCrew[0].name).toBe('Crew 1');
    expect(featuredCrew[0].job).toBe('Director');
    expect(featuredCrew[1].name).toBe('Crew 2');
    expect(featuredCrew[1].job).toBe('Writer');
  });

  it('should handle empty credits', () => {
    const showWithoutCredits = { ...mockTVShow, credits: { cast: [], crew: [] } };
    expect(component.getTopCast(showWithoutCredits)).toEqual([]);
    expect(component.getFeaturedCrew(showWithoutCredits)).toEqual([]);
  });

  it('should handle missing credits', () => {
    const showWithoutCredits = { ...mockTVShow };
    showWithoutCredits.credits = undefined as any;
    expect(component.getTopCast(showWithoutCredits)).toEqual([]);
    expect(component.getFeaturedCrew(showWithoutCredits)).toEqual([]);
  });
}); 