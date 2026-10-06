import { useState, Fragment } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from 'react-router-dom';
import { useCart, lineTotal } from '../context/CartContext';

// Número de WhatsApp desde .env (Vite lo lee en build-time). NUNCA hardcodeado.
// Si falta, el botón de checkout queda deshabilitado (degradación visual, sin crash).
const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

// Nombre, Precio e Imagen son OPCIONALES en Firestore. La tarjeta y la fila del
// carrito ya caian a "Producto sin nombre", pero el mensaje de WhatsApp
// interpolaba el campo crudo y el cliente recibia la palabra "undefined" en su
// pedido. Un solo lugar decide el texto visible.
const nombreDe = (item) => item.Nombre || 'Producto sin nombre';

const Cart = () => {
  const { items, totalPrice, increment, decrement, removeItem, catalogoError, catalogoCargando } =
    useCart();
  const [nota, setNota] = useState('');

  // Hay líneas sin precio de catálogo: no se cobran y bloquean el checkout.
  // No se under-cobra en silencio.
  const hayNoDisponibles = items.some((i) => i.available === false);

  // Ningún precio pudo verificarse: o el catálogo falló (conexión o
  // configuración) o todavía no respondió. Ambas son la misma cosa para el
  // cliente, y en las dos hay que decirlo a nivel catálogo en vez de acusar a
  // los productos de estar borrados: quitar líneas no arregla una conexión.
  const precioSinVerificar = Boolean(catalogoError) || catalogoCargando;

  // Solo tiene sentido decir "ya no está en el catálogo" si el catálogo SÍ se
  // pudo leer: con el catálogo caído no sabemos si el producto falta o no.
  const hayProductosBorrados = precioSinVerificar ? false : hayNoDisponibles;

  const handleCheckout = () => {
    const msg = [
      '¡Hola! Quiero hacer este pedido:',
      ...items.map((i) => `- ${nombreDe(i)} x${i.qty} — $${lineTotal(i)}`),
      '',
      `TOTAL: $${totalPrice}`,
      nota ? `\n${nota}` : '',
    ].join('\n');
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
        Carrito
      </Typography>

      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <RemoveShoppingCartIcon sx={{ fontSize: 64 }} color="disabled" />
          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Explorá el catálogo y sumá tus productos sin TACC favoritos.
          </Typography>
          <Button variant="contained" component={Link} to="/productos">
            Ver productos
          </Button>
        </Box>
      ) : (
        <>
          {precioSinVerificar && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              No pudimos verificar los precios en este momento. Revisá tu conexión e intentá de
              nuevo en unos segundos.
            </Alert>
          )}

          <List disablePadding>
            {items.map((item) => {
              const noDisponible = item.available === false;
              // Sin catálogo no se puede afirmar que el producto se borró: la
              // línea queda en estado neutro en vez de marcar un falso "borrado".
              const sinVerificar = noDisponible && precioSinVerificar;
              return (
                <Fragment key={item.id}>
                  <ListItem
                    alignItems="center"
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label={`Eliminar ${item.Nombre || 'producto'}`}
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    sx={{ gap: { xs: 1, sm: 1.5 }, py: 2, pr: 7 }}
                  >
                    {item.Imagen && (
                      <Avatar
                        variant="rounded"
                        src={item.Imagen}
                        alt={item.Nombre}
                        sx={{ width: { xs: 56, sm: 56, md: 64 }, height: { xs: 56, sm: 56, md: 64 } }}
                      />
                    )}
                    <ListItemText
                      primary={nombreDe(item)}
                      secondary={
                        sinVerificar
                          ? 'Precio sin verificar'
                          : noDisponible
                            ? 'No disponible — quitá esta línea para poder finalizar la compra'
                            : item.Precio != null
                              ? `$${item.Precio} c/u`
                              : 'Precio sin definir'
                      }
                      slotProps={
                        noDisponible && !sinVerificar
                          ? { secondary: { color: 'error.main', fontWeight: 600 } }
                          : undefined
                      }
                      sx={{ minWidth: 0, flex: '1 1 auto' }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: '0 0 auto' }}>
                      <IconButton
                        size="small"
                        aria-label="Disminuir cantidad"
                        disabled={item.qty <= 1}
                        onClick={() => decrement(item.id)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography component="span" variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>
                        {item.qty}
                      </Typography>
                      <IconButton
                        size="small"
                        aria-label="Aumentar cantidad"
                        onClick={() => increment(item.id)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ flex: '0 0 auto', fontWeight: 600, minWidth: 56, textAlign: 'right' }}
                    >
                      {sinVerificar ? '—' : noDisponible ? 'Sin precio' : `$${lineTotal(item)}`}
                    </Typography>
                  </ListItem>
                  <Divider component="li" />
                </Fragment>
              );
            })}
          </List>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              mb: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              Total
            </Typography>
            {/* Con el catálogo caído el total da 0 sólo porque no se pudo cotizar nada:
                mostrar "$0" sería mentir. */}
            <Typography variant="h6">{precioSinVerificar ? '—' : `$${totalPrice}`}</Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            label="Nota para tu pedido (dirección, horario, etc.)"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={!items.length || !waNumber || hayNoDisponibles}
            onClick={handleCheckout}
          >
            Finalizar compra
          </Button>
          {!waNumber && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              Configurá VITE_WHATSAPP_NUMBER para habilitar el pedido
            </Typography>
          )}
          {precioSinVerificar && (
            <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'center' }}>
              No podemos enviar el pedido hasta verificar los precios. Revisá tu conexión e intentá
              de nuevo en unos segundos.
            </Typography>
          )}
          {hayProductosBorrados && (
            <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'center' }}>
              Hay productos no disponibles en el carrito. Quitá esas líneas para poder finalizar la
              compra.
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Cart;