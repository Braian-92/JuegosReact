import React, { useEffect, useRef, useState } from 'react';
import { AudioManager } from '../../core/logic/audioPlayer';
import TopBar from '../../gui/TopBar';
import { useUser } from '../../context/UserContext';
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
  const { xp, level, addXp } = useUser();

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

  const handleNextLetter = () => {
    if (currentLetter < VOCALES.length - 1) {
      // Reproducir sonido de éxito
      AudioManager.playSound('success');
      
      // Esperar a que termine el sonido antes de cambiar de letra
      setTimeout(() => {
        setCurrentLetter(prev => prev + 1);
        setStrokes([]);
        setCurrentStroke([]);
        addXp(XP_POR_LETRA);
        setCompletedLetters(prev => [...prev, VOCALES[currentLetter]]);
      }, 1000);
    } else {
      // Si es la última letra, reproducir el sonido y mostrar mensaje
      AudioManager.playSound('success');
      setTimeout(() => {
        alert('¡Felicitaciones! Has completado todas las vocales.');
        onExit?.();
      }, 1000);
    }
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      drawScene(ctx);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentStroke([{ x, y }]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentStroke(prev => [...prev, { x, y }]);
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawScene(ctx);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setStrokes(prev => [...prev, { points: currentStroke }]);
      setCurrentStroke([]);
      setIsDrawing(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawScene(ctx);
      }
    }
  }, [currentLetter, strokes, currentStroke]);

  // Reproducir el sonido de la letra actual cuando cambia
  useEffect(() => {
    AudioManager.playSound('letter', VOCALES[currentLetter]);
  }, [currentLetter]);

  return (
    <div className="page-container">
      <TopBar overrideXp={xp} overrideLevel={level} extraButton={{ label: '↩ Volver', onClick: onExit }} />
      
      <div className="content-container">
        <h2>{currentLetter}</h2>
        <p className="instructions">Dibujá la letra siguiendo los puntos</p>
        
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          <div className="button-container">
            <button className="clear-button" onClick={clearCanvas}>
              Borrar
            </button>
            <button className="next-button" onClick={handleNextLetter}>
              Siguiente
            </button>
          </div>
        </div>

        <div className="progress-container">
          {VOCALES.map((letter, index) => (
            <div
              key={letter}
              className={`progress-letter ${
                completedLetters.includes(letter)
                  ? 'completed'
                  : letter === VOCALES[currentLetter]
                  ? 'current'
                  : ''
              }`}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 