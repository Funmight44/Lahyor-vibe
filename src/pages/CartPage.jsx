import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartPage() {
  const { cart, subtotal, updateQuantity, removeProduct } = useCart();

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="page-shell">
        <section className="section-block top-offset">
          <div className="container empty-state narrow-state">
            <h1>Your cart is empty</h1>
            <p>Add products from the shop to start building your order.</p>
            <Link to="/shop" className="primary-btn">
              Continue shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const whatsappMessage = [
    'Hello Lahyor Ventures, I would like to place an order.',
    '',
    ...cart.flatMap((item) => [
      item.title,
      `Quantity: ${item.quantity}`,
      `Price: ${formatPrice(item.price)}`,
      `Total: ${formatPrice(item.price * item.quantity)}`,
      '',
    ]),
    `Order Total: ${formatPrice(subtotal)}`,
  ].join('\n');

  const whatsappLink = `https://wa.me/2347067325018?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="page-shell">
      <section className="section-block top-offset">
        <div className="container cart-layout">
          <div className="cart-list">
            <div className="shop-heading-row">
              <div>
                <p className="eyebrow">Your basket</p>
                <h1>Cart summary</h1>
              </div>
              <span className="results-badge">{cartTotalItems} items</span>
            </div>

            {cart.map((item) => (
              <article key={item.id} className="cart-item">
                <img src={item.imgpath} alt={item.title} className="cart-item-image" />

                <div className="cart-item-content">
                  <div>
                    <h2>{item.title}</h2>
                    <p>{formatPrice(item.price)} each</p>
                  </div>

                  <div className="cart-controls">
                    <div className="quantity-row compact-quantity">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity for ${item.title}`}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value) || 1)}
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity for ${item.title}`}
                      >
                        +
                      </button>
                    </div>

                    <button type="button" className="text-link" onClick={() => removeProduct(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>

                <p className="cart-item-total">{formatPrice(item.price * item.quantity)}</p>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Total items</span>
              <strong>{cartTotalItems}</strong>
            </div>
            <Link to="/shop" className="secondary-btn block-btn">
              Continue shopping
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="primary-btn block-btn"
            >
              Order on WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
