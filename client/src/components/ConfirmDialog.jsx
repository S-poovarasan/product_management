function ConfirmDialog({ product, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="confirm-dialog">
                    <div className="confirm-icon">⚠️</div>
                    <h3>Delete Product?</h3>
                    <p>
                        Are you sure you want to delete <strong>"{product.name}"</strong>?
                        This action cannot be undone.
                    </p>
                    <div className="confirm-actions">
                        <button className="btn btn-ghost" onClick={onCancel} id="cancel-delete">
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={onConfirm} id="confirm-delete">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
