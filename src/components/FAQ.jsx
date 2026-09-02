import { useState } from 'react';

const questions = [
  {
    question: 'What products does Lahyor Ventures offer?',
    answer: 'Lahyor Ventures offers a selection of cakes, decorations, male wears, and female wears for birthdays, weddings, celebrations, and everyday needs.',
  },
  {
    question: 'How can I place an order?',
    answer: 'You can browse our products, add your preferred items to your cart, and use the Order on WhatsApp option to send your order directly to Lahyor Ventures.',
  },
  {
    question: 'Can I order a customized cake?',
    answer: 'Yes. For customized cakes, contact Lahyor Ventures through WhatsApp to discuss your preferred design, size, flavor, and other requirements.',
  },
  {
    question: 'How do I contact Lahyor Ventures?',
    answer: 'You can contact Lahyor Ventures directly through WhatsApp using the Order on WhatsApp or contact options available on the website.',
  },
  {
    question: 'Can I order decorations for an event?',
    answer: 'Yes. Lahyor Ventures offers decoration services for celebrations and events. Contact us through WhatsApp to discuss your event requirements.',
  },
  {
    question: 'How can I know if a product is available?',
    answer: 'Product availability is displayed on the product listing and product details page. Products marked as unavailable cannot be added to the cart.',
  },
  {
    question: 'Can I order multiple products at once?',
    answer: 'Yes. Add all the products you want to your cart, adjust the quantities, and then proceed with the WhatsApp ordering option.',
  },
  {
    question: 'How will I receive my order?',
    answer: 'Order and delivery arrangements will be confirmed with Lahyor Ventures when you contact us through WhatsApp.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section className="section-block faq-section" aria-labelledby="faq-heading">
      <div className="container faq-container">
        <div className="section-heading faq-heading">
          <p className="eyebrow">Need to know more?</p>
          <h2 id="faq-heading">Frequently Asked Questions</h2>
          <p>Find quick answers about our products, ordering process, and services.</p>
        </div>

        <div className="faq-list">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article key={item.question} className={`faq-item${isOpen ? ' open' : ''}`}>
                <h3 className="faq-question-heading">
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleQuestion(index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                </h3>
                <div id={answerId} className="faq-answer" role="region" aria-hidden={!isOpen}>
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}