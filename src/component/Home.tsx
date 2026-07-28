import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./shared/MovieCard";
import SectionHeading from "./shared/SectionHeading";
import { Movie, MovieApiResponse } from "../types/movie";

const discoverMoviesUrl =
  "https://api.themoviedb.org/3/discover/movie?api_key=81bebca94dadbb35bd29f06b418a6520";
const featuredMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=81bebca94dadbb35bd29f06b418a6520";
const upcomingMoviesUrl =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=81bebca94dadbb35bd29f06b418a6520";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2,
  },
};

const upcomingResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

async function fetchMovies(url: string): Promise<Movie[]> {
  const response = await fetch(url);
  const data: MovieApiResponse = await response.json();
  return data.results ?? [];
}

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async (): Promise<void> => {
      try {
        const [discover, featured, upcoming] = await Promise.all([
          fetchMovies(discoverMoviesUrl),
          fetchMovies(featuredMoviesUrl),
          fetchMovies(upcomingMoviesUrl),
        ]);

        setMovies(discover);
        setFeaturedMovies(featured.slice(0, 4));
        setUpcomingMovies(upcoming);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    void loadMovies();
  }, []);

  const heroMovie = featuredMovies[0] ?? movies[0];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Paper
        sx={{
          position: "relative",
          overflow: "hidden",
          p: { xs: 3, md: 5 },
          borderRadius: 8,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(255,107,53,0.18), rgba(46,196,182,0.08) 48%, rgba(9,18,32,0.92))"
              : "linear-gradient(135deg, rgba(255,107,53,0.18), rgba(46,196,182,0.12) 48%, rgba(255,251,243,0.92))",
          mb: 5,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Chip
              icon={<LocalFireDepartmentRoundedIcon />}
              label="Tonight's movie mood"
              sx={{ mb: 2, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12) }}
            />
            <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "5rem" }, mb: 2 }}>
              Find your next
              <Box component="span" sx={{ color: "primary.main" }}>
                {" "}
                big-screen
              </Box>{" "}
              obsession.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, mb: 3 }}>
              Browse trending releases, polished picks, and upcoming premieres in a calmer,
              faster interface built for movie nights instead of clutter.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
              <Button
                component={Link}
                to="/features"
                variant="contained"
                endIcon={<PlayArrowRoundedIcon />}
              >
                Explore trending
              </Button>
              <Button
                component={Link}
                to="/upcoming"
                variant="outlined"
                endIcon={<ArrowForwardRoundedIcon />}
              >
                See upcoming titles
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {[
                { label: "Curated picks", value: featuredMovies.length || 4 },
                { label: "Movies loaded", value: movies.length || 20 },
                { label: "Upcoming drops", value: upcomingMovies.length || 20 },
              ].map((stat) => (
                <Grid key={stat.label} size={{ xs: 12, sm: 4 }}>
                  <Paper
                    sx={{
                      p: 2.25,
                      borderRadius: 5,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(255,255,255,0.58)",
                    }}
                  >
                    <Typography variant="h4">{stat.value}</Typography>
                    <Typography color="text.secondary">{stat.label}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            {heroMovie ? (
              <Paper
                sx={{
                  p: 2,
                  overflow: "hidden",
                  borderRadius: 6,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.6)",
                }}
              >
                <MovieCard movie={heroMovie} compact />
              </Paper>
            ) : null}
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 5 }}>
        <SectionHeading
          eyebrow="Quick Picks"
          title="Trending right now"
          subtitle="A fast, swipeable lane for popular titles when you just want something good without endless scrolling."
        />
        <Carousel autoPlay infinite responsive={responsive}>
          {movies.map((movie) => (
            <Box key={movie.id} sx={{ px: 1, pb: 1 }}>
              <MovieCard movie={movie} />
            </Box>
          ))}
        </Carousel>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button component={Link} to="/all-movies" variant="outlined">
            Browse the full library
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 5 }}>
        <SectionHeading
          eyebrow="Editor's Choice"
          title="Featured for a better first click"
          subtitle="These cards surface the most interesting titles first, with stronger hierarchy and clearer metadata."
        />
        <Grid container spacing={3}>
          {featuredMovies.map((movie) => (
            <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          overflow: "hidden",
          borderRadius: 7,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(46,196,182,0.11), rgba(15,27,45,0.95))"
              : "linear-gradient(135deg, rgba(46,196,182,0.16), rgba(255,249,241,0.98))",
        }}
      >
        <SectionHeading
          eyebrow="Premieres"
          title="Coming soon to your queue"
          subtitle="Fresh upcoming releases with cleaner spacing and smaller posters that are easier to scan."
        />
        <Carousel autoPlay infinite responsive={upcomingResponsive}>
          {upcomingMovies.map((movie) => (
            <Box key={movie.id} sx={{ px: 1, pb: 1 }}>
              <MovieCard movie={movie} />
            </Box>
          ))}
        </Carousel>
      </Paper>
    </Container>
  );
}

export default Home;
