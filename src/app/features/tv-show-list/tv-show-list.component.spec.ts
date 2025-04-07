import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowListComponent } from './tv-show-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TMDBService } from '../../core/services/tmdb.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TvShowListComponent', () => {
  let component: TvShowListComponent;
  let fixture: ComponentFixture<TvShowListComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TMDBService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TMDBService', ['getPopularTv', 'discoverTV']);
    spy.getPopularTv.and.returnValue(of({ page: 1, results: [], total_pages: 0, total_results: 0 }));
    spy.discoverTV.and.returnValue(of({ page: 1, results: [], total_pages: 0, total_results: 0 }));

    await TestBed.configureTestingModule({
      imports: [
        TvShowListComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TMDBService, useValue: spy }
      ]
    }).compileComponents();

    tmdbServiceSpy = TestBed.inject(TMDBService) as jasmine.SpyObj<TMDBService>;
    fixture = TestBed.createComponent(TvShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
