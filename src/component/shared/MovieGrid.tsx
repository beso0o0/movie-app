import Grid from "@mui/material/Grid";
import { Movie } from "../../types/movie";
import MovieCard from "./MovieCard";

type MovieGridProps = {
  movies: Movie[];
  compact?: boolean;
};

function MovieGrid({ movies, compact = false }: MovieGridProps) {
  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: compact ? 4 : 3 }}>
          <MovieCard movie={movie} compact={compact} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieGrid;
