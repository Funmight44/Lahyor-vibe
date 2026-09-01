import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categoryOptions, formatCategoryLabel, products } from '../data/products';

const sortingOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low-high', label: 'Price: low to high' },
  { value: 'price-high-low', label: 'Price: high to low' },
  { value: 'name-a-z', label: 'Name: A-Z' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categoryParam = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const items = products.filter((product) => {
      const matchesCategory = categoryParam === 'all' || product.category === categoryParam;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    const sorted = [...items];

    switch (sortBy) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return sorted;
  }, [categoryParam, search, sortBy]);

  const handleCategoryChange = (value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', value);
    }

    setSearchParams(nextParams);
  };

  return (
    <main className="page-shell">
      <section className="section-block top-offset">
        <div className="container shop-layout">
          <aside className="shop-sidebar">
            <h2>Browse</h2>

            <div className="filter-block">
              <label className="filter-label" htmlFor="product-search">
                Search products
              </label>
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search cakes, clothing..."
              />
            </div>

            <div className="filter-block">
              <span className="filter-label">Categories</span>
              <div className="category-pills">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={categoryParam === option.value ? 'pill active' : 'pill'}
                    onClick={() => handleCategoryChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-block">
              <label className="filter-label" htmlFor="sort-by">
                Sort by
              </label>
              <select id="sort-by" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                {sortingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          <div className="shop-content">
            <div className="shop-heading-row">
              <div>
                <p className="eyebrow">Catalogue</p>
                <h1>{formatCategoryLabel(categoryParam)} collection</h1>
              </div>
              <span className="results-badge">{filteredProducts.length} items</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No products found</h3>
                <p>Try another search or switch to a different category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
