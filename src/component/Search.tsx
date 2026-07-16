import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieGrid from "./shared/MovieGrid";
import SectionHeading from "./shared/SectionHeading";
import { Movie, MovieApiResponse } from "../types/movie";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=81bebca94dadbb35bd29f06b418a6520&query=${encodeURIComponent(
            query
          )}`
        );
        const data: MovieApiResponse = await response.json();
        setMovies(data.results ?? []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (query) {
      void getMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <SectionHeading
        eyebrow="Search"
        title={query ? `Results for "${query}"` : "Start with a title, actor, or vibe"}
        subtitle="Search now has a proper empty state so the page still feels intentional when nothing is loaded yet."
      />
      {movies.length > 0 ? (
        <Box sx={{ mt: 3 }}>
          <MovieGrid movies={movies} />
        </Box>
      ) : (
        <Paper
          sx={{
            mt: 3,
            p: 5,
            borderRadius: 6,
            textAlign: "center",
          }}
        >
          <SearchOffRoundedIcon sx={{ fontSize: 52, color: "text.secondary", mb: 1 }} />
          <Typography variant="h5" sx={{ mb: 1 }}>
            {query ? "No matching movies found" : "Use the search bar above"}
          </Typography>
          <Typography color="text.secondary">
            {query
              ? "Try a broader keyword or a different spelling."
              : "Press Enter in the top search bar to jump into results."}
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export default Search;
