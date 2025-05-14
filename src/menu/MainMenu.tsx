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
  { id: 'silabas', nombre: 'Formar Sílabas', icono: '🧩', nivel_requerido: 1 },
  { id: 'memoria', nombre: 'Juego de Memoria', icono: '🧠', nivel_requerido: 2 },
  { id: 'imagen-palabra', nombre: 'Palabra + Imagen', icono: '🖼️', nivel_requerido: 3 },
  { id: 'trazo', nombre: 'Trazar Letras', icono: '✏️', nivel_requerido: 1 },
  { id: 'ordenar', nombre: 'Ordenar Letras', icono: '🔠', nivel_requerido: 3 },
  { id: 'ahorcado', nombre: 'Ahorcado', icono: '☠️', nivel_requerido: 4 },
  { id: 'sonidos', nombre: 'Reconocer Sonidos', icono: '🔊', nivel_requerido: 2 },
  { id: 'sorpresa', nombre: 'Sorpresa', icono: '🎁', nivel_requerido: 5 }
];

/**
 * Componente principal del menú de juegos
 * Gestiona la navegación entre juegos y el progreso del usuario
 */
export default function MainMenu() {
  // Estado para controlar el juego actual seleccionado
  const [juegoActual, setJuegoActual] = useState<string | null>(null);
  // Estado para mantener la información del usuario
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  // Estado para controlar la visibilidad del perfil
  const [showProfile, setShowProfile] = useState(false);

  /**
   * Maneja el retorno al menú principal desde un juego
   */
  const handleVolver = () => {
    setJuegoActual(null);
  };

  /**
   * Actualiza la experiencia y nivel del usuario al completar un juego
   * @param xpGained - Cantidad de experiencia ganada
   */
  const handleGameComplete = (xpGained: number) => {
    setUser(prev => {
      const newXp = prev.xp + xpGained;
      const newLevel = Math.floor(newXp / 100) + 1; // Cada 100 XP = 1 nivel
      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
  };

  // Renderizado condicional basado en el juego seleccionado
  if (juegoActual === 'write-word') {
    return <WriteWordGame onExit={handleVolver} />;
  }

  if (juegoActual === 'trazo') {
    return <TraceLetterGame onExit={handleVolver} />;
  }

  if (juegoActual) {
    return <GamePlaceholder nombre={juegoActual} />;
  }

  // Renderizado del menú principal
  return (
    <div className="main-menu">
      <TopBar 
        overrideXp={user.xp} 
        overrideLevel={user.level}
      />
      
      <div className="menu-container">
        <div className="games-grid">
          {juegos.map(juego => {
            // Verifica si el juego está bloqueado según el nivel del usuario
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
