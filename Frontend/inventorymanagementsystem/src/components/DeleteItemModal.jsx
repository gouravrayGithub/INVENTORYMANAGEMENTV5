import { useState } from 'react';
import '../css/Modal.css';

function DeleteItemModal({ email, onClose }) {
  const [id, setId] = useState('');
  const [notification, setNotification] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/inventory/${email}/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      setNotification(data.notification);
      setTimeout(() => onClose(), 2000);
    } catch {
      setNotification('Error deleting item');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Delete Item</h2>
        <form onSubmit={handleDelete}>
          <input placeholder="Item ID" value={id} onChange={(e) => setId(e.target.value)} required />
          <button type="submit">Delete</button>
        </form>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
}

export default DeleteItemModal;
