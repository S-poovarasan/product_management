import { useState, useEffect } from 'react';

const initialState = {
    name: '',
    price: '',
    stock: '',
};

function ProductForm({ product, onSubmit, onClose }) {
    const [form, setForm] = useState(initialState);
    const [submitting, setSubmitting] = useState(false);

    const isEditing = Boolean(product);

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || '',
                price: product.price?.toString() || '',
                stock: product.stock?.toString() || '',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await onSubmit({
                name: form.name,
                price: parseFloat(form.price) || 0,
                stock: parseInt(form.stock, 10) || 0,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEditing ? '✏️ Edit Product' : '➕ New Product'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Product Name *</label>
                            <input
                                className="form-input"
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="price">Price ($) *</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="stock">Stock *</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={form.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn btn-ghost" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={submitting}
                                id="submit-product"
                            >
                                {submitting ? '⏳ Saving...' : isEditing ? '💾 Update' : '➕ Add'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
