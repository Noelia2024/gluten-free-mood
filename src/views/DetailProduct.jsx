import { Box, Typography } from '@mui/material';

const DetailProduct = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h4" component="h1" fontWeight={600}>
        Detalle del producto
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Sección en construcción.
      </Typography>
    </Box>
  );
};

export default DetailProduct;