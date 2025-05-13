import React, { useState } from 'react';
import WriteWordGame from '../games/WriteWordGame/WriteWordGame';
import GamePlaceholder from '../games/Common/GamePlaceholder';

const juegos = Array.from({ length: 36 }, (_, i) => ({
  id: `juego-${i + 1}`,
  nombre: `Juego ${i + 1}`,
  icono: '🎮'
}));

juegos[0] = { id: 'write-word', nombre: 'Escribir Palabras', icono: '✍️' };

export default function MainMenu() {
  const [juegoActual, setJuegoActual] = useState<string | null>(null);

  if (juegoActual === 'write-word') {
    return <WriteWordGame />;
  }

  if (juegoActual) {
    return <GamePlaceholder nombre={juegoActual} />;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', padding: '2rem' }}>
      {juegos.map(juego => (
        <button
          key={juego.id}
          onClick={() => setJuegoActual(juego.id)}
          style={{
            fontSize: '1.2rem',
            padding: '1rem',
            borderRadius: '1rem',
            backgroundColor: '#333',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '120px'
          }}
        >
          <span style={{ fontSize: '2rem' }}>{juego.icono}</span>
          {juego.nombre}
        </button>
      ))}
    </div>
  );
}
