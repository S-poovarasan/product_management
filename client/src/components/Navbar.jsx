function Navbar({ productCount, totalValue }) {
    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="navbar-brand">
                    <div className="brand-icon">📦</div>
                    <span>ProductHub</span>
                </div>
                <div className="navbar-stats">
                    <div className="stat-badge">
                        🗂️ <span className="stat-value">{productCount}</span> Products
                    </div>
                    <div className="stat-badge">
                        💰 <span className="stat-value">${totalValue.toLocaleString()}</span> Total Value
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
