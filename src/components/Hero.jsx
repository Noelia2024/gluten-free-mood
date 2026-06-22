// src/components/hero.jsx
import { Box, Typography } from '@mui/material';
// IMPORTANTE: Cambiá 'tu-foto-de-pan.jpg' por el nombre exacto de tu archivo en assets
import glutenfreemood from '../assets/glutenfreemood.jpg'; 

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
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
          backgroundColor: 'rgba(0, 0, 0, 0)', // Ajustá la opacidad si querés la foto más clara u oscura
          zIndex: 1,
        }
      }}
    >
      {/* La imagen real que va a obligar al Box a tener su misma altura */}
      <Box
        component="img"
        src={glutenfreemood}
        alt="Gluten-Free Mood Hero"
        sx={{
          width: '100%',
          height: 'auto', // Esto hace que respete la proporción original y el alto total de la foto
          display: 'block',
        }}
      />

      {/* El texto flotando perfectamente en el centro */}
      <Box 
        sx={{ 
          position: 'absolute',
          zIndex: 2, 
          color: '#ffffff',
          px: 2 
        }}
      >
        <Typography 
          variant="h1" 
          component="p" 
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
          component="p"
          sx={{
            fontSize: { xs: '1.1rem', md: '1.5rem' },
            textShadow: '1px 1px 4px rgba(0,0,0,0.7)'
          }}
        >
          Panadería artesanal, segura y 100% libre de gluten.
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;