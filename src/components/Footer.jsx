import React from 'react';
import { Box, Container, Typography, IconButton, Stack, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        // Si es dark usa el gris oscuro del tema, si es light usa el naranja primario
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'background.paper' : 'primary.main', 
        color: (theme) => theme.palette.mode === 'dark' ? 'text.primary' : 'white', 
        py: 5,
        mt: 'auto',
        borderTop: '4px solid',
        borderColor: 'secondary.main',
        width: '100%',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            // En celulares se pone uno abajo del otro, en compu uno al lado del otro
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 4,
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: '1000px',
            mx: 'auto',
            width: '100%',
          }}
        >
          
          {/*  SECCIÓN 1: Identidad y Seguridad */}
          <Box sx={{ maxWidth: '320px' }}>
            <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: '.05rem', mb: 1 }}>
              Gluten-Free-Mood
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
              Establecimiento 100% libre de gluten. Horneamos con amor, cuidando tu salud y garantizando la total ausencia de contaminación cruzada.
            </Typography>
          </Box>

          {/*  SECCIÓN 2: Enlaces Rápidos */}
          {/*<Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
              Navegación
            </Typography>
            <Stack 
              spacing={1} 
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{ fontFamily: 'inherit' }}
            >
              <Link href="/productos" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.8 }}>
                Productos
              </Link>
              <Link href="/nosotros" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.8 }}>
                Sobre Nosotros
              </Link>
              <Link href="/contacto" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.8 }}>
                Contacto
              </Link>
            </Stack>
          </Box>*/}

          {/*  SECCIÓN 3: Redes y Contacto */}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              ¡Seguinos!
            </Typography>
            <Stack 
              direction="row" 
              spacing={1} 
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mb: 1 }}
            >
              <IconButton color="inherit" aria-label="Instagram" href="https://instagram.com" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="WhatsApp" href="https://wa.me/tu-numero" target="_blank">
                <WhatsAppIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Facebook" href="https://facebook.com" target="_blank">
                <FacebookIcon />
              </IconButton>
            </Stack>
            <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
              San Martín-Mendoza, Argentina
            </Typography>
          </Box>

        </Box>

        {/*  LÍNEA FINAL: Copyright */}
        <Box 
          sx={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.15)', 
            mt: 4, 
            pt: 3, 
            textAlign: 'center' 
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.6, display: 'block' }}>
            © {new Date().getFullYear()} Gluten-Free-Mood. Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 0.5 }}>
            Desarrollado por{' '}
            <Link
              href="#" // 💡 Podés cambiar el "#" por tu GitHub o LinkedIn cuando lo tengas listo
              color="inherit"
              underline="hover"
              sx={{ fontWeight: 600 }}
            >
              Noelia Lucero
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;