import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import './App.css';
import GamePage from './Pages/GamePage';
import AssetsPage from './Pages/AssetsPage';
import AssetPage from './Pages/AssetPage';

function App() {
  const routes = [
    { path: '*', element: <GamePage /> },
    { path: '/assets', element: <AssetsPage /> },
    { path: '/assets/:id', element: <AssetPage /> },
  ];
  return (
    <div>
      <NavBar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
