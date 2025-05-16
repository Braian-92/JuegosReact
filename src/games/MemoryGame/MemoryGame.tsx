import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import TopBar from '../../gui/TopBar';
import './MemoryGame.css';

interface Card {
    id: number;
    icon: string;
    isFlipped: boolean;
    isMatched: boolean;
}

interface MemoryGameProps {
    onExit: () => void;
}

const ICONS = ['✍️', '🧩', '🧠', '🖼️', '✏️', '🔠', '☠️', '🔊', '🎁'];
const XP_PER_MATCH = 10;
const GRID_SIZE = 4; // 4x4 grid = 16 cards = 8 pares

export default function MemoryGame({ onExit }: MemoryGameProps) {
    const { addXp } = useUser();
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [isLocked, setIsLocked] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const totalPairs = (GRID_SIZE * GRID_SIZE) / 2;

    // Inicializar el juego
    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        // Seleccionar iconos aleatorios
        const selectedIcons = ICONS.sort(() => Math.random() - 0.5).slice(0, totalPairs);
        // Duplicar los iconos para crear pares
        const pairedIcons = [...selectedIcons, ...selectedIcons];
        // Mezclar los iconos
        const shuffledIcons = pairedIcons.sort(() => Math.random() - 0.5);
        
        // Crear las cartas
        const newCards = shuffledIcons.map((icon, index) => ({
            id: index,
            icon,
            isFlipped: false,
            isMatched: false
        }));

        setCards(newCards);
        setFlippedCards([]);
        setMatchedPairs(0);
    };

    const handleCardClick = async (cardId: number) => {
        // Evitar clicks mientras se procesan cartas o si la carta ya está volteada
        if (isLocked || 
            flippedCards.includes(cardId) || 
            cards[cardId].isMatched ||
            flippedCards.length === 2) {
            return;
        }

        // Voltear la carta
        const newCards = [...cards];
        newCards[cardId].isFlipped = true;
        setCards(newCards);

        // Agregar a las cartas volteadas
        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        // Si hay dos cartas volteadas
        if (newFlippedCards.length === 2) {
            setIsLocked(true);
            const [firstCard, secondCard] = newFlippedCards;

            // Verificar si son iguales
            if (cards[firstCard].icon === cards[secondCard].icon) {
                // ¡Coincidencia!
                newCards[firstCard].isMatched = true;
                newCards[secondCard].isMatched = true;
                setCards(newCards);
                setMatchedPairs(prev => prev + 1);
                await addXp(XP_PER_MATCH);
                
                // Verificar si el juego terminó
                if (matchedPairs + 1 === totalPairs) {
                    setTimeout(() => {
                        alert('¡Felicitaciones! Has completado el juego.');
                        onExit();
                    }, 500);
                }
            }

            // Después de un tiempo, voltear las cartas de nuevo si no coinciden
            setTimeout(() => {
                if (!newCards[firstCard].isMatched) {
                    newCards[firstCard].isFlipped = false;
                    newCards[secondCard].isFlipped = false;
                    setCards(newCards);
                }
                setFlippedCards([]);
                setIsLocked(false);
            }, 1000);
        }
    };

    return (
        <div className="memory-game-container">
            <TopBar />
            <div className="memory-game-content">
                <h2>Juego de Memoria</h2>
                <div className="memory-grid">
                    {cards.map(card => (
                        <div
                            key={card.id}
                            className={`memory-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                            onClick={() => handleCardClick(card.id)}
                        >
                            <div className="memory-card-inner">
                                <div className="memory-card-front">❓</div>
                                <div className="memory-card-back">{card.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="exit-button" onClick={onExit}>
                    Volver al Menú
                </button>
            </div>
        </div>
    );
} 