import React from 'react';
import './InventoryPanel.css';

interface Props {
  onClose: () => void;
  itemScale?: number;
}

// 200 iconos (recortado para mostrar ejemplo)
const ALL_STICKERS = [
  '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯',
  '🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🐤','🦆',
  '🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛',
  '🦋','🐌','🐞','🐜','🪰','🪲','🪳','🕷','🕸','🦂',
  '🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀',
  '🐡','🐠','🐟','🐬','🐳','🐋','🦈','🪸','🐊','🐅',
  '🐆','🦓','🦍','🦧','🐘','🦣','🦛','🦏','🐪','🐫',
  '🦒','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙',
  '🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🪶','🐓',
  '🦃','🦤','🪽','🐇','🦝','🦨','🦡','🦫','🦦','🦥',
  '🐁','🐀','🐿','🦔','🐾','🐉','🐲','🌵','🎄','🌲',
  '🌳','🌴','🪵','🌱','🌿','☘️','🍀','🎍','🪴','🎋',
  '🍃','🍂','🍁','🍄','🐚','🪨','🌾','💐','🌷','🌹',
  '🥀','🌺','🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚',
  '🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','🌎',
  '🌍','🌏','🪐','💫','⭐','🌟','✨','⚡','☄️','💥',
  '🔥','🌪','🌈','☀️','🌤','⛅','🌥','☁️','🌦','🌧',
  '⛈','🌩','🌨','❄️','☃️','⛄','🌬','💨','🌀','🌫',
  '🌊','💧','💦','🌫️','🛸','🚀','✈️','🛰','🛩','🛫',
  '🛬','🚁','🛸','🚢','⛴','🛥','🚤','⛵','🛶','🚣',
  '🚠','🚟','🚞','🚄','🚅','🚈','🚂','🚆','🚇','🚉'
];

const UNLOCKED = [0, 1, 5, 12, 25, 50, 77, 123, 150, 199];

export default function InventoryPanel({ onClose, itemScale = 1 }: Props) {
  const minSize = 60 * itemScale;

  return (
    <div className="inventory-overlay">
      <div className="inventory-panel">
        <div className="inventory-header">
          <h2>🎒 Inventario</h2>
          <button onClick={onClose} className="close-btn">✖️</button>
        </div>
        <div
          className="inventory-grid"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${minSize}px, 1fr))`
          }}
        >
          {ALL_STICKERS.map((item, index) => {
            const unlocked = UNLOCKED.includes(index);
            return (
              <div
                key={index}
                className={`inventory-item ${unlocked ? 'unlocked' : 'locked'}`}
                style={{
                  fontSize: `${1.5 * itemScale}rem`
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
