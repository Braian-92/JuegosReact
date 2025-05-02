import React, { useState } from 'react';
import Escena from './Escena';
import Gui from './Gui';

const wordList = [
  'ARDILLA', 'BALLENA', 'CABALLO', 'DELFIN', 'ELEFANTE',
  'FOCA', 'GATO', 'HIPOPOTAMO', 'IGUANA', 'JIRAFA',
  'KOALA', 'LORO', 'MARIPOSA', 'NANDU', 'NUTRIA',
  'OSO', 'PERRO', 'QUIRQUINCHO', 'RATON', 'SAPO',
  'TORTUGA', 'URRACA', 'VACA', 'YACARE', 'ZORRO'
];

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStart = () => setStarted(true);
  const handleNext  = () =>
    setCurrentIndex(i => (i + 1 < wordList.length ? i + 1 : 0));

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Fondo 3D */}
      <Escena />

      {/* Splash o GUI */}
      {!started ? (
        <div style={{
          position:      'absolute',
          top:           0,
          left:          0,
          width:         '100vw',
          height:        '100vh',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          background:    'linear-gradient(135deg, #4ade80 0%, #3b82f6 50%, #9333ea 100%)',
          zIndex:        1,
          pointerEvents: 'auto'
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
        />
      )}
    </div>
  );
};

export default App;