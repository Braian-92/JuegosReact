import React, { useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { playLetter, playWord, playSuccessSound, playErrorSound } from '../../core/logic/audioPlayer';
import BaseScene from '../../scenes/BaseScene';
import SpinningCube from '../../scenes/environments/SpinningCube';
import FloatingKeyboard from '../../gui/FloatingKeyboard';
import TopBar from '../../gui/TopBar';

interface WriteModuleProps {
  word?: string;
  delayMs?: number;
  onExit?: () => void;
}

const XP_POR_PALABRA = 5;

const WORDS = [
  'ARDILLA', 'BALLENA', 'CABALLO', 'DELFIN', 'ELEFANTE',
  'FOCA', 'GATO', 'HIPOPOTAMO', 'IGUANA', 'JIRAFA',
  'KOALA', 'LORO', 'MARIPOSA', 'NANDU', 'NUTRIA',
  'OSO', 'PERRO', 'QUIRQUINCHO', 'RATON', 'SAPO',
  'TORTUGA', 'URRACA', 'VACA', 'YACARE', 'ZORRO'
];

export default function WriteWordGame({ word, delayMs = 1000, onExit }: WriteModuleProps) {
  const [currentWord, setCurrentWord] = useState<string>(word || WORDS[0]);
  const [input, setInput] = useState<string>('');
  const [correctLetters, setCorrectLetters] = useState<boolean[]>([]);
  const [completedWords, setCompletedWords] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);

  const level = Math.floor(xp / 100) + 1;

  const handleLetterInput = useCallback((key: string) => {
    const nextLetter = currentWord[input.length];
    if (key === nextLetter) {
      playLetter(key);
      setInput(prev => prev + key);
      setCorrectLetters(prev => [...prev, true]);
    } else {
      playErrorSound();
      setMistakes(prev => prev + 1);
    }
  }, [currentWord, input]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      playWord(currentWord);
    }, delayMs);
    return () => clearTimeout(timeout);
  }, [currentWord]);

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

  useEffect(() => {
    if (input === currentWord) {
      playSuccessSound();
      setXp(prev => prev + XP_POR_PALABRA); // ⭐ suma puntos definidos por el juego
      const nextIndex = (WORDS.indexOf(currentWord) + 1) % WORDS.length;
      setCompletedWords(prev => prev + 1);
      setTimeout(() => {
        setCurrentWord(WORDS[nextIndex]);
        setInput('');
        setCorrectLetters([]);
      }, delayMs);
    }
  }, [input, currentWord]);

  const handleSceneReady = useCallback((scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
    SpinningCube(scene, camera);
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <TopBar overrideXp={xp} overrideLevel={level} extraButton={{ label: '↩ Volver', onClick: onExit }} />
      <BaseScene onSceneReady={handleSceneReady} />

      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
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
        scale={2}
        highlightKey={currentWord[input.length]}
        showHighlight={true}
      />
    </div>
  );
}
