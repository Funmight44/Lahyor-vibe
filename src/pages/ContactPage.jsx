export default function ContactPage() {
  return (
    <main className="page-shell">
      <section className="section-block top-offset">
        <div className="container content-page contact-layout">
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Let’s talk about your order</h1>
            <p>
              Reach out to Lahyor Ventures for product enquiries, custom requests, and order coordination.
            </p>

            <div className="contact-list">
              <a href="tel:+2347067325018">Phone: +234 706 732 5018</a>
              <a href="mailto:lahyor44@gmail.com">Email: lahyor44@gmail.com</a>
              <span>Address: Sango Ota, Ogun State, Nigeria</span>
              <a
                href="https://wa.me/2347067325018?text=Hello%20Lahyor%20Ventures%2C%20I%20would%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp order request
              </a>
            </div>
          </div>

          <div className="contact-card">
            <h2>How to order</h2>
            <ol>
              <li>Browse the catalogue and add preferred items to the cart.</li>
              <li>Review your order on the cart page.</li>
              <li>Send the order summary through WhatsApp or email.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
