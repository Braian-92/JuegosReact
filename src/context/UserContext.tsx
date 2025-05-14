import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  xp: number;
  level: number;
  addXp: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  const addXp = (amount: number) => {
    setXp(prevXp => {
      const newXp = prevXp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      if (newLevel !== level) {
        setLevel(newLevel);
      }
      return newXp;
    });
  };

  return (
    <UserContext.Provider value={{ xp, level, addXp }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
} 