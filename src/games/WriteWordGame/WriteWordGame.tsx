import React, { useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { AudioManager } from '../../core/logic/audioPlayer';
import BaseScene from '../../scenes/BaseScene';
import SpinningCube from '../../scenes/environments/SpinningCube';
import FloatingKeyboard from '../../gui/FloatingKeyboard';
import TopBar from '../../gui/TopBar';
import { useUser } from '../../context/UserContext';

/**
 * Interfaz que define las propiedades que puede recibir el componente WriteWordGame
 * Esta interfaz es crucial para la comunicación con componentes superiores:
 * @param word - Palabra opcional que se puede pasar desde un componente padre para iniciar el juego
 * @param delayMs - Tiempo de espera opcional antes de reproducir el sonido de la palabra
 * @param onExit - Callback opcional que se ejecuta cuando el usuario quiere salir del juego
 */
interface WriteModuleProps {
  word?: string;
  delayMs?: number;
  onExit?: () => void;
}

// Constante que define los puntos de experiencia ganados por cada palabra completada
const XP_POR_PALABRA = 5;

// Array de palabras disponibles para el juego, ordenadas alfabéticamente
const WORDS = [
  'ARDILLA', 'BALLENA', 'CABALLO', 'DELFIN', 'ELEFANTE',
  'FOCA', 'GATO', 'HIPOPOTAMO', 'IGUANA', 'JIRAFA',
  'KOALA', 'LORO', 'MARIPOSA', 'NANDU', 'NUTRIA',
  'OSO', 'PERRO', 'QUIRQUINCHO', 'RATON', 'SAPO',
  'TORTUGA', 'URRACA', 'VACA', 'YACARE', 'ZORRO'
].sort();

// Constantes de configuración
const VERTICAL_POSITION = 40; // 40% desde arriba (ajustable entre 1-100)
const KEYBOARD_HEIGHT = '200px'; // Altura aproximada del teclado

/**
 * Componente principal del juego de escritura de palabras
 * 
 * Comunicación con componentes superiores:
 * 1. Recibe la palabra inicial a través de la prop 'word'
 * 2. Permite personalizar el delay de audio con 'delayMs'
 * 3. Notifica la salida del juego mediante el callback 'onExit'
 * 4. Comunica el progreso a través del TopBar (XP y nivel)
 */
export default function WriteWordGame({ word, delayMs = 1000, onExit }: WriteModuleProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState<string>('');
  const [correctLetters, setCorrectLetters] = useState<boolean[]>([]);
  const [completedWords, setCompletedWords] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const { xp, level, addXp } = useUser();

  // Configuración visual y cálculo del nivel basado en XP
  const textScale = 1.2;
  const currentWord = word || WORDS[currentWordIndex];

  const handleLetterInput = (letter: string) => {
    if (letter === currentWord[input.length]) {
      // Reproducir sonido de la letra correcta
      AudioManager.playSound('letter', letter);
      
      const newCorrectLetters = [...correctLetters];
      newCorrectLetters[input.length] = true;
      setCorrectLetters(newCorrectLetters);
      setInput(prev => prev + letter);

      if (input.length + 1 === currentWord.length) {
        // Palabra completada
        setCompletedWords(prev => prev + 1);
        addXp(XP_POR_PALABRA);
        
        // Reproducir sonido de éxito
        AudioManager.playSound('success');
        
        // Reiniciar para la siguiente palabra
        setTimeout(() => {
          setCurrentWordIndex(prevIndex => (prevIndex + 1) % WORDS.length);
          setInput('');
          setCorrectLetters([]);
        }, 1000); // Esperar 1 segundo antes de cambiar de palabra
      }
    } else {
      // Reproducir sonido de error
      AudioManager.playSound('error');
      setMistakes(prev => prev + 1);
    }
  };

  /**
   * Efecto para reproducir el sonido de la palabra
   * Se ejecuta cuando cambia la palabra actual, respetando el delay configurado
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      AudioManager.playSound('word', currentWord);
    }, delayMs);
    return () => clearTimeout(timeout);
  }, [currentWord, delayMs]);

  /**
   * Efecto para manejar eventos del teclado físico
   * Permite la interacción alternativa además del teclado virtual
   */
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (key.length === 1 && /[A-ZÑ]/.test(key)) {
        handleLetterInput(key);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleLetterInput]);

  /**
   * Callback para inicializar la escena 3D
   * Comunica con el sistema de renderizado 3D
   */
  const handleSceneReady = useCallback((scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
    SpinningCube(scene, camera);
  }, []);

  return (
    <div className="page-container">
      <TopBar overrideXp={xp} overrideLevel={level} extraButton={{ label: '↩ Volver', onClick: onExit }} />
      <BaseScene onSceneReady={handleSceneReady} />

      {/* Stats flotantes en la esquina superior derecha */}
      <div style={{
        position: 'absolute',
        top: 'calc(var(--topbar-height) + 2.5rem)',
        right: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        zIndex: 2
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.75rem',
          backdropFilter: 'blur(5px)',
          color: '#4CAF50',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
        }}>
          <span style={{ fontSize: '1.75rem' }}>✅</span>
          <span style={{ fontSize: '1.1rem' }}>Palabras: {completedWords}</span>
        </div>
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.75rem',
          backdropFilter: 'blur(5px)',
          color: '#FF5252',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
        }}>
          <span style={{ fontSize: '1.75rem' }}>❌</span>
          <span style={{ fontSize: '1.1rem' }}>Errores: {mistakes}</span>
        </div>
      </div>

      {/* Contenedor principal con altura ajustada para excluir el teclado */}
      <div style={{ 
        height: `calc(100vh - var(--topbar-height) - ${KEYBOARD_HEIGHT})`,
        position: 'relative'
      }}>
        {/* Contenedor del texto con posición vertical configurable */}
        <div style={{ 
          position: 'absolute',
          top: `${VERTICAL_POSITION}%`,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          textAlign: 'center',
          padding: '0 2rem'
        }}>
          <div style={{ 
            fontSize: '7rem', 
            letterSpacing: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '8rem'
          }}>
            {currentWord.split('').map((letter, idx) => {
              const typed = input[idx];
              const correct = correctLetters[idx];
              const isNext = idx === input.length;
              let color = 'white';
              let textDecoration = 'none';

              if (typed) {
                color = correct ? '#4CAF50' : '#FF5252';
              } else if (isNext) {
                color = '#E1BEE7';
                textDecoration = 'underline';
              }

              return (
                <span key={idx} style={{ 
                  color, 
                  textDecoration,
                  textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                  display: 'inline-block',
                  transition: 'all 0.3s ease'
                }}>
                  {letter}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <FloatingKeyboard
        onKeyPress={handleLetterInput}
        scale={1.5}
        highlightKey={currentWord[input.length]}
        showHighlight={true}
      />
    </div>
  );
}
