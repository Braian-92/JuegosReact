import React, { useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { AudioManager } from '../../core/logic/audioPlayer';
import BaseScene from '../../scenes/BaseScene';
import SpinningCube from '../../scenes/environments/SpinningCube';
import FloatingKeyboard from '../../gui/FloatingKeyboard';
import TopBar from '../../gui/TopBar';

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

// Array de palabras disponibles para el juego
const WORDS = [
  'ARDILLA', 'BALLENA', 'CABALLO', 'DELFIN', 'ELEFANTE',
  'FOCA', 'GATO', 'HIPOPOTAMO', 'IGUANA', 'JIRAFA',
  'KOALA', 'LORO', 'MARIPOSA', 'NANDU', 'NUTRIA',
  'OSO', 'PERRO', 'QUIRQUINCHO', 'RATON', 'SAPO',
  'TORTUGA', 'URRACA', 'VACA', 'YACARE', 'ZORRO'
];

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
  // Estado para la palabra actual - puede ser inicializada desde props o usar la primera palabra del array
  const [currentWord, setCurrentWord] = useState<string>(word || WORDS[0]);
  // Estado para el texto ingresado por el usuario
  const [input, setInput] = useState<string>('');
  // Estado para tracking de letras correctas
  const [correctLetters, setCorrectLetters] = useState<boolean[]>([]);
  // Estados para métricas del juego que pueden ser importantes para componentes superiores
  const [completedWords, setCompletedWords] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);

  // Configuración visual y cálculo del nivel basado en XP
  const textScale = 2.2;
  const level = Math.floor(xp / 100) + 1;

  /**
   * Manejador de entrada de letras
   * Este callback es crucial para la interacción del usuario y la lógica del juego
   * Comunica los resultados mediante efectos de sonido y actualización visual
   */
  const handleLetterInput = useCallback((key: string) => {
    const nextLetter = currentWord[input.length];
    if (key === nextLetter) {
      AudioManager.playSound('letter', key);
      setInput(prev => prev + key);
      setCorrectLetters(prev => [...prev, true]);
    } else {
      AudioManager.playSound('error');
      setMistakes(prev => prev + 1);
    }
  }, [currentWord, input]);

  /**
   * Efecto para reproducir el sonido de la palabra
   * Se ejecuta cuando cambia la palabra actual, respetando el delay configurado
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      AudioManager.playSound('word', currentWord);
    }, delayMs);
    return () => clearTimeout(timeout);
  }, [currentWord]);

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
   * Efecto para manejar la finalización de una palabra
   * Este efecto es clave en la comunicación del progreso:
   * 1. Actualiza XP que se muestra en TopBar
   * 2. Incrementa contador de palabras completadas
   * 3. Prepara el juego para la siguiente palabra
   */
  useEffect(() => {
    if (input === currentWord) {
      AudioManager.playSound('success');
      // Comunica el progreso incrementando XP
      setXp(prev => prev + XP_POR_PALABRA);
      const nextIndex = (WORDS.indexOf(currentWord) + 1) % WORDS.length;
      setCompletedWords(prev => prev + 1);
      
      setTimeout(() => {
        setCurrentWord(WORDS[nextIndex]);
        setInput('');
        setCorrectLetters([]);
      }, delayMs);
    }
  }, [input, currentWord]);

  /**
   * Callback para inicializar la escena 3D
   * Comunica con el sistema de renderizado 3D
   */
  const handleSceneReady = useCallback((scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
    SpinningCube(scene, camera);
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <TopBar overrideXp={xp} overrideLevel={level} extraButton={{ label: '↩ Volver', onClick: onExit }} />
      <BaseScene onSceneReady={handleSceneReady} />

      <div style={{ textAlign: 'center', marginTop: '4rem', transform: `scale(${textScale})`, transformOrigin: 'top center' }}>
        <h2>Escribí la palabra:</h2>
        <h1 style={{ fontSize: '4rem', letterSpacing: '1rem' }}>
          {currentWord.split('').map((letter, idx) => {
            const typed = input[idx];
            const correct = correctLetters[idx];
            const isNext = idx === input.length;
            let color = 'white';
            let textDecoration = 'none';

            if (typed) {
              color = correct ? 'lightgreen' : 'white';
            } else if (isNext) {
              color = 'violet';
              textDecoration = 'underline';
            }

            return (
              <span key={idx} style={{ color, textDecoration }}>
                {letter}
              </span>
            );
          })}
        </h1>
        <div style={{ marginTop: '2rem' }}>
          <p>Palabras completas: {completedWords}</p>
          <p>Errores: {mistakes}</p>
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
