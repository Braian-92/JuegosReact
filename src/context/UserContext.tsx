import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import config from '../config/config';

interface User {
  id: number;
  nombre: string;
  email: string;
  xp: number;
  level: number;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addXp: (amount: number) => Promise<void>;
  xp: number;
  level: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${config.API_URL}/auth/verify.php`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${config.API_URL}/auth/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Error de autenticación');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const addXp = async (amount: number) => {
    if (!user) return;

    try {
      const response = await fetch(`${config.API_URL}/user/addXp.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ amount })
      });

      if (response.ok) {
        const data = await response.json();
        setUser(prev => prev ? { ...prev, xp: data.xp, level: data.level } : null);
      }
    } catch (error) {
      console.error('Error actualizando XP:', error);
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      addXp,
      xp: user?.xp || 0,
      level: user?.level || 1
    }}>
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