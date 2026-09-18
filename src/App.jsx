
import { Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShopPage from './pages/ShopPage';

function App() {
  return (
    <CartProvider>
      <div className="app-shell">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:category/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <footer className="site-footer">
          <div className="container footer-grid">
            <div className="footer-brand" >
              <span className="brand-mark" aria-hidden="true">LV</span>
              <div>
                <h3>Lahyor Ventures</h3>
                <p>Luxury essentials for life’s memorable moments.</p>
              </div>
            </div>

            <div className="footer-column">
              <h4>Explore</h4>
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>
              <a href="tel:+2347067325018">+234 706 732 5018</a>
              <a href="mailto:lahyor44@gmail.com">lahyor44@gmail.com</a>
              <span>Sango Ota, Ogun State</span>
            </div>

            <div className="footer-column">
              <h4>Connect</h4>
              <a href="https://wa.me/2347067325018?text=Hello%20Lahyor%20Ventures%2C%20I%20would%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href="mailto:lahyor44@gmail.com">Email us</a>
            </div>
          </div>

          <div className="container footer-bottom">
            <p>© {new Date().getFullYear()} Lahyor Ventures. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
