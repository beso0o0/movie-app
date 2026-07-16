export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieApiResponse {
  results?: Movie[];
}

export interface MovieDetails extends Movie {
  genres?: MovieGenre[];
}
