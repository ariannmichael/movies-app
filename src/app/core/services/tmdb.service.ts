import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TMDBService {
  private apiKey = 'YOUR_API_KEY';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie`, {
      params: { api_key: this.apiKey, query }
    });
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}`, {
      params: { api_key: this.apiKey }
    });
  }
}