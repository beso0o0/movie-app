import { Box, CardMedia, Container, Typography ,Rating} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
const MovieDetails = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=81bebca94dadbb35bd29f06b418a6520`)
                const data = await response.json()
                setMovie(data)
            } catch (err) {
                console.error("Error fetching movie details:", err)
            }
        }
        getMovieDetails()
    }, [id])

    if (!movie) {
        return <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '5rem' }}>Loading...</Typography>
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ marginTop: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
                <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', md: '400px' }, borderRadius: '8px', boxShadow: 3 }}
                    image={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt={movie?.title} >
                </CardMedia>
                <Box>
                    <Typography variant="h4" gutterBottom fontWeight="bold">   {movie?.title} </Typography>
                    <Typography variant="body1" gutterBottom sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>   {movie?.overview} </Typography>
                    <Typography variant="h6" gutterBottom color="textSecondary"> Release Date: {movie?.release_date} </Typography>
                    <Typography variant="h6" gutterBottom> 
                        Genres: {movie?.genres?.map(genre => genre.name).join(", ")} 
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                        <Rating
                            name="read-only"
                            value={movie?.vote_average / 2}
                            readOnly
                            precision={0.5}
                        />
                        <Typography variant="body2" color="textSecondary" sx={{ marginLeft: '0.5rem' }}>
                            ({movie?.vote_count} reviews)
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default MovieDetails
