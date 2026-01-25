import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/' className='nav-link'>
              Page de jeu
            </Link>
          </li>
          <li>
            <Link to='/assets' className='nav-link'>
              Assets
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
