// src/components/Hero.jsx
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import heroCutout from '../assets/hero-pan-cutout.png';

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 'auto', md: '78vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        // Misma ternaria que el Footer (Footer.jsx:16): primary.main en light,
        // background.paper en dark. Así el hero y el footer son una sola banda
        // y cambian juntos con el tema.
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'background.paper' : 'primary.main',
      }}
    >
      {/* primary.contrastText, no common.white: el blanco sobre #FF7043 da 2.74:1
          y falla AA. El token del theme para texto sobre primary.main es
          blueGrey[900] y da 4.79:1. */}
      <Box sx={{ position: 'relative', zIndex: 1, color: 'primary.contrastText', px: 2 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, mb: 1 }}
        >
          Gluten-Free-Mood
        </Typography>

        <Typography
          variant="h2"
          component="h2"
          sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}
        >
          Panadería artesanal, segura y 100% libre de gluten.
        </Typography>

        {/* color secondary a proposito: un contained sin color usa primary.main, que
            es el mismo naranja del fondo del hero. La caja del boton quedaria
            invisible. secondary.main (deepOrange 900) es el unico tono del
            theme con contraste real contra primary.main. */}
        {/* display por breakpoint a proposito: en desktop el nav ya tiene el
            link "Productos", asi que el boton del hero es redundante y queda
            como segundo enlace identico a 10 px de la foto. En mobile el nav
            esta escondido tras el hamburguesa, asi que este boton es el unico
            camino visible al catalogo. */}
        <Button
          variant="contained"
          size="large"
          color="secondary"
          component={Link}
          to="/productos"
          sx={{ mt: 3, display: { xs: 'inline-flex', md: 'none' } }}
        >
          Ver productos
        </Button>
      </Box>

      {/* La foto ya viene recortada con alfa, asi que va como <img> normal y no
          como fondo. object-fit cover deja de existir justamente porque no hay
          recorte: se ve el sujeto entero, que era el problema original. */}
      <Box
        component="img"
        src={heroCutout}
        alt="Gluten-Free-Mood, panadería artesanal libre de gluten"
        sx={{
          position: 'relative',
          zIndex: 1,
          mt: { xs: 3, md: 4 },
          width: { xs: '64%', sm: '46%', md: '340px' },
          maxWidth: '100%',
          display: 'block',
          // drop-shadow y no box-shadow a proposito: el primero respeta el
          // canal alfa y sigue la silueta real del pan. Un box-shadow
          // dibujaria un rectangulo alrededor del recorte.
          filter: 'drop-shadow(0 10px 28px rgba(0, 0, 0, 0.35))',
        }}
      />
    </Box>
  );
};

export default Hero;