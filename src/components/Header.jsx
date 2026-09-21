import { useState, useContext } from 'react';
import { 
  AppBar, Container, Toolbar, Box, Typography, IconButton, 
  Menu, MenuItem, Button, Badge , Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// Importaciones de tus contextos y recursos
import { ColorModeContext } from '../context/ThemeContext'; 
import glutenfreemood from '../assets/glutenfreemood.jpg'; 

const pages = ['Productos', 'Precios', 'Blog'];

function Header() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  // 🎨 Truco: Definimos el color de los elementos del Header según el modo
  const headerColor = theme.palette.mode === 'dark' ? 'text.primary' : '#ffffff';

  return (
    <AppBar position="static" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          {/* ──────────────────────────────────────────────────────────────
              IZQUIERDA: CONTENIDO RESPONSIVE (Desktop vs Mobile)
             ────────────────────────────────────────────────────────────── */}

          {/*  VISTA DESKTOP: Logo + Nombre (Se ocultan en celular) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
            <Avatar
              src={glutenfreemood}
              alt="Gluten-Free-Mood Logo"
              sx={{ width: 40, height: 40, mr: 1.5 }}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontFamily: 'inherit',
                fontWeight: 700,
                letterSpacing: '.05rem',
                color: headerColor,
                textDecoration: 'none',
              }}
            >
              Gluten-Free-Mood
            </Typography>
          </Box>

          {/*  VISTA MOBILE: Menú Hamburguesa (Se oculta en desktop) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: headerColor, p: { xs: 0.5, sm: 1 } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} component={Link} to="/" onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center', fontFamily: 'inherit', fontWeight: 500 }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*  VISTA MOBILE: Nombre adaptable y SIN LOGO (Se oculta en desktop) */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              ml: { xs: 1, sm: 2 },
              fontFamily: 'inherit',
              fontWeight: 700,
              color: headerColor,
              textDecoration: 'none',
              fontSize: { xs: '0.85rem', sm: '1.2rem' }, 
              letterSpacing: { xs: '0px', sm: '.05rem' }
            }}
          >
            Gluten-Free-Mood
          </Typography>

          {/* ──────────────────────────────────────────────────────────────
              CENTRO: MENÚ DE NAVEGACIÓN (Solo Desktop)
             ────────────────────────────────────────────────────────────── */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to="/"
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: headerColor, 
                  display: 'block',
                  fontFamily: 'inherit',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  mx: 1
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* ──────────────────────────────────────────────────────────────
              DERECHA: SOLO CARRITO Y MODO CLARO/OSCURO
             ────────────────────────────────────────────────────────────── */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 0.5, sm: 1.5 }, 
              flexGrow: 0,
              flexWrap: 'nowrap' 
            }}
          >
            {/* 🛒 Carrito de compras */}
            <IconButton component={Link} to="/carrito" color="inherit" aria-label="cart" sx={{ p: { xs: 0.5, sm: 1 } }}>
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon sx={{color: headerColor, fontSize: { xs: '1.3rem', sm: '1.5rem' } }} />
              </Badge>
            </IconButton>

            {/*  Interruptor de Modo Claro/Oscuro */}
            <IconButton 
              onClick={colorMode.toggleColorMode} 
              color="inherit" 
              sx={{ color: headerColor, p: { xs: 0.5, sm: 1 } }}
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem' } }} />
              ) : (
                <Brightness4Icon sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem' } }} />
              )}
            </IconButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;