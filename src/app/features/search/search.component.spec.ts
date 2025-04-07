import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TMDBService } from '../../core/services/tmdb.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TMDBService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TMDBService', ['searchMovies', 'searchTVShows']);
    spy.searchMovies.and.returnValue(of({ page: 1, results: [], total_pages: 0, total_results: 0 }));
    spy.searchTVShows.and.returnValue(of({ page: 1, results: [], total_pages: 0, total_results: 0 }));

    await TestBed.configureTestingModule({
      imports: [
        SearchComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: TMDBService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ query: 'test' })
          }
        }
      ]
    }).compileComponents();

    tmdbServiceSpy = TestBed.inject(TMDBService) as jasmine.SpyObj<TMDBService>;
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
