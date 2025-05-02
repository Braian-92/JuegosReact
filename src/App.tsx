import React from 'react';
import Escena from './Escena';
import Gui from './Gui';

const App: React.FC = () => (
  <div className="App w-full h-screen relative overflow-hidden">
    {/* Fondo 3D */}
    <Escena />
    {/* Capa de interfaz */}
    <Gui />
  </div>
);

export default App;