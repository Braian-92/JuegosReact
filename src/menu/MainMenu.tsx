import React, { useState } from 'react';
import WriteWordGame from '../games/WriteWordGame/WriteWordGame';
import GamePlaceholder from '../games/Common/GamePlaceholder';

const juegos = [
  { id: 'write-word', nombre: 'Escribir Palabras', icono: '✍️' },
  { id: 'silabas', nombre: 'Formar Sílabas', icono: '🧩' },
  { id: 'memoria', nombre: 'Juego de Memoria', icono: '🧠' },
  { id: 'imagen-palabra', nombre: 'Palabra + Imagen', icono: '🖼️' },
  { id: 'trazo', nombre: 'Trazar Letras', icono: '✏️' },
  { id: 'ordenar', nombre: 'Ordenar Letras', icono: '🔠' },
  { id: 'ahorcado', nombre: 'Ahorcado', icono: '☠️' },
  { id: 'sonidos', nombre: 'Reconocer Sonidos', icono: '🔊' },
  { id: 'sorpresa', nombre: 'Sorpresa', icono: '🎁' }
];

export default function MainMenu() {
  const [juegoActual, setJuegoActual] = useState<string | null>(null);

  const handleVolver = () => {
    setJuegoActual(null);
  };

  if (juegoActual === 'write-word') {
    return <WriteWordGame onExit={handleVolver} />;
  }

  if (juegoActual) {
    return <GamePlaceholder nombre={juegoActual} />;
  }

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: '3rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          padding: '2rem',
          maxWidth: '800px',
          width: '100%'
        }}>
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
                height: '120px',
                boxShadow: '0 0 10px #0005'
              }}
            >
              <span style={{ fontSize: '2rem' }}>{juego.icono}</span>
              {juego.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
