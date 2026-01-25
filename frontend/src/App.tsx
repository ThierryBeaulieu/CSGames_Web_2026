import NavBar from './Components/NavBar';
import { Routes, Route } from 'react-router-dom';
import GamePage from './Pages/GamePage';
import AssetsPage from './Pages/AssetsPage';
import AssetPage from './Pages/AssetPage';
import './App.css';
import ManagementPage from './Pages/ManagementPage';

function App() {
  const routes = [
    { path: '*', element: <GamePage /> },
    { path: '/management', element: <ManagementPage /> },
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
