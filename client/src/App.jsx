import { useState, useEffect, useCallback } from 'react';
import './index.css';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './api/productApi';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import ConfirmDialog from './components/ConfirmDialog';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [toasts, setToasts] = useState([]);

  // ── Toast helper ──
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  // ── Load products ──
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (sort !== 'newest') params.sort = sort;
      const { data } = await fetchProducts(params);
      setProducts(data);
    } catch {
      addToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, sort, addToast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ── CRUD handlers ──
  const handleCreate = async (data) => {
    try {
      await createProduct(data);
      addToast('Product created successfully!');
      setShowForm(false);
      loadProducts();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create product', 'error');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateProduct(editProduct._id, data);
      addToast('Product updated successfully!');
      setEditProduct(null);
      loadProducts();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update product', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteTarget._id);
      addToast('Product deleted successfully!');
      setDeleteTarget(null);
      loadProducts();
    } catch {
      addToast('Failed to delete product', 'error');
    }
  };

  // ── Derived stats ──
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <>
      <Navbar productCount={products.length} totalValue={totalValue} />

      <div className="app-container">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="search-products"
              />
            </div>
            <select
              className="filter-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              id="sort-products"
            >
              <option value="newest">🕐 Newest First</option>
              <option value="price_asc">💲 Price: Low → High</option>
              <option value="price_desc">💲 Price: High → Low</option>
              <option value="name_asc">🔤 Name: A → Z</option>
              <option value="name_desc">🔤 Name: Z → A</option>
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            id="add-product-btn"
          >
            ➕ Add Product
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p style={{ color: 'var(--text-muted)' }}>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3>No products found</h3>
            <p>Get started by adding your first product to the inventory.</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              ➕ Add Your First Product
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={setEditProduct}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <ProductForm
          product={null}
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}

      {editProduct && (
        <ProductForm
          product={editProduct}
          onSubmit={handleUpdate}
          onClose={() => setEditProduct(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          product={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Toasts */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              {toast.type === 'success' ? '✅' : '❌'} {toast.message}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
