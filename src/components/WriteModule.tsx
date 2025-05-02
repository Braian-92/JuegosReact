import React, { useEffect, useState } from 'react';

// Props for the WriteModule component
interface WriteModuleProps {
  word: string;
  wordAudioSrc?: string;
  letterAudioPath?: string;
  onComplete?: () => void;
}

const WriteModule: React.FC<WriteModuleProps> = ({
  word,
  wordAudioSrc = `${process.env.PUBLIC_URL}/audio/words/${word.toUpperCase()}.mp3`,
  letterAudioPath = `${process.env.PUBLIC_URL}/audio/letters`,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);

  // Reset when word changes
  useEffect(() => {
    setCurrentIndex(0);
    setCompleted(false);
    setStarted(false);
  }, [word]);

  // Notify parent when complete
  useEffect(() => {
    if (completed) {
      onComplete?.();
    }
  }, [completed, onComplete]);

  // Play word audio
  const playWordAudio = () => {
    const audio = new Audio(wordAudioSrc);
    audio.play().catch((err) => console.error('Error reproduciendo palabra:', err));
  };

  // Handle key presses
  useEffect(() => {
    if (!started) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (completed) return;
      const key = e.key.toLowerCase();
      const expected = word[currentIndex]?.toLowerCase();
      if (!/^[a-zñ]$/.test(key)) return;
      if (key === expected) {
        const audioSrc = `${letterAudioPath}/${key.toUpperCase()}.mp3`;
        const letterAudio = new Audio(audioSrc);
        letterAudio.play().catch((err) => console.error('Error reproducir letra:', err));
        setCurrentIndex((i) => {
          const next = i + 1;
          if (next >= word.length) setCompleted(true);
          return next;
        });
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [started, currentIndex, completed, word, letterAudioPath]);

  // Start game
  const handleStart = () => {
    setStarted(true);
    playWordAudio();
  };

  // Render start button
  if (!started) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <button
          onClick={handleStart}
          className="px-8 py-4 bg-white text-indigo-600 text-2xl font-semibold rounded-lg shadow-lg hover:bg-gray-100"
        >
          Iniciar juego
        </button>
      </div>
    );
  }

  // Render word
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex space-x-4">
        {word.split('').map((char, idx) => {
          const size = `${Math.min(20, 100 / word.length)}vw`;
          return (
            <span
              key={idx}
              className={`select-none ${idx < currentIndex ? 'text-green-400' : 'text-white/70'}`}
              style={{ fontSize: size, fontWeight: 700 }}
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
