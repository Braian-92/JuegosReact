import React, { useState } from 'react';
import WriteWordGame from '../games/WriteWordGame/WriteWordGame';
import TraceLetterGame from '../games/TraceLetterGame/TraceLetterGame';
import MemoryGame from '../games/MemoryGame/MemoryGame';
import GamePlaceholder from '../games/Common/GamePlaceholder';
import TopBar from '../gui/TopBar';
import { useUser } from '../context/UserContext';
import './MainMenu.css';

interface UserProfile {
  name: string;
  avatar: string;
}

const MOCK_USER: UserProfile = {
  name: "Jugador",
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
  const [user] = useState<UserProfile>(MOCK_USER);
  // Estado para controlar la visibilidad del perfil
  const [showProfile, setShowProfile] = useState(false);
  const { xp, level } = useUser();

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
    // This function is no longer used in the new implementation
  };

  // Renderizado condicional basado en el juego seleccionado
  if (juegoActual === 'write-word') {
    return <WriteWordGame onExit={handleVolver} />;
  }

  if (juegoActual === 'trazo') {
    return <TraceLetterGame onExit={handleVolver} />;
  }

  if (juegoActual === 'memoria') {
    return <MemoryGame onExit={handleVolver} />;
  }

  if (juegoActual) {
    return <GamePlaceholder nombre={juegoActual} />;
  }

  // Renderizado del menú principal
  return (
    <div className="page-container">
      <TopBar 
        overrideXp={xp} 
        overrideLevel={level}
      />
      
      <div className="content-container">
        <div className="games-grid">
          {juegos.map(juego => {
            const isLocked = level < juego.nivel_requerido;
            
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
