import NavBar from './Components/NavBar';
import { Routes, Route } from 'react-router-dom';
import GamePage from './Pages/GamePage';
import AssetsPage from './Pages/AssetsPage';
import AssetPage from './Pages/AssetPage';
import './App.css';
import GameEditorPage from './Pages/GameEditorPage';

function App() {
  const routes = [
    { path: '*', element: <GamePage /> },
    { path: '/management', element: <GameEditorPage /> },
    { path: '/assets', element: <AssetsPage /> },
    { path: '/assets/:id', element: <AssetPage /> },
  ];

  return (
    <div className='app-container'>
      <NavBar />
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
