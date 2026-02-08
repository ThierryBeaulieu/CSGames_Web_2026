import NavBar from './Components/NavBar';
import { Routes, Route } from 'react-router-dom';
import GamePage from './Pages/GamePage';
import './App.css';
import GameEditorPage from './Pages/GameEditorPage';
import EasterEggPage from './Pages/EasterEggPage';
import CharacterEditorPage from './Pages/CharacterEditorPage';
import { useState } from 'react';

function App() {
  const routes = [
    { path: '*', element: <GamePage /> },
    { path: '/game-editor', element: <GameEditorPage /> },
    { path: '/character-editor', element: <CharacterEditorPage /> },
    { path: '/easter-egg', element: <EasterEggPage /> }
  ];
  
  const [isEasterEggVisible, setIsEasterEggVisible] = useState(true);

  return (
    <div className='app-container'>
       <NavBar easterEggVisible={isEasterEggVisible} />
      <div className='main-content'>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;