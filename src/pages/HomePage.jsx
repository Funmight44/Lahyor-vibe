import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import ProductCard from '../components/ProductCard';
import { categoryOptions, products } from '../data/products';

const featureList = [
  {
    title: 'Curated collection',
    text: 'Browse cakes, décor, and fashion essentials chosen for everyday occasions and special moments.',
  },
  {
    title: 'Customer-first service',
    text: 'We help customers find the right fit, style, and order details with a simple and welcoming experience.',
  },
  {
    title: 'Simple ordering flow',
    text: 'Use the cart and WhatsApp order request to move from browsing to contact without extra friction.',
  },
];

export default function HomePage() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Fresh finds for everyday and occasion shopping</p>
            <h1>Beautiful essentials from Lahyor Ventures</h1>
            <p className="hero-text">
              Discover curated cakes, elegant décor, and modern fashion with a warm, customer-friendly shopping experience.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="primary-btn large-btn">
                Shop now
              </Link>
              <Link to="/contact" className="secondary-btn large-btn">
                Contact us
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-label="Featured product collage">
            <div className="visual-card tall-card">
              <img
                src="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=900&q=80"
                alt="Celebration cake"
              />
            </div>
            <div className="visual-stack">
              <div className="visual-card">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
                  alt="Fashion clothing"
                />
              </div>
              <div className="visual-card accent">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80"
                  alt="Decor and event styling"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Browse by category</p>
            <h2>Shop what matters to you</h2>
          </div>

          <div className="category-grid">
            {categoryOptions
              .filter((option) => option.value !== 'all')
              .map((option) => (
                <Link key={option.value} to={`/shop?category=${option.value}`} className="category-card">
                  <span>{option.label}</span>
                  <small>Explore products</small>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="section-block muted">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Featured picks</p>
            <h2>Popular this week</h2>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container callout-panel">
          <div>
            <p className="eyebrow">Need a custom order?</p>
            <h2>Let us help you find the right product or gift.</h2>
          </div>
          <Link to="/contact" className="primary-btn large-btn">
            Contact Lahyor Ventures
          </Link>
        </div>
      </section>

      <section className="section-block muted">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Why choose us</p>
            <h2>A thoughtful shopping experience</h2>
          </div>

          <div className="feature-grid">
            {featureList.map((feature) => (
              <article key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </main>
  );
}
