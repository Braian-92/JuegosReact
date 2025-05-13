import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // importa tus estilos globales o tailwind

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);