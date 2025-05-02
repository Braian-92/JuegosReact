import React, { useEffect, useState } from 'react';

interface WriteModuleProps {
  word: string;
  wordAudioSrc?: string;
  letterAudioPath?: string;
  onComplete: () => void;
}

const WriteModule: React.FC<WriteModuleProps> = ({
  word,
  wordAudioSrc = `${process.env.PUBLIC_URL}/audio/words/${word.toUpperCase()}.mp3`,
  letterAudioPath = `${process.env.PUBLIC_URL}/audio/letters`,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1) Al cambiar la palabra: reiniciar índice y reproducir audio solo UNA vez
  useEffect(() => {
    setCurrentIndex(0);
    const audio = new Audio(wordAudioSrc);
    audio.play().catch((err) =>
      console.error('Error reproduciendo palabra:', err)
    );
  }, [word, wordAudioSrc]);

  // 2) Manejar pulsaciones de tecla y reproducir audio de letra
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expected = word[currentIndex]?.toLowerCase();
      if (!/^[a-zñ]$/.test(key) || key !== expected) return;

      // Reproducir audio de la letra
      new Audio(`${letterAudioPath}/${key.toUpperCase()}.mp3`)
        .play()
        .catch((err) => console.error('Error reproducir letra:', err));

      // Avanzar o completar
      const next = currentIndex + 1;
      if (next >= word.length) {
        onComplete();              // notificar al padre
      } else {
        setCurrentIndex(next);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, word, letterAudioPath, onComplete]);

  // 3) Renderizar la palabra siempre centrada
  return (
    <div className="w-full h-screen flex items-center justify-center pointer-events-none">
      <div className="flex space-x-4">
        {word.split('').map((char, idx) => {
          const fontSize = `${Math.min(20, 100 / word.length)}vw`;
          const color    = idx < currentIndex ? 'text-green-400' : 'text-white/70';
          return (
            <span
              key={idx}
              className={`select-none ${color}`}
              style={{ fontSize, fontWeight: 700 }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WriteModule;