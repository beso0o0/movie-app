import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Movie } from "../../types/movie";

type MovieCardProps = {
  movie: Movie;
  compact?: boolean;
};

function MovieCard({ movie, compact = false }: MovieCardProps) {
  return (
    <Card
      component={Link}
      to={`/movie/${movie.id}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        overflow: "hidden",
        height: "100%",
        borderRadius: 6,
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          transform: compact ? "none" : "translateY(-8px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 28px 55px rgba(0,0,0,0.45)"
              : "0 24px 48px rgba(73, 55, 36, 0.18)",
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.35),
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path ?? ""}`}
          alt={movie.title}
          sx={{
            aspectRatio: compact ? "16 / 10" : "2 / 3",
            objectFit: "cover",
          }}
        />
        {!!movie.vote_average && (
          <Chip
            icon={<StarRoundedIcon sx={{ color: "#ffcf5a !important" }} />}
            label={movie.vote_average.toFixed(1)}
            size="small"
            sx={{
              position: "absolute",
              top: 14,
              right: 14,
              bgcolor: "rgba(6, 10, 18, 0.78)",
              color: "#fff9ef",
              fontWeight: 700,
            }}
          />
        )}
      </Box>
      <CardContent sx={{ p: 2.25 }}>
        <Typography variant="h6" sx={{ mb: 1, lineHeight: 1.2 }}>
          {movie.title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <CalendarMonthRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {movie.release_date || "Coming soon"}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "2.8em",
          }}
        >
          {movie.overview || "Explore this title and open the details page for more information."}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
