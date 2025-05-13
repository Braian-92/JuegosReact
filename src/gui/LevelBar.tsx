import React from 'react';
import './LevelBar.css';

interface Props {
  xp: number;
  level: number;
}

export default function LevelBar({ xp, level }: Props) {
  const progress = Math.min((xp % 100), 100);

  return (
    <div className="level-bar-container">
      <div className="level-indicator">{level}</div>
      <div className="level-bar-track">
        <div className="level-bar-fill" style={{ width: `${progress}%` }} />
        <div className="level-bar-labels">
          <span>{progress}</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
