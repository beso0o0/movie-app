import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import MovieGrid from "../shared/MovieGrid";
import SectionHeading from "../shared/SectionHeading";
import { Movie, MovieApiResponse } from "../../types/movie";

const featuredMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=81bebca94dadbb35bd29f06b418a6520";

function Features() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      try {
        const response = await fetch(featuredMoviesUrl);
        const data: MovieApiResponse = await response.json();
        setMovies(data.results ?? []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    void getMovies();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <SectionHeading
        eyebrow="Trending"
        title="Popular titles people are watching"
        subtitle="The refreshed card system keeps the focus on the movie instead of the layout chrome."
      />
      <Box sx={{ mt: 3 }}>
        <MovieGrid movies={movies} />
      </Box>
    </Container>
  );
}

export default Features;
