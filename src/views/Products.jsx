import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import  db  from "/src/fireStore.config";
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
  const { addItem } = useCart();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Productos"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(lista);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Nuestros Productos Sin TACC
      </Typography>
      {productos.length === 0 ? (
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