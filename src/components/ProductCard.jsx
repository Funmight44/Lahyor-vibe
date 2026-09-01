import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { buildProductUrl, formatCategoryLabel, formatPrice } from '../data/products';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={buildProductUrl(product)} className="product-image-link" aria-label={`View details for ${product.title}`}>
        <img
          src={product.imgpath}
          alt={product.title}
          className="product-image"
          onError={(event) => {
            event.currentTarget.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80';
          }}
        />
      </Link>

      <div className="product-body">
        <div className="product-tag-row">
          <span className="product-tag">{formatCategoryLabel(product.category)}</span>
          <span className={product.inStock ? 'stock-badge in-stock' : 'stock-badge out-of-stock'}>
            {product.inStock ? 'In stock' : 'Unavailable'}
          </span>
        </div>

        <h3>
          <Link to={buildProductUrl(product)}>{product.title}</Link>
        </h3>

        <p className="product-price">{formatPrice(product.price)}</p>

        <div className="product-actions">
          <Link to={buildProductUrl(product)} className="secondary-btn">
            View details
          </Link>
          <button
            type="button"
            className="primary-btn"
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  );
}
