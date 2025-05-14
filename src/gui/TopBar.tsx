import React, { useState } from 'react';
import './TopBar.css';
import FriendsSidebar from './FriendsSidebar';
import InventoryPanel from './InventoryPanel';
import LevelBar from './LevelBar';

interface TopBarProps {
  overrideXp?: number;
  overrideLevel?: number;
  extraButton?: {
    label: string;
    onClick?: () => void;
  };
}

export default function TopBar({ overrideXp, overrideLevel, extraButton }: TopBarProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const xp = overrideXp ?? 0;
  const level = overrideLevel ?? Math.floor(xp / 100) + 1;

  const toggleSidebar = () => setShowSidebar(prev => !prev);
  const toggleInventory = () => setShowInventory(prev => !prev);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error al intentar pantalla completa: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => {
        console.error(`Error al salir de pantalla completa: ${err.message}`);
      });
      setIsFullscreen(false);
    }
  };

  return (
    <>
      <div className="top-bar">
        <button className="top-button">🧑 Usuario</button>

        <div className="top-center">
          <LevelBar xp={xp} level={level} />
          <button className="top-button">⭐ {xp}</button>
          <button className="top-button" onClick={toggleInventory}>
            {showInventory ? '✖️ Inventario' : '🧳 Inventario'}
          </button>
        </div>

        <div className="top-right" style={{ display: 'flex', gap: '0.5rem' }}>
          {extraButton && (
            <button className="top-button" onClick={extraButton.onClick}>
              {extraButton.label}
            </button>
          )}
          <button className="top-button" onClick={toggleFullscreen}>
            {isFullscreen ? '↙️ Minimizar' : '↗️ Maximizar'}
          </button>
          <button className="top-button" onClick={toggleSidebar}>
            {showSidebar ? '✖️ Amigos' : '👥 Amigos'}
          </button>
        </div>
      </div>

      {showSidebar && <FriendsSidebar />}
      {showInventory && <InventoryPanel onClose={toggleInventory} itemScale={1.5} />}
    </>
  );
}
