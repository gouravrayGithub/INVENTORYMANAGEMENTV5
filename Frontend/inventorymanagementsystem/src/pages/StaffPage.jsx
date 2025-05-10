import React, { useState } from 'react';
import UpdateItemModal from '../components/UpdateItemModal';
import ItemCard from '../components/ItemCard';
import '../css/StaffPage.css';

function StaffPage() {
  const [allItems, setAllItems] = useState([]);
  const [activeModal, setActiveModal] = useState('');
  const email = localStorage.getItem('userEmail');

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

  const actions = [
    { title: 'Update Item', modal: 'update' },
    { title: 'Show All Items', action: handleShowAll }
  ];

  return (
    <div className="staff-container">
      <h1 className="staff-title">Staff Dashboard</h1>

      <div className="staff-dashboard-grid">
        {actions.map((action) => (
          <div
            key={action.title}
            className="staff-dashboard-card"
            onClick={action.action || (() => setActiveModal(action.modal))}
          >
            <h3>{action.title}</h3>
          </div>
        ))}
      </div>

      {activeModal === 'update' && <UpdateItemModal email={email} onClose={() => setActiveModal('')} />}

      <div className="staff-card-container">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default StaffPage;