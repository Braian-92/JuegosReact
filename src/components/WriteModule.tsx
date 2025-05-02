import React, { useEffect, useState } from 'react';

// Props for the WriteModule component
interface WriteModuleProps {
  word: string;
  wordAudioSrc?: string;
  letterAudioPath?: string;
}

const WriteModule: React.FC<WriteModuleProps> = ({
  word,
  // Use PUBLIC_URL to serve from public/audio
  wordAudioSrc = `${process.env.PUBLIC_URL}/audio/words/${word.toUpperCase()}.mp3`,
  letterAudioPath = `${process.env.PUBLIC_URL}/audio/letters`
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);

  // Play full word audio
  const playWordAudio = () => {
    const audio = new Audio(wordAudioSrc);
    audio.play().catch((err) => console.error('Error reproduciendo palabra:', err));
  };

  // Handle key events once started
  useEffect(() => {
    if (!started) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (completed) return;
      const key = e.key.toLowerCase();
      const expected = word[currentIndex]?.toLowerCase();
      if (!/^[a-zñ]$/.test(key)) return;

      if (key === expected) {
        // Play letter audio
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

  // Render start screen
  if (!started) {
    return (
      <div className="write-module w-full h-screen flex justify-center items-center bg-white">
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700"
        >
          Iniciar juego
        </button>
      </div>
    );
  }

  // Render writing screen
  return (
    <div className="write-module w-full h-screen flex justify-center items-center bg-white">
      <div className="text-center">
        {word.split('').map((char, idx) => (
          <span
            key={idx}
            className={`text-4xl font-bold mx-1 select-none ${
              idx < currentIndex ? 'text-green-500' : 'text-gray-400'
            }`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WriteModule;
