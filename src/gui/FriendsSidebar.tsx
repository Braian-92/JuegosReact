import React from 'react';
import './FriendsSidebar.css';

const fakeUsers = [
  { id: 'lucas_95', avatar: '👦' },
  { id: 'milena_g', avatar: '👧' },
  { id: 'juli_robot', avatar: '🤖' },
  { id: 'martin.dev', avatar: '🧔' }
];

export default function FriendsSidebar() {
  return (
    <div className="friends-sidebar">
      <h3>👥 Agregar Amigos</h3>
      <ul className="friend-list">
        {fakeUsers.map(user => (
          <li key={user.id} className="friend-item">
            <span className="avatar">{user.avatar}</span>
            <span>{user.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
