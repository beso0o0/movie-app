import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails as MovieDetailsType } from "../types/movie";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);

  useEffect(() => {
    const getMovieDetails = async (): Promise<void> => {
      if (!id) {
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=81bebca94dadbb35bd29f06b418a6520`
        );
        const data: MovieDetailsType = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    void getMovieDetails();
  }, [id]);

  if (!id) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", marginTop: "5rem" }}>
        Movie not found.
      </Typography>
    );
  }

  if (!movie) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", marginTop: "5rem" }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 7,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(255,107,53,0.12), rgba(15,27,45,0.95))"
              : "linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,249,241,0.98))",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, md: 5 },
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: { xs: "100%", md: "400px" }, borderRadius: "24px", boxShadow: 3 }}
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path ?? ""}`}
            alt={movie.title}
          />
          <Box sx={{ maxWidth: 700 }}>
            <Chip
              icon={<AutoAwesomeRoundedIcon />}
              label="Movie details"
              sx={{ mb: 2 }}
              color="primary"
              variant="outlined"
            />
            <Typography variant="h2" gutterBottom fontWeight="bold">
              {movie.title}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: "1.08rem", lineHeight: 1.8 }}>
              {movie.overview || "Overview not available yet."}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ my: 3 }}>
              <Paper sx={{ px: 2, py: 1.5, borderRadius: 4 }}>
                <Typography variant="overline" color="text.secondary">
                  Release date
                </Typography>
                <Typography variant="h6">{movie.release_date || "Unknown"}</Typography>
              </Paper>
              <Paper sx={{ px: 2, py: 1.5, borderRadius: 4 }}>
                <Typography variant="overline" color="text.secondary">
                  Genres
                </Typography>
                <Typography variant="h6">
                  {movie.genres?.map((genre) => genre.name).join(", ") || "Unknown"}
                </Typography>
              </Paper>
            </Stack>
            <Box sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
              <Rating
                name="read-only"
                value={(movie.vote_average ?? 0) / 2}
                readOnly
                precision={0.5}
              />
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: "0.5rem" }}>
                ({movie.vote_count ?? 0} reviews)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default MovieDetails;
