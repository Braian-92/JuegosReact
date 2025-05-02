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
  const effectAudioPath = `${process.env.PUBLIC_URL}/audio/efects`;

  // Reset and play word audio when word changes
  useEffect(() => {
    setCurrentIndex(0);
    const audio = new Audio(wordAudioSrc);
    audio.play().catch((err) => console.error('Error reproduciendo palabra:', err));
  }, [word, wordAudioSrc]);

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!/^[a-zñ]$/.test(key)) return;

      const expected = word[currentIndex]?.toLowerCase();
      if (key !== expected) {
        // Wrong letter sound
        new Audio(`${effectAudioPath}/ERROR.mp3`).play().catch(console.error);
        return;
      }

      // Correct letter sound
      new Audio(`${letterAudioPath}/${key.toUpperCase()}.mp3`).play().catch(console.error);

      // Advance or complete
      const next = currentIndex + 1;
      if (next >= word.length) {
        setCurrentIndex(next);
        // Play bonus then advance shortly after
        const bonus = new Audio(`${effectAudioPath}/BONUS.mp3`);
        bonus.play().catch(console.error);
        bonus.addEventListener('ended', () => {
          setTimeout(() => onComplete(), 0);
        });
      } else {
        setCurrentIndex(next);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, word, letterAudioPath, onComplete]);

  // Render letters
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {word.split('').map((char, idx) => {
          let color = 'red'; // pending
          if (idx < currentIndex) color = 'green'; // typed
          if (idx === currentIndex) color = 'yellow'; // current
          const fontSize = `${Math.min(20, 100 / word.length)}vw`;
          const underline = idx === currentIndex;
          return (
            <span
              key={idx}
              style={{
                color,
                textDecoration: underline ? 'underline' : 'none',
                textDecorationColor: underline ? color : undefined,
                textDecorationThickness: underline ? '2px' : undefined,
                fontSize,
                fontWeight: 700,
                userSelect: 'none',
              }}
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