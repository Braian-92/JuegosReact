import React from 'react';

interface ScorePanelProps {
  correctLetters: number;
  completedWords: number;
  mistakes: number;
}

const ScorePanel: React.FC<ScorePanelProps> = ({
  correctLetters,
  completedWords,
  mistakes
}) => (
  <div style={{
    position:       'absolute',
    top:            '1rem',
    right:          '1rem',
    backgroundColor:'rgba(0, 0, 0, 0.6)',
    color:          'white',
    padding:        '0.75rem 1rem',
    borderRadius:   '8px',
    fontFamily:     'sans-serif',
    fontSize:       '1rem',
    lineHeight:     1.5,
    pointerEvents:  'none',
    zIndex:         2
  }}>
    <div><strong>Letras correctas:</strong> {correctLetters}</div>
    <div><strong>Palabras completadas:</strong> {completedWords}</div>
    <div><strong>Errores:</strong> {mistakes}</div>
  </div>
);

export default ScorePanel;
