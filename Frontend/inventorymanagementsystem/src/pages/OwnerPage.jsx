import { useState } from 'react';
import AddItemModal from '../components/AddItemModal';
import UpdateItemModal from '../components/UpdateItemModal';
import DeleteItemModal from '../components/DeleteItemModal';
import SearchItemModal from '../components/SearchItemModal';
import ItemCard from '../components/ItemCard';
import '../css/OwnerPage.css';

function OwnerPage() {
  const [allItems, setAllItems] = useState([]);
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


  return (
    <div className="owner-container">
      <h1>Owner Dashboard</h1>

      <div className="button-group">
        <button onClick={() => setActiveModal('add')}>Add Item</button>
        <button onClick={() => setActiveModal('update')}>Update Item</button>
        <button onClick={() => setActiveModal('delete')}>Delete Item</button>
        <button onClick={() => setActiveModal('search')}>Search Item</button>
        <button onClick={handleShowAll}>Show All Items</button>
      </div>

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
