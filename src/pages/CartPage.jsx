import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartPage() {
  const { cart, subtotal, updateQuantity, removeProduct, clearCart } = useCart();
  const [customerDetails, setCustomerDetails] = useState({ customerName: '', phone: '', email: '' });
  const [submissionState, setSubmissionState] = useState({ status: 'idle', orderId: '', message: '' });

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (submissionState.status === 'success') {
    return (
      <main className="page-shell">
        <section className="section-block top-offset">
          <div className="container empty-state narrow-state order-success-page" role="status">
            <p className="eyebrow">Order received</p>
            <h1>Thank you for your order</h1>
            <div className="order-success">
              <strong>Your order has been received.</strong>
              <span>Order ID: {submissionState.orderId}</span>
              <small>Lahyor Ventures will follow up with you about your order.</small>
            </div>
            <Link to="/shop" className="primary-btn">Continue shopping</Link>
          </div>
        </section>
      </main>
    );
  }

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

  const handleDetailChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails((currentDetails) => ({ ...currentDetails, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const webhookUrl = import.meta.env.VITE_N8N_ORDER_WEBHOOK_URL;

    if (!webhookUrl) {
      setSubmissionState({
        status: 'error',
        orderId: '',
        message: 'Online ordering is not configured yet. Please use WhatsApp or try again later.',
      });
      return;
    }

    const orderId = `LV-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const orderPayload = {
      orderId,
      ...customerDetails,
      products: cart.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      total: subtotal,
      orderDate: new Date().toISOString(),
      status: 'New',
    };

    setSubmissionState({ status: 'submitting', orderId: '', message: '' });

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error('Webhook request failed');
      }

      clearCart();
      setSubmissionState({ status: 'success', orderId, message: '' });
    } catch {
      setSubmissionState({
        status: 'error',
        orderId: '',
        message: 'We could not submit your order. Please check your connection and try again.',
      });
    }
  };

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

            <div className="checkout-panel">
              <p className="eyebrow">Checkout</p>
              <h2>Place your order</h2>
              <p className="checkout-intro">Enter your details and we will receive your order request.</p>

              <form className="checkout-form" onSubmit={handleSubmit}>
                  <label htmlFor="customerName">Full name</label>
                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    autoComplete="name"
                    value={customerDetails.customerName}
                    onChange={handleDetailChange}
                    required
                  />

                  <label htmlFor="phone">Phone number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={customerDetails.phone}
                    onChange={handleDetailChange}
                    required
                  />

                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={customerDetails.email}
                    onChange={handleDetailChange}
                    required
                  />

                  {submissionState.status === 'error' && (
                    <p className="form-message error-message" role="alert">{submissionState.message}</p>
                  )}

                  <button type="submit" className="primary-btn block-btn" disabled={submissionState.status === 'submitting'}>
                    {submissionState.status === 'submitting' ? 'Sending order...' : 'Submit order'}
                  </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
