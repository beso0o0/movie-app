import React from 'react'
import {useState,useEffect} from 'react'
import { useSearchParams } from 'react-router-dom' 
import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
const Search = () => {
const [searchParams] = useSearchParams();
const query = searchParams.get('q');
const [movies,setMovies] = useState([]);
useEffect(() => {
    const getMovies = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=81bebca94dadbb35bd29f06b418a6520&query=${query}`)
        .then(res => res.json())
        .then(json => setMovies(json.results || []))
        .catch(err => console.error("Error fetching movies:", err));
    }
    getMovies();
}, [query]);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Results for "{query}"
      </Typography>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="350"
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.release_date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Search