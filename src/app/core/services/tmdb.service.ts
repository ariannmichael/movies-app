import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { SearchResponse } from '../models/search.model';
import { DetailResponse } from '../models/detail.model';
import { FilterCriteria } from '../../shared/filter/filter.component';

@Injectable({ providedIn: 'root' })
export class TMDBService {
  private apiKey = environment.TMDBApiKey;
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchMovies(query: string, page: number = 1): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query,
        page: page.toString()
      }
    });
  }

  searchTVShows(query: string, page: number = 1): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.baseUrl}/search/tv`, {
      params: {
        api_key: this.apiKey,
        query,
        page: page.toString()
      }
    });
  }

  getMovieDetails(id: string): Observable<DetailResponse> {
    return this.http.get<DetailResponse>(`${this.baseUrl}/movie/${id}`, {
      params: { api_key: this.apiKey }
    });
  }

  getTrendingAll(): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.baseUrl}/trending/all/day?language=en-US`, {
      params: { 
        api_key: this.apiKey
      }
    });
  }

  getTrendingMovies(page: number = 1): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.baseUrl}/trending/all/day?language=en-US`, {
      params: { 
        api_key: this.apiKey,
        page: page.toString()
      }
    });
  }

  getPopularAll(): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.baseUrl}/popular/all/day?language=en-US`, {
      params: { api_key: this.apiKey }
    });
  }

  getPopularMovies(page: number = 1): Observable<SearchResponse> {
    let params: any = { 
      api_key: this.apiKey,
      page: page.toString()
    };
    
    return this.http.get<SearchResponse>(`${this.baseUrl}/movie/popular`, { params });
  }

  getPopularTv(page: number = 1): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.baseUrl}/tv/popular?language=en-US`, {
      params: { 
        api_key: this.apiKey,
        page: page.toString()
      }
    });
  }

  discoverMovies(page: number = 1, filters: FilterCriteria): Observable<SearchResponse> {
    let params: any = {
      api_key: this.apiKey,
      page: page.toString()
    };

    if (filters) {
      if (filters.genres.length) params.with_genres = filters.genres.join(',');
      if (filters.certifications.length) {
        params.certification = filters.certifications.join('|');
        params.certification_country = 'US'
      }
      if (filters.language) params.language = filters.language;
      if (filters.userScore) params['vote_average.gte'] = filters.userScore;
      if (filters.minUserVotes) params['vote_count.gte'] = filters.minUserVotes;
      if (filters.runtime) params['with_runtime.gte'] = filters.runtime;
    }

    return this.http.get<SearchResponse>(`${this.baseUrl}/discover/movie`, { params });
  }

  discoverTV(page: number = 1, filters: FilterCriteria): Observable<SearchResponse> {
    let params: any = {
      api_key: this.apiKey,
      page: page.toString()
    };

    if (filters) {
      if (filters.genres.length) params.with_genres = filters.genres.join(',');
      if (filters.certifications.length) {
        params.certification = filters.certifications.join('|');
        params.certification_country = 'US'
      }
      if (filters.language) params.language = filters.language;
      if (filters.userScore) params['vote_average.gte'] = filters.userScore;
      if (filters.minUserVotes) params['vote_count.gte'] = filters.minUserVotes;
      if (filters.runtime) params['with_runtime.gte'] = filters.runtime;
    }

    return this.http.get<SearchResponse>(`${this.baseUrl}/discover/tv`, { params });
  }
  
}