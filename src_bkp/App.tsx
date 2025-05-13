import React, { useState } from 'react';
import Escena from './Escena';
import Gui from './Gui';
import ScorePanel from './ScorePanel';

const wordList = [
  'ARDILLA', 'BALLENA', 'CABALLO', 'DELFIN', 'ELEFANTE',
  'FOCA', 'GATO', 'HIPOPOTAMO', 'IGUANA', 'JIRAFA',
  'KOALA', 'LORO', 'MARIPOSA', 'NANDU', 'NUTRIA',
  'OSO', 'PERRO', 'QUIRQUINCHO', 'RATON', 'SAPO',
  'TORTUGA', 'URRACA', 'VACA', 'YACARE', 'ZORRO'
];

const App: React.FC = () => {
  const [started, setStarted]           = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctLetters, setCorrect]    = useState(0);
  const [completedWords, setCompleted]  = useState(0);
  const [mistakes, setMistakes]         = useState(0);

  const handleStart = () => setStarted(true);

  const handleNext = () => {
    setCompleted(w => w + 1);
    setCurrentIndex(i => i + 1 < wordList.length ? i + 1 : 0);
  };

  const handleCorrectLetter = () => setCorrect(n => n + 1);
  const handleErrorLetter   = () => setMistakes(n => n + 1);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Fondo 3D con degradado */}
      <Escena />

      {/* Panel de puntaje */}
      {started && (
        <ScorePanel
          correctLetters={correctLetters}
          completedWords={completedWords}
          mistakes={mistakes}
        />
      )}

      {/* Pantalla de inicio o GUI de escritura */}
      {!started ? (
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '100vw', height: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 50%, #9333ea 100%)',
          zIndex: 1, pointerEvents: 'auto'
        }}>
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-white text-indigo-600 text-2xl font-semibold rounded-lg shadow-lg hover:bg-gray-100"
          >
            Iniciar juego
          </button>
        </div>
      ) : (
        <Gui
          word={wordList[currentIndex]}
          onComplete={handleNext}
          onCorrectLetter={handleCorrectLetter}
          onErrorLetter={handleErrorLetter}
        />
      )}
    </div>
  );
};

export default App;
