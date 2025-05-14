import React from 'react';
import MainMenu from './menu/MainMenu';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <MainMenu />
    </UserProvider>
  );
}
