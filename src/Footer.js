import {  Typography,Container } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react'

const Footer = () => {
  return (
    <Box component={Footer}sx={{
        background:'#101010',
        color:'white',
        textAlign:'center',
        padding:'1rem',
        marginTop:'2rem'
        
    }}>
        <Container>
<Typography variant='h5'  component='div'>
    @Copyright; {new Date().getFullYear()} MOvie APP 
</Typography>
        </Container>
      
    </Box>
  )
}

export default Footer