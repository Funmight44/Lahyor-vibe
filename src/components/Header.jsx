import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src="/images/logo.png" alt="Lahyor Ventures Logo" style={{ width: '70px', height: 'auto' }} />
          <span>Lahyor Ventures</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          Menu
        </button>

        <nav
          className={`main-nav ${menuOpen ? 'open' : ''}`}
          aria-label="Main navigation"
        >
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'nav-link nav-cart active' : 'nav-link nav-cart')}
            onClick={closeMenu}
          >
            Cart <span className="cart-badge">{cartCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
