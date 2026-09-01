
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
          <div className="container footer-shell">
            <p>© {new Date().getFullYear()} Lahyor Ventures</p>
            <div className="footer-links">
              <Link to="/contact">Contact</Link>
              <Link to="/shop">Shop</Link>
              <a href="https://wa.me/?text=Hello%20Lahyor%20Ventures%2C%20I%20would%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
