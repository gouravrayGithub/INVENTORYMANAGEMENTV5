import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddItemModal from '../components/AddItemModal';
import UpdateItemModal from '../components/UpdateItemModal';
import DeleteItemModal from '../components/DeleteItemModal';
import SearchItemModal from '../components/SearchItemModal';
import ItemCard from '../components/ItemCard';
import '../css/OwnerPage.css';

function OwnerPage() {
  const [allItems, setAllItems] = useState([]);
  const [activeModal, setActiveModal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [dashboardStats, setDashboardStats] = useState({
    totalItems: 0,
    totalValue: 0,
    lowStockItems: 0,
    categories: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    if (email) {
      fetchDashboardData();
    }
  }, [email]);

  useEffect(() => {
    // Check if notification should be shown
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(allItems);
    } else {
      const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery) ||
        item.warehouseNumber.toString().includes(searchQuery)
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, allItems]);

  if (!email) {
    return (
      <div className="auth-error">
        <div className="auth-error-content">
          <h2>Authentication Error</h2>
          <p>Please login again — email not found</p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api/inventory/${email}/all`);
      if (response.ok) {
        const data = await response.json();
        setAllItems(data);
        setFilteredItems(data);
        
        // Calculate dashboard stats
        const totalValue = data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const lowStockItems = data.filter(item => item.quantity < 10).length;
        const uniqueCategories = new Set(data.map(item => item.warehouseNumber)).size;
        
        setDashboardStats({
          totalItems: data.length,
          totalValue: totalValue,
          lowStockItems: lowStockItems,
          categories: uniqueCategories
        });
        
        setNotification({ 
          show: true, 
          message: `Successfully loaded ${data.length} items`, 
          type: 'success' 
        });
      } else {
        setNotification({ 
          show: true, 
          message: 'Failed to fetch inventory data', 
          type: 'error' 
        });
      }
    } catch (error) {
      setNotification({ 
        show: true, 
        message: 'Network error, please try again', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowAll = () => {
    fetchDashboardData();
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const actions = [
    { 
      title: 'Add Item', 
      modal: 'add',
      icon: '➕',
      description: 'Add new items to inventory'
    },
    { 
      title: 'Update Item', 
      modal: 'update',
      icon: '🔄',
      description: 'Modify existing inventory items'
    },
    { 
      title: 'Delete Item', 
      modal: 'delete',
      icon: '🗑️',
      description: 'Remove items from inventory'
    },
    { 
      title: 'Search Item', 
      modal: 'search',
      icon: '🔍',
      description: 'Find specific inventory items'
    },
    { 
      title: 'Show All Items', 
      action: handleShowAll,
      icon: '📋',
      description: 'View all inventory items'
    }
  ];

  const handleModalClose = (refresh = false) => {
    setActiveModal('');
    if (refresh) {
      fetchDashboardData();
    }
  };

  return (
    <div className="owner-container">
      <header className="owner-header">
        <h1 className="owner-title">Owner Dashboard</h1>
        <div className="header-actions">
          <button className="refresh-button" onClick={handleShowAll}>
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </header>

      {notification.show && (
        <div className={`owner-notification ${notification.type}`}>
          <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
          {notification.message}
        </div>
      )}

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-box"></i></div>
          <div className="stat-content">
            <h3>{dashboardStats.totalItems}</h3>
            <p>Total Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-rupee-sign"></i></div>
          <div className="stat-content">
            <h3>₹{dashboardStats.totalValue.toLocaleString()}</h3>
            <p>Inventory Value</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-exclamation-triangle"></i></div>
          <div className="stat-content">
            <h3>{dashboardStats.lowStockItems}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-warehouse"></i></div>
          <div className="stat-content">
            <h3>{dashboardStats.categories}</h3>
            <p>Warehouses</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {actions.map((action) => (
          <div 
            key={action.title}
            className="dashboard-card"
            onClick={action.action || (() => setActiveModal(action.modal))}
          >
            <div className="card-icon">{action.icon}</div>
            <h3>{action.title}</h3>
            <p className="card-description">{action.description}</p>
          </div>
        ))}
      </div>

      {activeModal === 'add' && (
        <AddItemModal 
          email={email} 
          onClose={() => handleModalClose(true)}
          onSuccess={() => {
            handleModalClose(true);
            setNotification({ 
              show: true, 
              message: 'Item added successfully', 
              type: 'success' 
            });
          }}
        />
      )}
      {activeModal === 'update' && (
        <UpdateItemModal 
          email={email} 
          onClose={() => handleModalClose(true)}
          onSuccess={() => {
            handleModalClose(true);
            setNotification({ 
              show: true, 
              message: 'Item updated successfully', 
              type: 'success' 
            });
          }}
        />
      )}
      {activeModal === 'delete' && (
        <DeleteItemModal 
          email={email} 
          onClose={() => handleModalClose(true)}
          onSuccess={() => {
            handleModalClose(true);
            setNotification({ 
              show: true, 
              message: 'Item deleted successfully', 
              type: 'success' 
            });
          }}
        />
      )}
      {activeModal === 'search' && (
        <SearchItemModal 
          email={email} 
          onClose={() => handleModalClose(false)}
        />
      )}

      <div className="inventory-section">
        <div className="inventory-header">
          <h2 className="section-title">Inventory Items</h2>
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input 
              type="text" 
              placeholder="Search items..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading inventory items...</p>
          </div>
        ) : (
          <div className="card-container">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))
            ) : (
              <div className="no-items-message">
                {allItems.length === 0 ? (
                  <p>No items in inventory. Add items to get started.</p>
                ) : (
                  <p>No items match your search criteria.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerPage;