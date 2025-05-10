import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateItemModal from '../components/UpdateItemModal';
import ItemCard from '../components/ItemCard';
import '../css/StaffPage.css';

function StaffPage() {
  const [allItems, setAllItems] = useState([]);
  const [activeModal, setActiveModal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterOptions, setFilterOptions] = useState({
    showLowStock: false,
    warehouse: 'all'
  });
  const [dashboardStats, setDashboardStats] = useState({
    totalItems: 0,
    lowStockItems: 0,
    categories: 0
  });

  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    if (email) {
      fetchAllItems();
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
    // Apply filters and search
    let results = [...allItems];
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      results = results.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery) ||
        item.warehouseNumber.toString().includes(searchQuery)
      );
    }
    
    // Filter by low stock
    if (filterOptions.showLowStock) {
      results = results.filter(item => item.quantity < 10);
    }
    
    // Filter by warehouse
    if (filterOptions.warehouse !== 'all') {
      results = results.filter(item => item.warehouseNumber === filterOptions.warehouse);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      results.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredItems(results);
  }, [searchQuery, allItems, sortConfig, filterOptions]);

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

  const fetchAllItems = async () => {
    try {
      setIsLoading(true);
      // Using a fixed owner email for this demo. In a real app, this would be dynamically determined
      const ownerEmail = "ownera@owner.com"; 
      const response = await fetch(`http://localhost:8080/api/inventory/${ownerEmail}/all`);
      
      if (response.ok) {
        const data = await response.json();
        setAllItems(data);
        setFilteredItems(data);

        // Calculate dashboard stats
        const lowStockItems = data.filter(item => item.quantity < 10).length;
        const uniqueWarehouses = new Set(data.map(item => item.warehouseNumber)).size;
        
        setDashboardStats({
          totalItems: data.length,
          lowStockItems: lowStockItems,
          categories: uniqueWarehouses
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
    fetchAllItems();
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const toggleLowStockFilter = () => {
    setFilterOptions(prev => ({
      ...prev,
      showLowStock: !prev.showLowStock
    }));
  };

  const handleWarehouseFilter = (warehouse) => {
    setFilterOptions(prev => ({
      ...prev,
      warehouse: warehouse
    }));
  };

  const getUniqueWarehouses = () => {
    return ['all', ...new Set(allItems.map(item => item.warehouseNumber))];
  };

  const actions = [
    { 
      title: 'Update Item', 
      modal: 'update',
      icon: <i className="fas fa-sync-alt"></i>,
      description: 'Modify existing inventory items'
    },
    { 
      title: 'View Inventory', 
      action: handleShowAll,
      icon: <i className="fas fa-clipboard-list"></i>,
      description: 'View all items in inventory'
    }
  ];

  const handleModalClose = (refresh = false) => {
    setActiveModal('');
    if (refresh) {
      fetchAllItems();
    }
  };

  return (
    <div className="staff-container">
      <header className="staff-header">
        <div className="title-container">
          <h1 className="staff-title">Staff Dashboard</h1>
          <span className="user-email">{email}</span>
        </div>
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
        <div className={`staff-notification ${notification.type}`}>
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

      <div className="staff-dashboard-grid">
        {actions.map((action) => (
          <div
            key={action.title}
            className="staff-dashboard-card"
            onClick={action.action || (() => setActiveModal(action.modal))}
          >
            <div className="card-icon">{action.icon}</div>
            <h3>{action.title}</h3>
            <p className="card-description">{action.description}</p>
          </div>
        ))}
      </div>

      {activeModal === 'update' && (
        <UpdateItemModal 
          email={email} 
          onClose={() => handleModalClose(false)}
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

      <div className="inventory-section">
        <div className="inventory-header">
          <h2 className="section-title">Inventory Items</h2>
          <div className="filter-options">
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
            
            <div className="filter-controls">
              <button 
                className={`filter-button ${filterOptions.showLowStock ? 'active' : ''}`}
                onClick={toggleLowStockFilter}
              >
                <i className="fas fa-exclamation-triangle"></i> Low Stock
              </button>
              
              <select 
                className="warehouse-select"
                value={filterOptions.warehouse}
                onChange={(e) => handleWarehouseFilter(e.target.value)}
              >
                {getUniqueWarehouses().map(warehouse => (
                  <option key={warehouse} value={warehouse}>
                    {warehouse === 'all' ? 'All Warehouses' : `Warehouse ${warehouse}`}
                  </option>
                ))}
              </select>
              
              <div className="sort-controls">
                <span>Sort by:</span>
                <button 
                  className={`sort-button ${sortConfig.key === 'name' ? 'active' : ''}`}
                  onClick={() => handleSort('name')}
                >
                  Name {sortConfig.key === 'name' && (
                    <i className={`fas fa-arrow-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
                  )}
                </button>
                <button 
                  className={`sort-button ${sortConfig.key === 'quantity' ? 'active' : ''}`}
                  onClick={() => handleSort('quantity')}
                >
                  Quantity {sortConfig.key === 'quantity' && (
                    <i className={`fas fa-arrow-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading inventory items...</p>
          </div>
        ) : (
          <div className="inventory-content">
            <div className="results-summary">
              <p>
                Showing {filteredItems.length} of {allItems.length} items
                {filterOptions.showLowStock && ' (Low Stock Only)'}
                {filterOptions.warehouse !== 'all' && ` (Warehouse ${filterOptions.warehouse})`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            
            <div className="staff-card-container">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))
              ) : (
                <div className="no-items-message">
                  {allItems.length === 0 ? (
                    <div>
                      <i className="fas fa-box-open empty-icon"></i>
                      <p>No items in inventory. Please contact a manager or owner to add items.</p>
                    </div>
                  ) : (
                    <div>
                      <i className="fas fa-search empty-icon"></i>
                      <p>No items match your search criteria.</p>
                      <button className="reset-filters-btn" onClick={() => {
                        setSearchQuery('');
                        setFilterOptions({ showLowStock: false, warehouse: 'all' });
                        setSortConfig({ key: null, direction: 'ascending' });
                      }}>Reset Filters</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffPage;