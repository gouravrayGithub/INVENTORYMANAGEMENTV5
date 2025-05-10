import { useState } from 'react';
import '../css/Modal.css';


function UpdateItemModal({ email, onClose }) {
  const [id, setId] = useState('');
  const [form, setForm] = useState({ name: '', quantity: '', price: '', warehouseNumber: '' });
  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/inventory/${email}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setNotification(data.notification);
      setTimeout(() => onClose(), 2000);
    } catch {
      setNotification('updated item');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Update Item</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Item ID" value={id} onChange={(e) => setId(e.target.value)} required />
          {['name', 'quantity', 'price', 'warehouseNumber'].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          ))}
          <button type="submit">Update</button>
        </form>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
}

export default UpdateItemModal;
