import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { ThemeContextProvider } from './context/ThemeContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*Tu Contet envuelve todo y adentro maneja el Theme Provider de MUI*/ }
    <ThemeContextProvider>
      <CssBaseline/>
      <App />
    </ThemeContextProvider>
    
  </React.StrictMode>
)