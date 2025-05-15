import React, { useState } from 'react';
import './TopBar.css';
import FriendsSidebar from './FriendsSidebar';
import InventoryPanel from './InventoryPanel';
import LevelBar from './LevelBar';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

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
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const xp = overrideXp ?? user?.xp ?? 0;
  const level = overrideLevel ?? user?.level ?? 1;

  const toggleSidebar = () => setShowSidebar(prev => !prev);
  const toggleInventory = () => setShowInventory(prev => !prev);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        <div className="top-left">
          <button className="top-button">👤 Usuario Demo 1</button>
          <button className="top-button" onClick={handleLogout}>🚪 Salir</button>
        </div>

        <div className="top-center">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="counter">{level}</div>
            <LevelBar xp={xp} level={level} />
            <div className="counter">100</div>
          </div>
          <button className="top-button">⭐ {xp}</button>
          <button className="top-button" onClick={toggleInventory}>
            🎒 Inventario
          </button>
        </div>

        <div className="top-right">
          {extraButton && (
            <button className="top-button" onClick={extraButton.onClick}>
              {extraButton.label}
            </button>
          )}
          <button className="top-button" onClick={toggleFullscreen}>
            {isFullscreen ? '↙️ Minimizar' : '↗️ Maximizar'}
          </button>
          <button className="top-button" onClick={toggleSidebar}>
            👥 Amigos
          </button>
        </div>
      </div>

      {showSidebar && <FriendsSidebar />}
      {showInventory && <InventoryPanel onClose={toggleInventory} itemScale={1.5} />}
    </>
  );
}
