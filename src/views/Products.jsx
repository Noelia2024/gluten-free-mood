import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext';

const Products = () => {
  // El catálogo lo provee CartProvider con una escucha en vivo a Productos:
  // una sola lectura en toda la app, así catálogo y carrito nunca discrepan.
  const { addItem, productos, catalogoCargando, catalogoError } = useCart();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Nuestros Productos Sin TACC
      </Typography>
      {/* El error va antes que el estado de carga: si no, una falla de conexión
          queda mostrando "Cargando productos..." para siempre. */}
      {catalogoError ? (
        <Typography variant="body1" color="error">
          No pudimos cargar los productos. Revisá tu conexión e intentá de nuevo en unos segundos.
        </Typography>
      ) : catalogoCargando || productos.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Cargando productos...
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {productos.map((prod) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={prod.id}>
              <Card>
                {prod.Imagen && (
                  <CardMedia
                    component="img"
                    image={prod.Imagen}
                    alt={prod.Nombre}
                    sx={{
                      height: { xs: 180, sm: 220 },
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" component="h3">
                    {prod.Nombre || "Producto sin nombre"}
                  </Typography>
                  {prod.Precio && (
                    <Typography variant="body2" color="text.secondary">
                      ${prod.Precio}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => addItem(prod)}
                  >
                    Agregar al carrito
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Products;