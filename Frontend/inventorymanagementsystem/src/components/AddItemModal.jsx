import React, { useState } from 'react';
import '../css/Modal.css';

function AddItemModal({ email, onClose, onSuccess }) {
  const [form, setForm] = useState({ 
    name: '', 
    quantity: '', 
    price: '', 
    warehouseNumber: '' 
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    
    if (!form.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(form.quantity) || Number(form.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    
    if (!form.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(form.price) || Number(form.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!form.warehouseNumber) {
      newErrors.warehouseNumber = 'Warehouse number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api/inventory/${email}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          quantity: Number(form.quantity),
          price: Number(form.price),
          warehouseNumber: form.warehouseNumber
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setNotification({ 
          message: data.notification || 'Item added successfully', 
          type: 'success' 
        });
        
        // Call onSuccess after 2 seconds if provided
        setTimeout(() => {
          if (typeof onSuccess === 'function') {
            onSuccess();
          } else {
            onClose();
          }
        }, 2000);
      } else {
        const errorData = await response.json();
        setNotification({ 
          message: errorData.message || 'Failed to add item', 
          type: 'error' 
        });
      }
    } catch (error) {
      setNotification({ 
        message: 'Network error. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fieldConfig = [
    { 
      name: 'name', 
      placeholder: 'Item Name', 
      type: 'text',
      icon: 'fa-box'
    },
    { 
      name: 'quantity', 
      placeholder: 'Quantity', 
      type: 'number',
      icon: 'fa-sort-amount-up'
    },
    { 
      name: 'price', 
      placeholder: 'Price', 
      type: 'number',
      icon: 'fa-rupee-sign' 
    },
    { 
      name: 'warehouseNumber', 
      placeholder: 'Warehouse Number', 
      type: 'text',
      icon: 'fa-warehouse'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add Item</h2>
        
        <form onSubmit={handleSubmit}>
          {fieldConfig.map((field) => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>
                <i className={`fas ${field.icon}`}></i>
                {field.placeholder}
              </label>
              <input
                id={field.name}
                name={field.name}
                placeholder={`Enter ${field.placeholder.toLowerCase()}`}
                value={form[field.name]}
                onChange={handleChange}
                type={field.type}
                className={errors[field.name] ? 'input-error' : ''}
                min={field.type === 'number' ? '0' : undefined}
              />
              {errors[field.name] && <div className="error-message">{errors[field.name]}</div>}
            </div>
          ))}
          
          <div className="button-group">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <><span className="spinner"></span> Adding...</>
              ) : (
                'Add Item'
              )}
            </button>
          </div>
        </form>
        
        {notification && (
          <div className={`notification ${notification.type}`}>
            <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddItemModal;
