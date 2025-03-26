import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './theme';
import { ThemeProvider } from './bblabs-designsystem/bblabs-ds-core/ThemeContext';
import { CartProvider } from './context/CartContext';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <CartProvider>
      <App />
    </CartProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
