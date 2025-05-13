import React, { useState } from 'react';
import './TopBar.css';
import FriendsSidebar from './FriendsSidebar';
import InventoryPanel from './InventoryPanel';

export default function TopBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  const toggleInventory = () => {
    setShowInventory(prev => !prev);
  };

  return (
    <>
      <div className="top-bar">
        <button className="top-button">🧑 Usuario</button>
        <div className="top-center">
          <button className="top-button">⭐ 0</button>
          <button className="top-button" onClick={toggleInventory}>
            {showInventory ? '✖️ Cerrar inventario' : '🧳 Inventario'}
          </button>
        </div>
        <button className="top-button" onClick={toggleSidebar}>
          {showSidebar ? '✖️ Cerrar' : '👥 Agregar amigo'}
        </button>
      </div>

      {showSidebar && <FriendsSidebar />}
      {showInventory && <InventoryPanel onClose={toggleInventory} itemScale={1.5} />}
    </>
  );
}
