import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/' className='nav-link'>
              Game Page
            </Link>
          </li>

          <li>
            <Link to='/management' className='nav-link'>
              Game Editor
            </Link>
          </li>
          <li>
            <Link to='/assets' className='nav-link'>
              Character Editor
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
