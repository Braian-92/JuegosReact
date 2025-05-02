import React, { useState } from 'react';
import WriteModule from './components/WriteModule';

// Lista de palabras en orden alfabético
const wordList = [
  'ARDILLA', 'BALLENA', 'CABALLO', 'DELFIN', 'ELEFANTE',
  'FOCA', 'GATO', 'HIPOPOTAMO', 'IGUANA', 'JIRAFA',
  'KOALA', 'LORO', 'MARIPOSA', 'NANDU', 'NUTRIA',
  'OSO', 'PERRO', 'QUIRQUINCHO', 'RATON', 'SAPO',
  'TORTUGA', 'URRACA', 'VACA', 'YACARE', 'ZORRO'
];

const Gui: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1 < wordList.length ? i + 1 : 0));
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        pointerEvents: 'auto',
      }}
    >
      <WriteModule
        word={wordList[currentIndex]}
        onComplete={handleNext}
      />
    </div>
  );
};

export default Gui;