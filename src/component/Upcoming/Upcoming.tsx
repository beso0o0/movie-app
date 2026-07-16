import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import MovieGrid from "../shared/MovieGrid";
import SectionHeading from "../shared/SectionHeading";
import { Movie, MovieApiResponse } from "../../types/movie";

const upcomingMoviesUrl =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=81bebca94dadbb35bd29f06b418a6520";

function Upcoming() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      try {
        const response = await fetch(upcomingMoviesUrl);
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
        eyebrow="Premieres"
        title="Upcoming movies worth tracking"
        subtitle="This page now mirrors the rest of the app so it feels like one product, not a separate screen."
      />
      <Box sx={{ mt: 3 }}>
        <MovieGrid movies={movies} />
      </Box>
    </Container>
  );
}

export default Upcoming;
