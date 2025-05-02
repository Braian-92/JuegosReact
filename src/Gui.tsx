import React from 'react';
import WriteModule from './components/WriteModule';

interface GuiProps {
  word: string;
  onComplete: () => void;
}

const Gui: React.FC<GuiProps> = ({ word, onComplete }) => (
  <div style={{
    position:       'absolute',
    top:            0,
    left:           0,
    width:          '100vw',
    height:         '100vh',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    zIndex:         1,
    pointerEvents:  'auto'
  }}>
    <WriteModule word={word} onComplete={onComplete} />
  </div>
);

export default Gui;