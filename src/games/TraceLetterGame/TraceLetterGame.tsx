import React, { useEffect, useRef, useState } from 'react';
import { AudioManager } from '../../core/logic/audioPlayer';
import TopBar from '../../gui/TopBar';
import './TraceLetterGame.css';

interface TraceLetterGameProps {
  onExit?: () => void;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
}

const VOCALES = ['A', 'E', 'I', 'O', 'U'];
const XP_POR_LETRA = 3;
const CANVAS_SIZE = 400;
const LINE_WIDTH = 4;

export default function TraceLetterGame({ onExit }: TraceLetterGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const level = Math.floor(xp / 100) + 1;

  const drawScene = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Dibujar la letra grande de fondo
    ctx.font = 'bold 300px Arial';
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(VOCALES[currentLetter], CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    // Configurar el estilo para los trazos
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Dibujar todos los trazos completados
    strokes.forEach(stroke => {
      if (stroke.points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      }
    });

    // Dibujar el trazo actual
    if (currentStroke.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
      for (let i = 1; i < currentStroke.length; i++) {
        ctx.lineTo(currentStroke[i].x, currentStroke[i].y);
      }
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    
    drawScene(ctx);
  }, [currentLetter, strokes, currentStroke]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCurrentStroke([{ x, y }]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCurrentStroke(prev => [...prev, { x, y }]);
  };

  const handleMouseUp = () => {
    if (currentStroke.length > 0) {
      setStrokes(prev => [...prev, { points: currentStroke }]);
      setCurrentStroke([]);
    }
    setIsDrawing(false);
  };

  const handleNextLetter = () => {
    const letra = VOCALES[currentLetter];
    if (!completedLetters.includes(letra)) {
      setCompletedLetters(prev => [...prev, letra]);
      setXp(prev => prev + XP_POR_LETRA);
      AudioManager.playSound('success');
    }

    if (currentLetter < VOCALES.length - 1) {
      setCurrentLetter(prev => prev + 1);
      setStrokes([]);
      setCurrentStroke([]);
    } else {
      alert('¡Felicitaciones! Has completado todas las vocales.');
      onExit?.();
    }
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
  };

  return (
    <div className="trace-game">
      <TopBar 
        overrideXp={xp} 
        overrideLevel={level}
        extraButton={{ label: '↩ Volver', onClick: onExit }}
      />
      
      <div className="trace-container">
        <h2>Traza la letra: {VOCALES[currentLetter]}</h2>
        <p className="instructions">Dibuja la letra libremente</p>
        
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          
          <div className="button-container">
            <button className="clear-button" onClick={clearCanvas}>
              Borrar ✨
            </button>
            <button className="next-button" onClick={handleNextLetter}>
              Siguiente ➡️
            </button>
          </div>
        </div>

        <div className="progress-container">
          {VOCALES.map((letra, index) => (
            <div
              key={letra}
              className={`progress-letter ${
                completedLetters.includes(letra) ? 'completed' : ''
              } ${currentLetter === index ? 'current' : ''}`}
            >
              {letra}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 