import { useState } from 'react';
import '../css/Modal.css';

function SearchItemModal({ email, onClose }) {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/inventory/${email}/search?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      alert('Error searching item');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Search Item</h2>
        <form onSubmit={handleSearch}>
          <input placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <button type="submit">Search</button>
        </form>

        {results.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Quantity</th><th>Price</th><th>Warehouse No</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.warehouseNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SearchItemModal;
