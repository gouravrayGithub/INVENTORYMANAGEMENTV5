import React, { useState } from 'react';
import '../css/Modal.css';

function UpdateItemModal({ email, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    Id: '',
    name: '',
    quantity: '',
    price: '',
    warehouseNumber: ''
  });
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.Id) {
      setNotification({ type: 'error', message: 'Item ID is required' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/inventory/${email}/update/${formData.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id: formData.Id,
          name: formData.name,
          quantity: parseInt(formData.quantity) || 0,
          price: parseFloat(formData.price) || 0,
          warehouseNumber: parseInt(formData.warehouseNumber) || 0,
        }),
      });

      if (response.ok) {
        setNotification({ type: 'success', message: 'Item updated successfully!' });
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 1500);
        }
      } else {
        setNotification({ type: 'error', message: 'Failed to update item' });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Network error, please try again' });
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    {
      id: 'Id',
      label: 'Item ID',
      value: formData.Id,
      type: 'text',
      placeholder: 'Enter item ID',
      icon: 'fa-fingerprint',
      required: true
    },
    {
      id: 'name',
      label: 'Item Name',
      value: formData.name,
      type: 'text',
      placeholder: 'Enter item name',
      icon: 'fa-box',
      required: true
    },
    {
      id: 'quantity',
      label: 'Quantity',
      value: formData.quantity,
      type: 'number',
      placeholder: 'Enter quantity',
      min: '0',
      icon: 'fa-sort-amount-up',
      required: true
    },
    {
      id: 'price',
      label: 'Price',
      value: formData.price,
      type: 'number',
      placeholder: 'Enter price',
      step: '0.01',
      min: '0',
      icon: 'fa-rupee-sign',
      required: true
    },
    {
      id: 'warehouseNumber',
      label: 'Warehouse Number',
      value: formData.warehouseNumber,
      type: 'number',
      placeholder: 'Enter warehouse number',
      min: '1',
      icon: 'fa-warehouse',
      required: true
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Update Item</h2>
        
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div className="form-group" key={field.id}>
              <label htmlFor={field.id}>
                <i className={`fas ${field.icon}`}></i> {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                value={field.value}
                onChange={handleChange}
                placeholder={field.placeholder}
                min={field.min}
                step={field.step}
                required={field.required}
              />
            </div>
          ))}
          
          <div className="button-group">
            <button 
              type="button" 
              onClick={onClose}
              className="cancel-button"
            >
              <i className="fas fa-times"></i> Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <><span className="spinner"></span> Updating...</>
              ) : (
                <>
                  <i className="fas fa-sync-alt"></i> Update Item
                </>
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

export default UpdateItemModal;
