import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import { CartProvider } from './context/CartContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*Tu Context envuelve todo y adentro maneja el Theme Provider de MUI*/ }
    <ThemeContextProvider>
      <CartProvider>
        <BrowserRouter>
          <CssBaseline/>
          <App />
        </BrowserRouter>
      </CartProvider>
    </ThemeContextProvider>
    
  </React.StrictMode>
)