import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

const upcomingMovieUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=81bebca94dadbb35bd29f06b418a6520";

const Upcoming = () => {
    const [movies, setMovies] = useState([]);

    const getMovies = () => {
        fetch(upcomingMovieUrl)
            .then(res => res.json())
            .then(json => setMovies(json.results || []))
            .catch(err => console.error("Error fetching movies:", err));
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
       <Container maxWidth={false} style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Upcoming Movies
            </Typography>
            <Grid container spacing={3}>
                {movies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="div">
                                        {movie.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {movie.release_date}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Upcoming;    