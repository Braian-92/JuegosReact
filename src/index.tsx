import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/layout.css';  // Importamos los estilos globales de layout
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Temporalmente deshabilitado mientras resolvemos problemas de configuración
// serviceWorker.register();
serviceWorker.unregister(); // Desregistramos el service worker existente
