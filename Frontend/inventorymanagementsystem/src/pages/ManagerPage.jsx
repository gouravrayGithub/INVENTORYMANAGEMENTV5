import { useState } from 'react';
import AddItemModal from '../components/AddItemModal';
import UpdateItemModal from '../components/UpdateItemModal';
import DeleteItemModal from '../components/DeleteItemModal';
import ItemCard from '../components/ItemCard';
import '../css/ManagerPage.css';

function ManagerPage() {
  const [allItems, setAllItems] = useState([]);
  const [activeModal, setActiveModal] = useState('');
  const email = localStorage.getItem('userEmail');

  if (!email) {
    return <p>Please login again — email not found</p>;
  }

  const handleShowAll = async () => {
    const response = await fetch(`http://localhost:8080/api/inventory/${email}/all`);
    if (response.ok) {
      const data = await response.json();
      setAllItems(data);
    } else {
      alert('Failed to fetch items');
    }
  };

  const actions = [
    { title: 'Add Item', modal: 'add' },
    { title: 'Update Item', modal: 'update' },
    { title: 'Delete Item', modal: 'delete' },
    { title: 'Show All Items', action: handleShowAll }
  ];

  return (
    <div className="manager-container">
      <h1 className="manager-title">Manager Dashboard</h1>

      <div className="dashboard-grid">
        {actions.map((action) => (
          <div
            key={action.title}
            className="dashboard-card"
            onClick={action.action || (() => setActiveModal(action.modal))}
          >
            <h3>{action.title}</h3>
          </div>
        ))}
      </div>

      {activeModal === 'add' && <AddItemModal email={email} onClose={() => setActiveModal('')} />}
      {activeModal === 'update' && <UpdateItemModal email={email} onClose={() => setActiveModal('')} />}
      {activeModal === 'delete' && <DeleteItemModal email={email} onClose={() => setActiveModal('')} />}

      <div className="card-container">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ManagerPage;