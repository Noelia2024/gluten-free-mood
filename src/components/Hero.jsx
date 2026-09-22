// src/components/Hero.jsx
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// IMPORTANTE: Cambiá 'tu-foto-de-pan.jpg' por el nombre exacto de tu archivo en assets
import glutenfreemood from '../assets/glutenfreemood.jpg'; 

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 'calc(100dvh - 56px)', md: 'calc(100vh - 64px)' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden', // Evita que la foto se desborde por accidente
        
        // Capa oscura por encima de la imagen para que resalte el texto
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)', // Opacidad real: el texto siempre legible
          zIndex: 1,
        }
      }}
    >
      {/* La imagen de fondo: absoluta y cubriendo todo, nunca colapsa a 0 */}
      <Box
        component="img"
        src={glutenfreemood}
        alt="Gluten-Free Mood Hero"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />

      {/* El texto flotando perfectamente en el centro */}
      <Box 
        sx={{ 
          position: 'relative',
          zIndex: 2, 
          color: '#ffffff',
          px: 2 
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '2.5rem', md: '4.5rem' }, 
            mb: 1,
            textShadow: '2px 2px 8px rgba(0,0,0,0.7)' // Un toque de sombra para que se lea impecable
          }}
        >
          Gluten-Free Mood
        </Typography>
        
        <Typography 
          variant="h2" 
          component="h2"
          sx={{
            fontSize: { xs: '1.1rem', md: '1.5rem' },
            textShadow: '1px 1px 4px rgba(0,0,0,0.7)'
          }}
        >
          Panadería artesanal, segura y 100% libre de gluten.
        </Typography>

        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/productos"
          sx={{ mt: 3 }}
        >
          Ver productos
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;