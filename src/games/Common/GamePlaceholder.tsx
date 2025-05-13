import React from 'react';

interface Props {
  nombre: string;
}

export default function GamePlaceholder({ nombre }: Props) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{nombre}</h1>
      <p>Este juego todavía no está implementado.</p>
    </div>
  );
}
