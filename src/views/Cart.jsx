import { useState, Fragment } from 'react';
import {
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

const Cart = () => {
  const { items, totalPrice, increment, decrement, removeItem } = useCart();
  const [nota, setNota] = useState('');

  const handleCheckout = () => {
    const msg = [
      '¡Hola! Quiero hacer este pedido:',
      ...items.map((i) => `- ${i.Nombre} x${i.qty} — $${lineTotal(i)}`),
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
          <List disablePadding>
            {items.map((item) => (
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
                    primary={item.Nombre || 'Producto sin nombre'}
                    secondary={`$${item.Precio} c/u`}
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
                    ${lineTotal(item)}
                  </Typography>
                </ListItem>
                <Divider component="li" />
              </Fragment>
            ))}
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
            <Typography variant="h6">${totalPrice}</Typography>
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
            disabled={!items.length || !waNumber}
            onClick={handleCheckout}
          >
            Finalizar compra
          </Button>
          {!waNumber && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              Configurá VITE_WHATSAPP_NUMBER para habilitar el pedido
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Cart;