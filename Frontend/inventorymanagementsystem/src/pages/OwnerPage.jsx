import { useState } from 'react';
import AddItemModal from '../components/AddItemModal';
import UpdateItemModal from '../components/UpdateItemModal';
import DeleteItemModal from '../components/DeleteItemModal';
import SearchItemModal from '../components/SearchItemModal';
import ItemCard from '../components/ItemCard';
import '../css/OwnerPage.css';

function OwnerPage() {
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
    { title: 'Search Item', modal: 'search' },
    { title: 'Show All Items', action: handleShowAll }
  ];

  return (
    <div className="owner-container">
      <h1 className="owner-title">Owner Dashboard</h1>

      <div className="dashboard-grid">
        {actions.map((action) => (
          <div 
            key={action.title}
            className="dashboard-card"
            onClick={action.action || (() => setActiveModal(action.modal))}
          >
            <h3>{action.title}</h3>
            {action.description && <p>{action.description}</p>}
          </div>
        ))}
      </div>

      {/* Keep existing modal render logic */}
      {activeModal === 'add' && <AddItemModal email={email} onClose={() => setActiveModal('')} />}
      {activeModal === 'update' && <UpdateItemModal email={email} onClose={() => setActiveModal('')} />}
      {activeModal === 'delete' && <DeleteItemModal email={email} onClose={() => setActiveModal('')} />}
      {activeModal === 'search' && <SearchItemModal email={email} onClose={() => setActiveModal('')} />}

      <div className="card-container">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default OwnerPage;