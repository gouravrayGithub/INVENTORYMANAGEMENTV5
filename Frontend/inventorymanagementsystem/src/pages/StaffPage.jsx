// src/pages/StaffPage.jsx
import React, { useState } from 'react';

function StaffPage() {
  const [allItems, setAllItems] = useState([]);
  const email = localStorage.getItem('userEmail');  // ✅ only inside component

  if (!email) {
    return <p>Please login again — email not found</p>;
  }

  const handleShowAll = async () => {
    const response = await fetch(`http://localhost:8080/api/inventory/ownera@owner.com/all`);
    if (response.ok) {
      const data = await response.json();
      setAllItems(data);
    } else {
      alert('Failed to fetch items');
    }
  };

  const handleUpdateItem = async (id) => {
    const newQuantity = prompt('Enter new quantity:');
    const response = await fetch(`http://localhost:8080/api/inventory/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (response.ok) {
      alert('Item updated');
      handleShowAll();
    } else {
      alert('Failed to update item');
    }
  };

  return (
    <div>
      <h2>Staff Page</h2>
      <button onClick={handleShowAll}>Show All Items</button>
      <ul>
        {allItems.map((item) => (
          <li key={item.id}>
            {item.itemName} - {item.quantity}
            <button onClick={() => handleUpdateItem(item.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffPage;
