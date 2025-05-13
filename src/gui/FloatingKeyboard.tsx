import React from 'react';
import './FloatingKeyboard.css';

interface Props {
  onKeyPress: (key: string) => void;
  scale?: number; // Escala opcional
}

const keys: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export default function FloatingKeyboard({ onKeyPress, scale = 1 }: Props) {
  return (
    <div
      className="floating-keyboard"
      style={{
        transform: `translateX(-50%) scale(${scale})`,
        transformOrigin: 'bottom center'
      }}
    >
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button key={key} className="key" onClick={() => onKeyPress(key)}>
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
