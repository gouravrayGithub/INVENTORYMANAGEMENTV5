import React from 'react';
import '../css/Modal.css';

function ItemCard({ item }) {
  // Determine if item is low in stock
  const isLowStock = item.quantity < 10;
  
  return (
    <div className={`item-card ${isLowStock ? 'low-stock' : ''}`}>
      <div className="item-header">
        <h3>{item.name}</h3>
        <span className="item-id">#{item.id}</span>
      </div>
      
      <div className="item-details">
        <div className="item-detail">
          <span className="detail-label">
            <i className="fas fa-box"></i> Quantity
          </span>
          <span className={`detail-value ${isLowStock ? 'low-stock-text' : ''}`}>
            {item.quantity}
            {isLowStock && <i className="fas fa-exclamation-triangle warning-icon"></i>}
          </span>
        </div>
        
        <div className="item-detail">
          <span className="detail-label">
            <i className="fas fa-rupee-sign"></i> Price
          </span>
          <span className="detail-value">₹{item.price.toLocaleString()}</span>
        </div>
        
        <div className="item-detail">
          <span className="detail-label">
            <i className="fas fa-warehouse"></i> Warehouse
          </span>
          <span className="detail-value">{item.warehouseNumber}</span>
        </div>
        
        <div className="item-detail total-value">
          <span className="detail-label">
            <i className="fas fa-calculator"></i> Total Value
          </span>
          <span className="detail-value">₹{(item.price * item.quantity).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
