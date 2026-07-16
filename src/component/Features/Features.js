import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Features = () => {
    const url = "https://api.themoviedb.org/3/movie/popular?api_key=81bebca94dadbb35bd29f06b418a6520";

    const [movies, setMovies] = useState([]);

    const getMovies = () => {
        fetch(url)
            .then(res => res.json())
            .then(json => setMovies(json.results || []))
            .catch(err => console.error("Error fetching movies:", err));
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <Container maxWidth={false} style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom align="center">All Movies</Typography>
            <Grid container spacing={4}>
                {movies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{ height: '450px', objectFit: 'cover' }}
                                />
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {movie.title}
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

export default Features;