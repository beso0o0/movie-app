import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Movielist = () => {
  const url = "https://api.themoviedb.org/3/discover/movie?api_key=81bebca94dadbb35bd29f06b418a6520";
  const featuredMovieUrl = "https://api.themoviedb.org/3/movie/popular?api_key=81bebca94dadbb35bd29f06b418a6520"
  const upcomingMovieUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=81bebca94dadbb35bd29f06b418a6520"


  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState([])
  const [upcomingMovie, setUpcomingMovie] = useState([])
  const getMovies = () => {
    fetch(url)
      .then(res => res.json())
      .then(json => setMovies(json.results || []))
      .catch(err => console.error("Error fetching movies:", err));

    fetch(featuredMovieUrl)
      .then(res => res.json())
      .then(json => setFeaturedMovie(json.results?.slice(0, 4) || []))
      .catch(err => console.error("Error fetching featured movies:", err));

    fetch(upcomingMovieUrl)
      .then(res => res.json())
      .then(json => {
        console.log("Upcoming Movies Response:", json);
        setUpcomingMovie(json.results || []);
      })
      .catch(err => console.error("Error fetching upcoming movies:", err));
  }

  useEffect(() => {
    getMovies();
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 // optional
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3 // optional
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2 // optional
    }

  };
  const upcomingResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 2 // optional
    }

  };
  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Movie List</Typography>
      <Carousel autoPlay={true} infinite={true} responsive={responsive}>
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <Card style={{ width: '200px', margin: '10px', height: '400px' }}>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Carousel>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
        <Link to="/all-movies">
          <Button variant='contained' color='primary'>See More</Button>
        </Link>
      </div>
      <Typography variant="h4" gutterBottom>Featured Movie</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {featuredMovie.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <Card style={{ width: '200px', margin: '10px', height: '400px', }}>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}


      </div>
      <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'2rem'}}>
        <Link to="/features">
            <Button variant='contained' color='primary'>See More</Button>
          </Link>
        </div>
        <Typography variant='h4' gutterBottom sx={{ marginTop: '2rem' }}>Upcoming Movie</Typography>

        <Carousel autoPlay={true} infinite={true} responsive={upcomingResponsive} >
          {
            upcomingMovie.map(movie => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <Card style={{ width: '300px', margin: '30px', height: '400px', justifyContent: 'center', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {movie.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))
          }
        </Carousel>


      </div>
    </Container>
  )
}


export default Movielist