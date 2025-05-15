import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Login from './components/Login/Login';
import MainMenu from './menu/MainMenu';
import './App.css';

// Componente para proteger rutas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <UserProvider>
      <Router basename="/JuegoEscritura">
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <MainMenu />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
