import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import MainMenu from './menu/MainMenu';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <MainMenu />
  </React.StrictMode>
);
