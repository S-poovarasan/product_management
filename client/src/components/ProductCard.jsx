function ProductCard({ product, onEdit, onDelete }) {
    const getStockStatus = (stock) => {
        if (stock === 0) return { label: 'Out of stock', cls: 'out-of-stock' };
        if (stock <= 10) return { label: `Low stock (${stock})`, cls: 'low-stock' };
        return { label: `${stock} in stock`, cls: 'in-stock' };
    };

    const stockStatus = getStockStatus(product.stock);

    return (
        <div className="product-card">
            <div className="product-card-body">
                <h3 className="product-card-name">{product.name}</h3>
                <div className="product-card-meta">
                    <span className="product-card-price">
                        ${product.price.toFixed(2)}
                    </span>
                    <span className="product-card-stock">
                        <span className={`stock-dot ${stockStatus.cls}`}></span>
                        {stockStatus.label}
                    </span>
                </div>
                <div className="product-card-actions">
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => onEdit(product)}
                        id={`edit-${product._id}`}
                    >
                        ✏️ Edit
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(product)}
                        id={`delete-${product._id}`}
                    >
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
