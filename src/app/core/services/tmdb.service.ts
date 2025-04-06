import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { SearchResponse } from '../models/search.model';
import { DetailResponse } from '../models/detail.model';

@Injectable({ providedIn: 'root' })
export class TMDBService {
  private apiKey = environment.TMDBApiKey;
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.baseUrl}/search/movie`, {
      params: { api_key: this.apiKey, query }
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
    return this.http.get<SearchResponse>(`${this.baseUrl}/movie/popular`, {
      params: { 
        api_key: this.apiKey,
        page: page.toString()
      }
    });
  }

  getPopularTv(page: number = 1): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.baseUrl}/tv/popular?language=en-US`, {
      params: { 
        api_key: this.apiKey,
        page: page.toString()
      }
    });
  }
  
}