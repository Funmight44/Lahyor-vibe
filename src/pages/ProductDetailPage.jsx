import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { buildProductUrl, formatCategoryLabel, formatPrice, products } from '../data/products';

export default function ProductDetailPage() {
  const { category, id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(
    () => products.find((item) => item.category === category && item.id === id),
    [category, id],
  );

  if (!product) {
    return (
      <main className="page-shell">
        <section className="section-block top-offset">
          <div className="container empty-state narrow-state">
            <h1>Product not found</h1>
            <p>The product you are looking for is not available right now.</p>
            <Link to="/shop" className="primary-btn">
              Back to shop
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <main className="page-shell">
      <section className="section-block top-offset">
        <div className="container detail-layout">
          <div className="detail-image-wrap">
            <img
              src={product.imgpath}
              alt={product.title}
              className="detail-image"
              onError={(event) => {
                event.currentTarget.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80';
              }}
            />
          </div>

          <div className="detail-info">
            <p className="eyebrow">{formatCategoryLabel(product.category)}</p>
            <h1>{product.title}</h1>
            <p className="detail-price">{formatPrice(product.price)}</p>
            <p className="detail-description">{product.description}</p>

            <dl className="detail-meta">
              <div>
                <dt>Category</dt>
                <dd>{formatCategoryLabel(product.category)}</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>{product.size || 'Standard'}</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>{product.inStock ? 'In stock' : 'Currently unavailable'}</dd>
              </div>
            </dl>

            <div className="purchase-box">
              <label htmlFor="quantity">Quantity</label>
              <div className="quantity-row">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                />
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="primary-btn large-btn"
                onClick={() => addToCart(product, quantity)}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to cart' : 'Currently unavailable'}
              </button>
            </div>

            <div className="detail-actions">
              <Link to="/shop" className="secondary-btn">
                Continue shopping
              </Link>
              <Link to="/cart" className="primary-btn">
                View cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section-block muted">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">You may also like</p>
              <h2>More from this category</h2>
            </div>

            <div className="product-grid compact-grid">
              {relatedProducts.map((item) => (
                <article key={item.id} className="product-card">
                  <Link to={buildProductUrl(item)} className="product-image-link">
                    <img src={item.imgpath} alt={item.title} className="product-image" />
                  </Link>
                  <div className="product-body">
                    <h3>
                      <Link to={buildProductUrl(item)}>{item.title}</Link>
                    </h3>
                    <p className="product-price">{formatPrice(item.price)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
