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

  // Play word audio when word changes
  useEffect(() => {
    setCurrentIndex(0);
    const audio = new Audio(wordAudioSrc);
    audio.play().catch((err) => console.error('Error reproduciendo palabra:', err));
  }, [word, wordAudioSrc]);

  // Handle key presses for letters
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expected = word[currentIndex]?.toLowerCase();
      if (!/^[a-zñ]$/.test(key)) return;
      if (key === expected) {
        // Play letter audio
        new Audio(`${letterAudioPath}/${key.toUpperCase()}.mp3`).play().catch(console.error);
        const next = currentIndex + 1;
        if (next >= word.length) {
          onComplete();
        } else {
          setCurrentIndex(next);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, word, letterAudioPath, onComplete]);

  // Render each letter with inline styles
  const renderLetter = (char: string, idx: number) => {
    let color = 'red';         // pending
    if (idx < currentIndex) color = 'green';  // typed
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
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {word.split('').map(renderLetter)}
      </div>
    </div>
  );
};

export default WriteModule;
