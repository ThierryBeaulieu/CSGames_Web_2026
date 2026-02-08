import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar({ easterEggVisible }) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/' className='nav-link'>Game Page</Link>
          </li>
          <li>
            <Link to='/game-editor' className='nav-link'>Game Editor</Link>
          </li>
          <li>
            <Link to='/character-editor' className='nav-link'>Character Editor</Link>
          </li>
          {easterEggVisible && (
            <li>
              <Link to='/easter-egg' className='nav-link'>Easter Egg</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
