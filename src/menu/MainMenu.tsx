import React, { useState } from 'react';
import WriteWordGame from '../games/WriteWordGame/WriteWordGame';
import TraceLetterGame from '../games/TraceLetterGame/TraceLetterGame';
import GamePlaceholder from '../games/Common/GamePlaceholder';
import TopBar from '../gui/TopBar';
import './MainMenu.css';

interface UserProfile {
  name: string;
  level: number;
  xp: number;
  avatar: string;
}

const MOCK_USER: UserProfile = {
  name: "Jugador",
  level: 1,
  xp: 0,
  avatar: "👤"
};

const juegos = [
  { id: 'write-word', nombre: 'Escribir Palabras', icono: '✍️', nivel_requerido: 1 },
  { id: 'silabas', nombre: 'Formar Sílabas', icono: '🧩', nivel_requerido: 2 },
  { id: 'memoria', nombre: 'Juego de Memoria', icono: '🧠', nivel_requerido: 2 },
  { id: 'imagen-palabra', nombre: 'Palabra + Imagen', icono: '🖼️', nivel_requerido: 3 },
  { id: 'trazo', nombre: 'Trazar Letras', icono: '✏️', nivel_requerido: 1 },
  { id: 'ordenar', nombre: 'Ordenar Letras', icono: '🔠', nivel_requerido: 3 },
  { id: 'ahorcado', nombre: 'Ahorcado', icono: '☠️', nivel_requerido: 4 },
  { id: 'sonidos', nombre: 'Reconocer Sonidos', icono: '🔊', nivel_requerido: 2 },
  { id: 'sorpresa', nombre: 'Sorpresa', icono: '🎁', nivel_requerido: 5 }
];

export default function MainMenu() {
  const [juegoActual, setJuegoActual] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [showProfile, setShowProfile] = useState(false);

  const handleVolver = () => {
    setJuegoActual(null);
  };

  const handleGameComplete = (xpGained: number) => {
    setUser(prev => {
      const newXp = prev.xp + xpGained;
      const newLevel = Math.floor(newXp / 100) + 1;
      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
  };

  if (juegoActual === 'write-word') {
    return <WriteWordGame onExit={handleVolver} />;
  }

  if (juegoActual === 'trazo') {
    return <TraceLetterGame onExit={handleVolver} />;
  }

  if (juegoActual) {
    return <GamePlaceholder nombre={juegoActual} />;
  }

  return (
    <div className="main-menu">
      <TopBar 
        overrideXp={user.xp} 
        overrideLevel={user.level}
      />
      
      <div className="menu-container">
        <div className="games-grid">
          {juegos.map(juego => {
            const isLocked = user.level < juego.nivel_requerido;
            
            return (
              <button
                key={juego.id}
                onClick={() => !isLocked && setJuegoActual(juego.id)}
                className={`game-button ${isLocked ? 'locked' : ''}`}
                disabled={isLocked}
              >
                <span className="game-icon">{juego.icono}</span>
                <span className="game-name">{juego.nombre}</span>
                {isLocked && (
                  <div className="lock-overlay">
                    <span className="lock-icon">🔒</span>
                    <span className="required-level">Nivel {juego.nivel_requerido}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
