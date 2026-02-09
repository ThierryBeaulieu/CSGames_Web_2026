import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar({ easterEggVisible, emojisEnabled }) {
  // Helper function to add emoji if enabled
  const withEmoji = (text, emoji) => (emojisEnabled ? `${emoji} ${text}` : text);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/' className='nav-link'>
              {withEmoji('Game Page', '🌟')}
            </Link>
          </li>
          {easterEggVisible && (
            <li>
              <Link to='/easter-egg' className='nav-link'>
                {withEmoji('Easter Egg', '🐣')}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
