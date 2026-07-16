import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import MovieGrid from "../shared/MovieGrid";
import SectionHeading from "../shared/SectionHeading";
import { Movie, MovieApiResponse } from "../../types/movie";

const allMoviesUrl =
  "https://api.themoviedb.org/3/discover/movie?api_key=81bebca94dadbb35bd29f06b418a6520";

function AllMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      try {
        const response = await fetch(allMoviesUrl);
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
        eyebrow="Library"
        title="Browse every loaded title"
        subtitle="A more spacious grid makes posters, dates, and ratings easier to scan at a glance."
      />
      <Box sx={{ mt: 3 }}>
        <MovieGrid movies={movies} />
      </Box>
    </Container>
  );
}

export default AllMovies;
