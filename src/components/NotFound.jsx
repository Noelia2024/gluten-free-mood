import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 2,
        minHeight: '50vh',
        px: 2,
        py: 6,
      }}
    >
      <Typography variant="h4" component="h1" fontWeight={600}>
        Página no encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary">
        La página que buscás no existe o fue movida.
      </Typography>
      <Button component={Link} to="/" variant="contained" size="large">
        Volver al catálogo
      </Button>
    </Box>
  );
};

export default NotFound;