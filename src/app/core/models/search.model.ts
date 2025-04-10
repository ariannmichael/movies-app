export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    name?: string;
    first_air_date?: string;
    origin_country?: string[];
    original_name?: string;
}

export interface MediaItem extends Movie {
    first_air_date?: string;
    name?: string;
}

export interface SearchResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}