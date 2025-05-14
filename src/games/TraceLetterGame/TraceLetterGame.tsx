import React, { useEffect, useRef, useState } from 'react';
import { AudioManager } from '../../core/logic/audioPlayer';
import TopBar from '../../gui/TopBar';
import { LETTER_PATHS, POINT_RADIUS, LINE_WIDTH, POINT_COLOR, LINE_COLOR, GUIDE_COLOR, ACTIVE_POINT_COLOR, COMPLETED_POINT_COLOR } from './letterPaths';
import './TraceLetterGame.css';

interface TraceLetterGameProps {
  onExit?: () => void;
}

interface Point {
  x: number;
  y: number;
}

const VOCALES = ['A', 'E', 'I', 'O', 'U'];
const XP_POR_LETRA = 3;
const CANVAS_SIZE = 400;
const POINT_THRESHOLD = POINT_RADIUS * 1.5;

export default function TraceLetterGame({ onExit }: TraceLetterGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastValidPointRef = useRef<Point | null>(null);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoint, setCurrentPoint] = useState<number>(1);
  const [completedPoints, setCompletedPoints] = useState<number[]>([]);
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
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

    const letterPath = LETTER_PATHS[VOCALES[currentLetter]];
    if (!letterPath) return;

    // Dibujar las líneas guía
    ctx.beginPath();
    ctx.strokeStyle = GUIDE_COLOR;
    ctx.lineWidth = LINE_WIDTH;
    letterPath.segments.forEach(([start, end]) => {
      const startPoint = letterPath.points[start];
      const endPoint = letterPath.points[end];
      ctx.moveTo(startPoint.x * CANVAS_SIZE, startPoint.y * CANVAS_SIZE);
      ctx.lineTo(endPoint.x * CANVAS_SIZE, endPoint.y * CANVAS_SIZE);
    });
    ctx.stroke();

    // Dibujar los puntos de control
    letterPath.points.forEach(point => {
      ctx.beginPath();
      ctx.fillStyle = completedPoints.includes(point.order)
        ? COMPLETED_POINT_COLOR
        : point.order === currentPoint
        ? ACTIVE_POINT_COLOR
        : POINT_COLOR;
      
      ctx.arc(
        point.x * CANVAS_SIZE,
        point.y * CANVAS_SIZE,
        POINT_RADIUS,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Dibujar el número del orden
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        point.order.toString(),
        point.x * CANVAS_SIZE,
        point.y * CANVAS_SIZE
      );
    });

    // Dibujar el trazo del usuario
    if (points.length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
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
  }, [currentLetter, currentPoint, completedPoints, points]);

  const checkPointProximity = (x: number, y: number) => {
    const letterPath = LETTER_PATHS[VOCALES[currentLetter]];
    if (!letterPath) return;

    const currentControlPoint = letterPath.points.find(p => p.order === currentPoint);
    if (!currentControlPoint) return;

    // Solo verificar si el último punto válido existe (excepto para el primer punto)
    if (currentPoint > 1 && !lastValidPointRef.current) return;

    const distance = Math.sqrt(
      Math.pow((currentControlPoint.x * CANVAS_SIZE - x), 2) +
      Math.pow((currentControlPoint.y * CANVAS_SIZE - y), 2)
    );

    if (distance < POINT_THRESHOLD) {
      if (!completedPoints.includes(currentPoint)) {
        lastValidPointRef.current = { x, y };
        setCompletedPoints(prev => [...prev, currentPoint]);
        AudioManager.playSound('success');

        if (currentPoint === letterPath.points.length) {
          handleLetterComplete();
        } else {
          setCurrentPoint(prev => prev + 1);
        }
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Solo permitir comenzar desde el primer punto si no hay puntos completados
    if (completedPoints.length === 0) {
      const firstPoint = LETTER_PATHS[VOCALES[currentLetter]]?.points[0];
      if (firstPoint) {
        const distance = Math.sqrt(
          Math.pow((firstPoint.x * CANVAS_SIZE - x), 2) +
          Math.pow((firstPoint.y * CANVAS_SIZE - y), 2)
        );
        
        if (distance < POINT_THRESHOLD) {
          setIsDrawing(true);
          setPoints([{ x, y }]);
          checkPointProximity(x, y);
        }
      }
    } else {
      // Continuar desde el último punto válido
      if (lastValidPointRef.current) {
        setIsDrawing(true);
        setPoints([lastValidPointRef.current]);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPoints(prev => [...prev, { x, y }]);
    checkPointProximity(x, y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    // Si no alcanzamos el siguiente punto, volvemos al último punto válido
    if (lastValidPointRef.current) {
      setPoints([lastValidPointRef.current]);
    }
  };

  const handleLetterComplete = () => {
    const letra = VOCALES[currentLetter];
    if (!completedLetters.includes(letra)) {
      setCompletedLetters(prev => [...prev, letra]);
      setXp(prev => prev + XP_POR_LETRA);
      AudioManager.playSound('success');
    }

    if (currentLetter < VOCALES.length - 1) {
      setTimeout(() => {
        setCurrentLetter(prev => prev + 1);
        setCurrentPoint(1);
        setCompletedPoints([]);
        setPoints([]);
        lastValidPointRef.current = null;
      }, 1000);
    } else {
      setTimeout(() => {
        alert('¡Felicitaciones! Has completado todas las vocales.');
        onExit?.();
      }, 1000);
    }
  };

  const clearCanvas = () => {
    setCurrentPoint(1);
    setCompletedPoints([]);
    setPoints([]);
    lastValidPointRef.current = null;
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
        <p className="instructions">Dibuja siguiendo el orden de los puntos</p>
        
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          
          <button className="clear-button" onClick={clearCanvas}>
            Reintentar ✨
          </button>
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