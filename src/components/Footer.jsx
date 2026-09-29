import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Número de WhatsApp desde .env (Vite lo lee en build-time). NUNCA hardcodeado.
// Si falta, el botón queda deshabilitado y se explica cómo habilitarlo:
// degradación visual, sin generar un wa.me/undefined.
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : undefined;

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        // Si es dark usa el gris oscuro del tema, si es light usa el naranja primario
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'background.paper' : 'primary.main',
        // En dark el fondo es background.paper, no primary.main: por eso la
        // ternaria se queda. Un solo token daria 1.27:1 y texto invisible.
        color: (theme) => theme.palette.mode === 'dark' ? 'text.primary' : 'primary.contrastText',
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

          {/*  SECCIÓN 2: Contacto */}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              ¡Contactanos!
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mb: 1 }}
            >
              <IconButton
                color="inherit"
                aria-label="WhatsApp"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                disabled={!whatsappNumber}
              >
                <WhatsAppIcon />
              </IconButton>
            </Stack>
            {!whatsappNumber && (
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Configurá VITE_WHATSAPP_NUMBER para habilitar el contacto.
              </Typography>
            )}
            <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
              San Martín-Mendoza, Argentina
            </Typography>
          </Box>

        </Box>

        {/*  LÍNEA FINAL: Copyright */}
        <Box 
          sx={{ 
            borderTop: '1px solid',
            borderColor: 'divider',
            mt: 4,
            pt: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.6, display: 'block' }}>
            © {new Date().getFullYear()} Gluten-Free-Mood. Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 0.5 }}>
            Desarrollado por Noelia Lucero
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;